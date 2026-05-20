export class ModalManager {
  constructor(categoriesData, stylesTheme) {
    this.categoriesData = categoriesData;
    this.stylesTheme = stylesTheme;
  }

  init() {
    this.setupTriggers();
    this.setupClickOutside();
    
    // Bind global helpers so inline HTML on clicks can still call them
    window.openModal = (id) => this.open(id);
    window.closeModal = (id) => this.close(id);
  }

  open(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add("active");
  }

  close(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove("active");
  }

  setupTriggers() {
    const useTriggers = document.querySelectorAll(".btn-use-modal-trigger");
    useTriggers.forEach(btn => {
      btn.addEventListener("click", () => {
        this.populateDeployCard();
        this.open("modal-use-concept");
      });
    });

    const setupTriggers = document.querySelectorAll(".btn-setup-modal-trigger");
    setupTriggers.forEach(btn => {
      btn.addEventListener("click", () => {
        this.open("modal-request-setup");
      });
    });
  }

  setupClickOutside() {
    window.addEventListener("click", (event) => {
      const overlays = document.querySelectorAll(".modal-overlay");
      overlays.forEach(overlay => {
        if (event.target === overlay) {
          overlay.classList.remove("active");
        }
      });
    });
  }

  populateDeployCard() {
    const nameEl = document.getElementById("summary-biz-name");
    const sectorEl = document.getElementById("summary-biz-sector");
    const styleEl = document.getElementById("summary-biz-style");
    const colorEl = document.getElementById("summary-biz-color");
    const colorDot = document.getElementById("summary-color-dot");

    const inputBizName = document.getElementById("biz-name");
    const inputBizSector = document.getElementById("biz-sector");
    const inputBizStyle = document.getElementById("biz-style");
    const inputBizColor = document.getElementById("biz-color");

    const activeSectorKey = inputBizSector ? inputBizSector.value : "restaurant";
    const activeStyleKey = inputBizStyle ? inputBizStyle.value : "modern";

    const sectorName = this.categoriesData[activeSectorKey]?.name || "Custom Concept";
    const styleName = this.stylesTheme[activeStyleKey]?.name || "Custom Style";

    if (nameEl && inputBizName) nameEl.textContent = inputBizName.value || "Elite Business Co.";
    if (sectorEl) sectorEl.textContent = sectorName;
    if (styleEl) styleEl.textContent = styleName + " Theme";
    if (colorEl && inputBizColor) colorEl.textContent = inputBizColor.value;
    if (colorDot && inputBizColor) colorDot.style.backgroundColor = inputBizColor.value;
  }
}
