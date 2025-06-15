export class LoadingScreen {
  private container: HTMLElement;

  constructor() {
    this.container = document.createElement('div');
    this.container.className = 'loadingScreen';
    this.container.innerHTML = `<p>Loading Pixel Realm...</p>`;
    document.body.appendChild(this.container);
  }

  public hide() {
    this.container.style.display = 'none';
  }
}
