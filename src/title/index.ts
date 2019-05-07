import {
  OutputTerminal,
  Loop,
  TerminalConfig,
  random
} from 'terminaltxt';

let term: OutputTerminal;
const loop: Loop = new Loop(init, update);
let count: number = 0;
let title: string = 'UNICODE PRINT';

function init(): void {
  term = new OutputTerminal(
    {
      width: 13,
      height: 40,
      container: document.getElementById('unicode-title-container'),
    } as TerminalConfig,
    title
  );
  loop.frameRate(20);
}

function update(): void {
  if (count % 14 === 0) {
    term.writeln(title);
  } else {
    term.write(randomChar(title + '                             '));
  }
  count++;
}

function randomChar(characters: string): string {
  let rand = Math.floor(random(characters.length));
  return characters.substring(rand, rand + 1);
}