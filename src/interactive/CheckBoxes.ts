export interface CheckBoxDOM {
  wrapperDiv: HTMLDivElement,
  box: HTMLButtonElement,
  label: HTMLLabelElement,
  isChecked: boolean,
}

export type ReceiveOptionsFunction = (options: string) => void;

export class CheckBoxes {

  public boxes: CheckBoxDOM[] = [];
  public checkedOptions: string;
  public boxesRootDiv: HTMLDivElement;

  public receiveOptions: ReceiveOptionsFunction;

  constructor(containerDiv: HTMLDivElement, options: string[], receiveOptions: ReceiveOptionsFunction) {

    this.receiveOptions = receiveOptions;

    this.onClick = this.onClick.bind(this);

    this.boxesRootDiv = document.createElement('div');
    this.boxesRootDiv.classList.add('check-boxes');
    containerDiv.append(this.boxesRootDiv);

    for (let i: number = 0; i < options.length; i++) {

      let wrapperDiv: HTMLDivElement = document.createElement('div');
      wrapperDiv.classList.add('box-div');
      this.boxesRootDiv.append(wrapperDiv);

      let box: HTMLButtonElement = document.createElement('button');
      box.innerHTML = '☐';
      box.onclick = this.onClick;
      wrapperDiv.append(box);

      let label: HTMLLabelElement = document.createElement('label');
      label.innerHTML = options[i];
      wrapperDiv.append(label);

      this.boxes.push({
        wrapperDiv: wrapperDiv, 
        box: box,
        label: label, 
        isChecked: false
      } as CheckBoxDOM);

    }
  }

  protected onClick(event: MouseEvent): void {
    let index: number = -1;
    for (let i: number = 0; i < this.boxes.length; i++) {
      if (event.toElement === this.boxes[i].box) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      return;
    }
    this.boxes[index].isChecked = !this.boxes[index].isChecked;
    this.setBoxInnerHTML(index);
    this.update();
  }

  protected setBoxInnerHTML(index): void {
    this.boxes[index].box.innerHTML = this.boxes[index].isChecked ? '☑' : '☐';
  }

  protected update(): void {
    let checkedBoxes: CheckBoxDOM[] = this.boxes.filter((box: CheckBoxDOM) => {
      return box.isChecked;
    });
    this.checkedOptions = checkedBoxes.map((box) => {
      return box.label.innerHTML;
    }).join('');
    this.sendOptions();
  }

  protected sendOptions(): void {
    this.receiveOptions(this.checkedOptions);
  }

}