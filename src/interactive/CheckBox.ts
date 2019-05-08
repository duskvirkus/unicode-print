export class CheckBox {

  public boxDiv: HTMLDivElement;
  public box: HTMLButtonElement;
  public label: HTMLLabelElement;
  public isChecked: boolean;

  public update: Function;

  constructor(parent: HTMLDivElement, label: string, update: Function) {

    this.update = update;

    this.onClick = this.onClick.bind(this);

    this.boxDiv = document.createElement('div');
    this.boxDiv.classList.add('box-div');
    parent.append(this.boxDiv);

    this.box = document.createElement('button');
    this.box.innerHTML = '☐';
    this.box.onclick = this.onClick;
    this.boxDiv.append(this.box);

    this.label = document.createElement('label');
    this.label.innerHTML = label;
    this.boxDiv.append(this.label);

    this.isChecked = false;

  }

  protected onClick(event): void {
    this.isChecked = !this.isChecked;
    this.box.innerHTML = this.isChecked ? '☑' : '☐';
    this.update();
  }

}