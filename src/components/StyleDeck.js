export class StyleDeck {
  constructor(containerId, stylesTheme, onSelectStyle) {
    this.container = document.getElementById(containerId);
    this.stylesTheme = stylesTheme;
    this.onSelectStyle = onSelectStyle;
  }

  render() {
    if (!this.container) return;
    this.container.innerHTML = "";

    Object.values(this.stylesTheme).forEach(theme => {
      const card = document.createElement("div");
      card.className = `style-deck-card ${theme.id}`;

      card.innerHTML = `
        <h3 style="font-family: ${theme.fontHeading}; color: ${theme.colors.primary === "#ffffff" ? "var(--text-main)" : theme.colors.primary}">${theme.name}</h3>
        <div class="style-tagline">${theme.tagline}</div>
        <p>${theme.description}</p>
        <div style="margin-top: 1.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <span style="font-size: 0.75rem; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border);">Font: ${theme.fontHeading.split(",")[0]}</span>
            <span style="font-size: 0.75rem; background: rgba(0,0,0,0.03); padding: 4px 8px; border-radius: 4px; border: 1px solid var(--border);">Borders: ${theme.borderRadius}</span>
          </div>
          <span class="style-card-btn" style="font-size: 0.85rem; font-weight: 600; color: var(--primary); display: inline-flex; align-items: center; gap: 0.25rem;">Use Style →</span>
        </div>
      `;

      card.addEventListener("click", () => {
        const inputBizStyle = document.getElementById("biz-style");
        const inputBizColor = document.getElementById("biz-color");

        if (inputBizStyle) {
          inputBizStyle.value = theme.id;
        }

        if (inputBizColor) {
          inputBizColor.value = theme.colors.primary === "#000000" ? "#ffffff" : theme.colors.primary;
        }

        if (this.onSelectStyle) {
          this.onSelectStyle(theme.id, theme);
        }
      });

      this.container.appendChild(card);
    });
  }
}
