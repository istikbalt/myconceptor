import { config } from "../data/config.js";

export class ModalManager {
  constructor(categoriesData, stylesTheme) {
    this.categoriesData = categoriesData;
    this.stylesTheme = stylesTheme;
  }

  init() {
    this.setupTriggers();
    this.setupClickOutside();
    this.setupFormSubmissions();
    
    // Bind global helpers so inline HTML on clicks can still call them
    window.openModal = (id) => this.open(id);
    window.closeModal = (id) => this.close(id);
  }

  open(id) {
    const modal = document.getElementById(id);
    if (modal) {
      this.populateDeployCard();
      modal.classList.add("active");
    }
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
        this.populateDeployCard();
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

    // Populates hidden fields across all active forms
    this.populateHiddenFields();
  }

  populateHiddenFields() {
    const inputBizName = document.getElementById("biz-name");
    const inputBizSector = document.getElementById("biz-sector");
    const inputBizStyle = document.getElementById("biz-style");
    const inputBizColor = document.getElementById("biz-color");
    const inputBizDesc = document.getElementById("biz-desc");
    const inputBizProducts = document.getElementById("biz-products");
    const inputBizPhone = document.getElementById("biz-phone");
    const inputBizEmail = document.getElementById("biz-email");
    const inputBizAddress = document.getElementById("biz-address");
    const inputBizLogo = document.getElementById("biz-logo");
    const inputSocialFb = document.getElementById("social-fb");
    const inputSocialIg = document.getElementById("social-ig");

    const prefixes = ["use", "setup"];
    prefixes.forEach(prefix => {
      const setHiddenVal = (id, val) => {
        const el = document.getElementById(`${prefix}-${id}`);
        if (el) el.value = val || "";
      };

      setHiddenVal("biz-name", inputBizName?.value);
      setHiddenVal("biz-sector", inputBizSector?.value);
      setHiddenVal("biz-style", inputBizStyle?.value);
      setHiddenVal("biz-color", inputBizColor?.value);
      setHiddenVal("biz-desc", inputBizDesc?.value);
      setHiddenVal("biz-products", inputBizProducts?.value);
      setHiddenVal("biz-phone", inputBizPhone?.value);
      setHiddenVal("biz-email", inputBizEmail?.value);
      setHiddenVal("biz-address", inputBizAddress?.value);
      setHiddenVal("biz-logo", inputBizLogo?.value);
      setHiddenVal("social-fb", inputSocialFb?.value);
      setHiddenVal("social-ig", inputSocialIg?.value);
    });
  }

  setupFormSubmissions() {
    const formUse = document.getElementById("form-use-concept");
    const formSetup = document.getElementById("form-request-setup");

    if (formUse) {
      formUse.addEventListener("submit", async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById("use-concept-email");
        const submitBtn = document.getElementById("btn-submit-use");
        if (!emailInput || !submitBtn) return;

        const email = emailInput.value.trim();
        const data = this.getFormData(formUse, email);

        try {
          submitBtn.disabled = true;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = "Packaging Code Assets...";

          await this.postToFormspree(data);

          // Smoothly redirect customer to Stripe payment link for Concept Pro flat fee
          window.location.href = config.stripe.conceptProOnce;
        } catch (err) {
          console.error("AJAX specifications submission failed:", err);
          // Fallback redirect to ensure transaction is never blocked
          window.location.href = config.stripe.conceptProOnce;
        }
      });
    }

    if (formSetup) {
      formSetup.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById("setup-company-name");
        const emailInput = document.getElementById("setup-concept-email");
        const submitBtn = document.getElementById("btn-submit-setup");
        if (!nameInput || !emailInput || !submitBtn) return;

        const email = emailInput.value.trim();
        const companyName = nameInput.value.trim();
        const data = this.getFormData(formSetup, email, companyName);

        try {
          submitBtn.disabled = true;
          submitBtn.textContent = "Securing Launch Slot...";

          await this.postToFormspree(data);

          // Smoothly redirect customer to Stripe payment link for Expert Setup flat fee
          window.location.href = config.stripe.expertSetupOnce;
        } catch (err) {
          console.error("AJAX specifications submission failed:", err);
          // Fallback redirect to ensure transaction is never blocked
          window.location.href = config.stripe.expertSetupOnce;
        }
      });
    }

    const formContact = document.getElementById("contact-form");
    if (formContact) {
      formContact.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nameInput = formContact.querySelector('input[name="name"]');
        const emailInput = formContact.querySelector('input[name="email"]');
        const messageInput = formContact.querySelector('textarea[name="message"]');
        const submitBtn = document.getElementById("btn-submit-contact");
        if (!emailInput || !submitBtn) return;

        const name = nameInput ? nameInput.value.trim() : "";
        const email = emailInput.value.trim();
        const message = messageInput ? messageInput.value.trim() : "";

        const data = {
          name: name,
          email: email,
          message: message,
          subject: "New Quick Query from MyConceptor Contact Form"
        };

        try {
          submitBtn.disabled = true;
          const originalText = submitBtn.textContent;
          submitBtn.textContent = "Sending...";

          await this.postToFormspree(data);

          submitBtn.textContent = "Message Sent!";
          submitBtn.style.background = "#10b981"; // Success green
          formContact.reset();

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = "";
          }, 4000);
        } catch (err) {
          console.error("Contact form submission failed:", err);
          submitBtn.textContent = "Submission Failed";
          submitBtn.style.background = "#ef4444"; // Error red

          setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            submitBtn.style.background = "";
          }, 3000);
        }
      });
    }
  }

  getFormData(form, email, companyName = "") {
    const selectedPlan = form.querySelector('input[name="selected_plan"]')?.value || "Concept Pro";
    const data = {
      email: email,
      selected_plan: selectedPlan,
      ...(companyName && { company_name: companyName })
    };

    const hiddenInputs = form.querySelectorAll('input[type="hidden"]');
    hiddenInputs.forEach(input => {
      if (input.name && input.name !== "selected_plan") {
        data[input.name] = input.value;
      }
    });

    return data;
  }

  async postToFormspree(data) {
    // If using the default placeholder Formspree ID, simulate successful submission
    if (!config.formspreeId || config.formspreeId === "xzbkbjqk") {
      console.log("Formspree submission simulator payload:", data);
      return new Promise((resolve) => setTimeout(resolve, 800));
    }

    const response = await fetch(`https://formspree.io/f/${config.formspreeId}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`Formspree service error: status ${response.status}`);
    }

    return response.json();
  }
}
