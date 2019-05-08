import {
  OutputTerminal,
  Loop,
  TerminalConfig,
  random,
  map
} from 'terminaltxt';

import {
  CheckBoxes
} from './CheckBoxes';

import {
  Sliders
} from './Sliders';

let term: OutputTerminal;
const loop: Loop = new Loop(init, update);
let characters: string = '';

let checkBoxes: CheckBoxes;
let options: string[];

let sliders: Sliders;

function init(): void {
  term = new OutputTerminal(
    {
      width: 84,
      height: 40,
      container: document.getElementById('unicode-interactive-container'),
    } as TerminalConfig
  );
  loop.frameRate(1000);

  options = '─│┄┆┈┊┌┐└┘├┤┬┴┼╌╎━┃┅┇┉┋┏┓┗┛┣┫┳┻╋╍╏╮╭╯╰╱╲╳╴╵╶╷'.split('');

  // '─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿'

  checkBoxes = new CheckBoxes(
    document.getElementById('unicode-interactive-checkboxes') as HTMLDivElement,
    options,
    receiveOptions
  );

  sliders = new Sliders(document.getElementById('unicode-interactive-sliders') as HTMLDivElement);
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
  const optionsSplit: string[] = options.split('');
  for (let i: number = 0; i < optionsSplit.length; i++) {
    sliders.addSlider(optionsSplit[i]);
  }
}