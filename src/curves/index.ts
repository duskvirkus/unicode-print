import {
  OutputTerminal,
  Loop,
  TerminalConfig,
  random
} from 'terminaltxt';

let term: OutputTerminal;
const loop: Loop = new Loop(init, update);

function init(): void {
  term = new OutputTerminal(
    {
      width: 84,
      height: 40,
      container: document.getElementById('unicode-curves-container'),
    } as TerminalConfig
  );
  loop.frameRate(1000);
}

function update(): void {
  term.write(randomChar('╭╮╯╰'));
}

function randomChar(characters: string): string {
  let rand = Math.floor(random(characters.length));
  return characters.substring(rand, rand + 1);
}