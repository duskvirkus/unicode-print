import {
  Slider
} from './Slider';

export class Sliders {

  public slidersDiv: HTMLDivElement;
  public sliders: Slider[];

  constructor(parent: HTMLDivElement) {

    this.slidersDiv = document.createElement('div');
    parent.append(this.slidersDiv);

    this.sliders = [];

  }

  public addSlider(label: string): void {
    this.sliders.push(new Slider(this.slidersDiv, label, () => {console.log()}));
  }

}