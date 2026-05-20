export class CategoryGrid {
  constructor(containerId, categoriesData, defaultBizNames, onSelectCategory) {
    this.container = document.getElementById(containerId);
    this.categoriesData = categoriesData;
    this.defaultBizNames = defaultBizNames;
    this.onSelectCategory = onSelectCategory;

    // Close active category cards when clicking outside
    document.addEventListener("click", (e) => {
      if (this.container) {
        const activeCards = this.container.querySelectorAll(".cat-card.active");
        activeCards.forEach(card => {
          if (!card.contains(e.target)) {
            card.classList.remove("active");
          }
        });
      }
    });
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = "";

    Object.values(this.categoriesData).forEach(cat => {
      const card = document.createElement("div");
      card.className = "cat-card";
      
      const menuItemsHTML = cat.menu.map(m => `<li>• ${m}</li>`).join("");

      card.innerHTML = `
        <div class="cat-icon-wrap">${cat.icon}</div>
        <h3>${cat.name}</h3>
        <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.4;">${cat.tagline}</p>
        <span class="cat-card-arrow">Try Sector →</span>
        
        <!-- Interactive Hover Detail Popup -->
        <div class="cat-hover-detail">
          <h4>Included Pages & Menu</h4>
          <ul class="cat-hover-menu">${menuItemsHTML}</ul>
          <h4 style="margin-top: 0.75rem;">Premium Features</h4>
          <p class="cat-hover-desc">${cat.featuresDescription}</p>
        </div>
      `;

      card.addEventListener("click", (e) => {
        // Prevent click outside event from immediately closing this card
        e.stopPropagation();

        const siblings = card.parentElement ? card.parentElement.querySelectorAll(".cat-card") : [];
        siblings.forEach(sibling => {
          if (sibling !== card) {
            sibling.classList.remove("active");
          }
        });

        // Toggle active class to open/close details panel
        card.classList.toggle("active");

        const selectedSector = cat.id;
        const inputBizName = document.getElementById("biz-name");
        const inputBizSector = document.getElementById("biz-sector");
        const inputBizDesc = document.getElementById("biz-desc");

        // Auto-update business name if empty or still set to a default name
        if (inputBizName) {
          const currentName = inputBizName.value.trim();
          if (!currentName || Object.values(this.defaultBizNames).includes(currentName)) {
            inputBizName.value = this.defaultBizNames[selectedSector] || "Elite Business Co.";
          }
        }

        if (inputBizSector) {
          inputBizSector.value = selectedSector;
        }

        if (inputBizDesc) {
          inputBizDesc.placeholder = cat.defaultDescription;
        }

        // Fire select callback to coordinate preview compile and page scroll
        if (this.onSelectCategory) {
          this.onSelectCategory(selectedSector, cat);
        }
      });

      this.container.appendChild(card);
    });
  }
}

