<script>
  import Row from '$lib/Row/index.svelte';
  import store from '$lib/store';
  import * as random from 'canvas-sketch-util/random';
  import { mapRange } from 'canvas-sketch-util/math';

  const rows = $store.rowCount;
  const cols = $store.colCount;

  let seed = 25;
  let threshold = 0.5;

  function createPattern(t, s) {
    random.setSeed(s);
    const pattern = [];
    for (let i = 0; i < rows; i++) {
      const rowPattern = [];
      for (let j = 0; j < cols; j++) {
        let n = random.noise2D(i, j, 0.2, 1);
        n = mapRange(n, -1, 1, 0, 1);
        if (n < t) {
          rowPattern.push(0);
        } else {
          rowPattern.push(1);
        }
      }
      pattern.push(rowPattern);
    }
    return pattern;
  }

  $: pattern = createPattern(threshold, seed);

  function svgHeight() {
    return (
      $store.rowCount * ($store.rowHeight + $store.rowMargin / 2) -
      $store.rowMargin / 2
    );
  }

  function svgWidth() {
    return $store.colCount * $store.colWidth;
  }
</script>

<div class="container">
  <div class="seed">
    <p>seed:</p>
    <input class="input_seed" type="text" bind:value={seed} />
  </div>

  <svg width={svgWidth()} height={svgHeight()}>
    {#each pattern as row, index}
      <Row pattern={row} {index} />
    {/each}
  </svg>
  <input
    class="input_range"
    type="range"
    bind:value={threshold}
    min="0"
    max="1"
    step="0.01"
  />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .seed {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    align-self: flex-start;
    align-items: center;
  }
  .seed p {
    margin-right: 5px;
  }

  .input_seed {
    background: none;
    border: none;
    color: #2a2a2a;
  }
  .input_seed:focus {
    outline: none;
  }

  .input_range {
    margin-top: 20px;
    background: transparent;
  }

  svg {
    /* width: 100%;
    height: 100%; */
    /* background-color: lightcoral; */
  }
</style>
