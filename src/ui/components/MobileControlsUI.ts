export class MobileControlsUI {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'mobile-controls';
    this.container.innerHTML = `
      <button id="move-up">↑</button>
      <button id="move-left">←</button>
      <button id="move-right">→</button>
      <button id="move-down">↓</button>
    `;
    document.body.appendChild(this.container);
  }
}
