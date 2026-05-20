import { categoriesData } from "./data/categories.js";
import { stylesTheme } from "./data/themes.js";
import { generatePreviewHTML } from "./iframe/iframeTemplate.js";
import { ModalManager } from "./components/Modal.js";
import { CategoryGrid } from "./components/CategoryGrid.js";
import { StyleDeck } from "./components/StyleDeck.js";
import { DeviceSimulator } from "./components/DeviceSimulator.js";

// Sector default names mapping to auto-fill beautifully on sector click/change
const defaultBizNames = {
  restaurant: "Gourmet Reserve",
  furniture: "Nordic Comforts",
  realestate: "Vanguard Properties",
  beauty: "Aura Wellness Spa",
  dental: "Radiant Dental Care",
  lawfirm: "Apex Legal Advisors",
  gym: "Iron Pulse Fitness",
  construction: "Solid Rock Builders",
  auto: "Apex Premium Motors",
  clothing: "Velvet Column Boutique"
};

// Form Inputs
const inputBizName = document.getElementById("biz-name");
const inputBizColor = document.getElementById("biz-color");
const inputBizSector = document.getElementById("biz-sector");
const inputBizStyle = document.getElementById("biz-style");
const inputBizDesc = document.getElementById("biz-desc");
const inputBizProducts = document.getElementById("biz-products");
const inputBizPhone = document.getElementById("biz-phone");
const inputBizEmail = document.getElementById("biz-email");
const inputBizAddress = document.getElementById("biz-address");
const inputBizLogo = document.getElementById("biz-logo");
const inputSocialFb = document.getElementById("social-fb");
const inputSocialIg = document.getElementById("social-ig");

const simIframe = document.getElementById("sim-iframe");

// Declare component instances
let modalManager;
let categoryGrid;
let styleDeck;
let deviceSimulator;

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Modal Manager
  modalManager = new ModalManager(categoriesData, stylesTheme);
  modalManager.init();

  // 2. Initialize Category Grid
  categoryGrid = new CategoryGrid(
    "categories-grid",
    categoriesData,
    defaultBizNames,
    () => {
      // Update preview immediately & scroll to generator
      updateConceptPreview();
      scrollToGenerator();
    }
  );
  categoryGrid.render();

  // 3. Initialize Style Deck
  styleDeck = new StyleDeck(
    "styles-deck",
    stylesTheme,
    () => {
      // Update preview immediately & scroll to generator
      updateConceptPreview();
      scrollToGenerator();
    }
  );
  styleDeck.render();

  // 4. Initialize Device Simulator
  deviceSimulator = new DeviceSimulator(
    "simulator-viewport",
    ".device-tab",
    getCompileOptionsHTML,
    () => scrollToGenerator(), // onCustomize callback
    () => { // onUseConcept callback
      modalManager.populateDeployCard();
      modalManager.open("modal-use-concept");
    }
  );
  deviceSimulator.init();

  // 5. Setup Form Change Listeners for live compiles
  setupFormListeners();

  // 6. Trigger initial preview rendering
  updateConceptPreview();
});

// Get current options from form inputs for dynamic compiling
function getCompileOptions() {
  return {
    businessName: inputBizName ? inputBizName.value : "Elite Business Co.",
    sector: inputBizSector ? inputBizSector.value : "restaurant",
    style: inputBizStyle ? inputBizStyle.value : "modern",
    phone: inputBizPhone ? inputBizPhone.value : "+1 (555) 019-2834",
    email: inputBizEmail ? inputBizEmail.value : "hello@mybusiness.com",
    address: inputBizAddress ? inputBizAddress.value : "123 Main Street, Suite 100",
    mainColor: inputBizColor ? inputBizColor.value : "",
    logoPlaceholder: inputBizLogo ? inputBizLogo.value : "",
    products: inputBizProducts ? inputBizProducts.value : "",
    description: inputBizDesc ? inputBizDesc.value : "",
    socials: {
      facebook: inputSocialFb ? inputSocialFb.value : "",
      instagram: inputSocialIg ? inputSocialIg.value : ""
    }
  };
}

// Callback for simulator to get compiled HTML on-demand
function getCompileOptionsHTML() {
  return generatePreviewHTML(getCompileOptions());
}

// Setup Form Listeners to support dynamic live-updates
function setupFormListeners() {
  const formInputs = [
    inputBizName,
    inputBizColor,
    inputBizSector,
    inputBizStyle,
    inputBizDesc,
    inputBizProducts,
    inputBizPhone,
    inputBizEmail,
    inputBizAddress,
    inputBizLogo,
    inputSocialFb,
    inputSocialIg
  ];

  formInputs.forEach(input => {
    if (!input) return;
    
    // Trigger live update on keyup, input, and change
    const events = ["input", "change", "keyup"];
    events.forEach(evtName => {
      input.addEventListener(evtName, () => {
        // If sector changed, update description placeholder to represent new sector
        if (input.id === "biz-sector" && inputBizSector && inputBizDesc) {
          const selectedSectorKey = inputBizSector.value;
          const selectedSector = categoriesData[selectedSectorKey];
          if (selectedSector) {
            inputBizDesc.placeholder = selectedSector.defaultDescription;
          }
          
          // Auto-update business name if empty or still set to a default name
          if (inputBizName) {
            const currentName = inputBizName.value.trim();
            if (!currentName || Object.values(defaultBizNames).includes(currentName)) {
              inputBizName.value = defaultBizNames[selectedSectorKey] || "Elite Business Co.";
            }
          }
        }
        updateConceptPreview();
      });
    });
  });
}

// Render dynamic preview HTML inside the isolated iframe sandbox
function updateConceptPreview() {
  if (!simIframe) return;
  const compiledHTML = getCompileOptionsHTML();
  // Safely inject HTML document contents into IFrame using srcdoc
  simIframe.srcdoc = compiledHTML;
}

// Scroll to Generator Console and Focus input
function scrollToGenerator() {
  const generatorSection = document.getElementById("generator");
  if (generatorSection) {
    generatorSection.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => {
      const nameInput = document.getElementById("biz-name");
      if (nameInput) {
        nameInput.focus();
        nameInput.select();
      }
    }, 600);
  }
}

// Expose scroll helper globally
window.scrollToGenerator = scrollToGenerator;
