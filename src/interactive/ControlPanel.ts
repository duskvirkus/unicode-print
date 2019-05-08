import { CheckBox } from "./CheckBox";
import { Slider } from "./Slider";

export class ControlPanel {

  public boxes: CheckBox[] = [];
  public sliders: Slider[] = [];

  public boxesDiv: HTMLDivElement;
  public slidersDiv: HTMLDivElement;

  public options: string[] = [];
  public selected: number[] = [];

  constructor(parent: HTMLDivElement, options: string) {

    this.update = this.update.bind(this);
    this.sliderUpdate = this.sliderUpdate.bind(this);

    this.boxesDiv = document.createElement('div');
    this.boxesDiv.classList.add('check-boxes');
    parent.append(this.boxesDiv);

    this.slidersDiv = document.createElement('div');
    parent.append(this.slidersDiv);

    this.options = options.split('');

    for (let i: number = 0; i < options.length; i++) {
      this.boxes.push(new CheckBox(this.boxesDiv, options[i], this.update));
      this.sliders.push(new Slider(this.slidersDiv, options[i], this.sliderUpdate))
      this.selected.push(-1);
    }

    for (let i: number = 0; i < this.sliders.length; i++) {
      this.sliders[i].display(false);
    }

  }

  protected update(): void {
    for (let i: number = 0; i < this.boxes.length; i++) {
      if (this.boxes[i].isChecked) {
        if (this.selected[i] === -1) {
          this.selected[i] = 0.5;
        }
      } else {
        this.selected[i] = -1;
      }
    }
    for (let i: number = 0; i < this.selected.length; i++) {
      this.sliders[i].display(!(this.selected[i] === -1));
    }
  }

  protected sliderUpdate(percent: number, character: string): void {
    for (let i: number = 0; i < this.options.length; i++) {
      if (this.options[i] === character) {
        this.selected[i] = percent;
      }
    }
  }

  public getSelected(): string {
    let selectedCharacters: string[] = [];
    for (let i: number = 0; i < this.selected.length; i++) {
      if (this.selected[i] !== -1) {
        selectedCharacters.push(this.options[i]);
      }
    }
    if (selectedCharacters.length > 0) {
      return selectedCharacters.join('');
    }
    return '';
  }

}