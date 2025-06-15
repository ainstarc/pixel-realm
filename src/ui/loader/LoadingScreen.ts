export class LoadingScreen {
  private overlay: HTMLElement;

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'loading-screen';
    this.overlay.innerText = 'Loading...';
    document.body.appendChild(this.overlay);
  }

  public hide(): void {
    this.overlay.style.display = 'none';
  }
}
