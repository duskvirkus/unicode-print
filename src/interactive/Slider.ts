import { cmap } from 'terminaltxt';

export type ReceivePercentFunction = (percent: number, character: string) => void;

export class Slider {

  public sliderDiv: HTMLDivElement;
  public slider: HTMLButtonElement;
  public characterLabel: HTMLSpanElement;
  public percentLabel: HTMLSpanElement;

  public receivePercent: ReceivePercentFunction;

  constructor(parent: HTMLDivElement, character: string, receivePercent: ReceivePercentFunction) {

    this.onClick = this.onClick.bind(this);
    this.receivePercent = receivePercent;

    this.sliderDiv = document.createElement('div');
    this.sliderDiv.classList.add('slider-container');
    parent.append(this.sliderDiv);

    this.characterLabel = document.createElement('span');
    this.characterLabel.innerHTML = character;
    this.sliderDiv.append(this.characterLabel);

    this.slider = document.createElement('button');
    this.slider.onclick = this.onClick;
    this.slider.classList.add('slider');
    this.sliderDiv.append(this.slider);

    this.percentLabel = document.createElement('span');
    this.sliderDiv.append(this.percentLabel);

    this.updateSlider(.5);
  }

  protected onClick(event: MouseEvent): void {
    let percent: number = cmap(event.offsetX / event.toElement.clientWidth, .05, .95, 0, 1);
    this.updateSlider(percent);
    this.receivePercent(percent, this.characterLabel.innerHTML);
  }

  protected updateSlider(percent: number): void {
    let sliderFill: string[] = [];
    for (let i: number = 0; i < (percent - 0.05) * 10; i++) {
      sliderFill.push('█');
    }
    for (let i: number = sliderFill.length; i < 10; i++) {
      sliderFill.push(' ');
    }
    this.slider.innerHTML = '|' + sliderFill.join('');
    this.percentLabel.innerHTML = ' ' + Math.floor(percent * 100);
  }

  public display(display: boolean): void {
    if (display) {
      this.sliderDiv.style.display = 'block';
    } else {
      this.sliderDiv.style.display = 'none';
    }
  }

}