export class SettingsMenu {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'settingsMenu';
    this.container.innerHTML = `
      <button id="clearStorageBtn">Clear Storage</button>
    `;
    document.body.appendChild(this.container);

    const clearBtn = document.getElementById('clearStorageBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.clear();
        alert('Storage Cleared!');
      });
    }
  }
}
