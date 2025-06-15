export class MobileControlsUI {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'mobileControls';
    this.container.innerHTML = `
      <div class="dpad">
        <button id="up">↑</button>
        <button id="down">↓</button>
        <button id="left">←</button>
        <button id="right">→</button>
      </div>
    `;
    document.body.appendChild(this.container);

    // Future: hook up with mobile input system
  }
}
