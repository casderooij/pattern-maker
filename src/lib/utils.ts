import * as random from 'canvas-sketch-util/random';
import { mapRange } from 'canvas-sketch-util/math';

type Props = {
  rows: number;
  cols: number;
  seed: number;
  threshold: number;
  frequency: number;
};

function createPattern({
  rows,
  cols,
  seed = 10,
  threshold,
  frequency = 0.2,
}: Props): number[][] {
  random.setSeed(seed);
  const pattern = [];
  for (let i = 0; i < rows; i++) {
    const rowPattern = [];
    for (let j = 0; j < cols; j++) {
      let n = random.noise2D(i, j, frequency, 1);
      n = mapRange(n, -1, 1, 0, 1);
      if (n < threshold) {
        rowPattern.push(0);
      } else {
        rowPattern.push(1);
      }
    }
    pattern.push(rowPattern);
  }
  return pattern;
}

interface Sequence {
  state: number;
  length: number;
  x: number;
}

function processSequence(
  [current, ...rest]: number[],
  prev?: number,
  array: Sequence[] = [],
  x = 0
): Sequence[] {
  if (current === undefined) return array;

  if (prev !== current) {
    array = [...array, { state: current, length: 1, x }];
    return processSequence(rest, current, array, (x += 1));
  }

  array[array.length - 1].length += 1;
  return processSequence(rest, current, array, (x += 1));
}

export { createPattern, processSequence };
