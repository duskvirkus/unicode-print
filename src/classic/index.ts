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
      container: document.getElementById('unicode-classic-container'),
    } as TerminalConfig
  );
  loop.frameRate(1000);
}

function update(): void {
  term.write(random() > 0.5 ? '╱' : '╲');
}