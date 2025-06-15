export class SettingsMenu {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'settings-menu';
    this.container.innerHTML = `
      <button id="clear-save">Clear Save</button>
    `;
    document.body.appendChild(this.container);

    document.getElementById('clear-save')?.addEventListener('click', () => {
      localStorage.clear();
      location.reload();
    });
  }
}
