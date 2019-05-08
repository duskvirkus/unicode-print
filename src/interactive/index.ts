import {
  OutputTerminal,
  Loop,
  TerminalConfig,
  random,
  map
} from 'terminaltxt';

import {
  ControlPanel
} from './ControlPanel';

let term: OutputTerminal;
const loop: Loop = new Loop(init, update);
let characters: string = '';

let control: ControlPanel;

function init(): void {
  term = new OutputTerminal(
    {
      width: 84,
      height: 40,
      container: document.getElementById('unicode-interactive-container'),
    } as TerminalConfig
  );
  loop.frameRate(1000);

  control = new ControlPanel(
    document.getElementById('unicode-interactive-checkboxes') as HTMLDivElement,
    '─│┄┆┈┊┌┐└┘├┤┬┴┼╌╎━┃┅┇┉┋┏┓┗┛┣┫┳┻╋╍╏╮╭╯╰╱╲╳╴╵╶╷'
  );
  // '─━│┃┄┅┆┇┈┉┊┋┌┍┎┏┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿'
}

function update(): void {
  term.write(chooseFromSelected());
}

function randomChar(characters: string): string {
  let rand = Math.floor(random(characters.length));
  return characters.substring(rand, rand + 1);
}

function chooseFromSelected(): string {
  let sum: number = 0;
  for (let i: number = 0; i < control.selected.length; i++) {
    if (control.selected[i] !== -1) {
      sum += control.selected[i];
    }
  }
  let r: number = random(sum);
  for (let i: number = 0; i < control.selected.length; i++) {
    if (control.selected[i] !== -1) {
      if (r < control.selected[i]) {
        return control.options[i]
      } else {
        r -= control.selected[i];
      }
    }
  }
  return '';
}