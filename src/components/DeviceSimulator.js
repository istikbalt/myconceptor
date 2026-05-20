export class DeviceSimulator {
  constructor(viewportId, tabsClass, getDemoHTML, onCustomize, onUseConcept) {
    this.viewport = document.getElementById(viewportId);
    this.tabs = document.querySelectorAll(tabsClass);
    this.getDemoHTML = getDemoHTML;
    this.onCustomize = onCustomize;
    this.onUseConcept = onUseConcept;
  }

  init() {
    this.setupViewportToggles();
    this.setupSimulatorActions();
    this.setupPostMessageListener();
  }

  setupViewportToggles() {
    this.tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        this.tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        const device = tab.dataset.device;
        if (this.viewport) {
          this.viewport.className = `device-viewport ${device}`;
        }
      });
    });
  }

  setupSimulatorActions() {
    const btnDemo = document.getElementById("sim-btn-demo");
    const btnUse = document.getElementById("sim-btn-use");
    const btnSetup = document.getElementById("sim-btn-setup");

    if (btnDemo) {
      btnDemo.addEventListener("click", () => {
        const demoHTML = this.getDemoHTML();
        const demoWindow = window.open("", "_blank");
        if (demoWindow) {
          demoWindow.document.open();
          demoWindow.document.write(demoHTML);
          demoWindow.document.close();
        } else {
          alert("Pop-up blocked! Please allow popups to view full-screen website previews.");
        }
      });
    }

    if (btnUse) {
      btnUse.addEventListener("click", () => {
        if (this.onUseConcept) this.onUseConcept();
      });
    }

    if (btnSetup) {
      btnSetup.addEventListener("click", () => {
        if (window.openModal) window.openModal("modal-request-setup");
      });
    }
  }

  setupPostMessageListener() {
    window.addEventListener("message", (event) => {
      if (event.data === "customize-concept") {
        if (this.onCustomize) this.onCustomize();
      } else if (event.data === "use-concept") {
        if (this.onUseConcept) this.onUseConcept();
      }
    });
  }
}
