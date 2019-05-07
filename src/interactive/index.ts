import {
  OutputTerminal,
  Loop,
  TerminalConfig,
  random
} from 'terminaltxt';

import {
  CheckBoxes
} from './CheckBoxes';

let term: OutputTerminal;
const loop: Loop = new Loop(init, update);
let characters: string = '';

let checkBoxes: CheckBoxes;
let options: string[];

function init(): void {
  term = new OutputTerminal(
    {
      width: 84,
      height: 40,
      container: document.getElementById('unicode-interactive-container'),
    } as TerminalConfig
  );
  loop.frameRate(1000);

  options = ['╭','╮','╯','╰'];

  checkBoxes = new CheckBoxes(
    document.getElementById('unicode-interactive-checkboxes') as HTMLDivElement,
    options,
    receiveOptions
  );
}

function update(): void {
  term.write(randomChar(characters));
}

function randomChar(characters: string): string {
  let rand = Math.floor(random(characters.length));
  return characters.substring(rand, rand + 1);
}

function receiveOptions(options: string): void {
  characters = options;
}