<script lang="ts">
  import Row from '$lib/Row.svelte';
  import store from '$lib/store';
  import createPattern from '$lib/createPattern';

  export let rows = 4;
  export let cols = 4;
  export let seed = 25;
  export let threshold = 0.5;
  export let frequency = 0.2;

  $: pattern = createPattern({ rows, cols, seed, threshold, frequency });

  const svgHeight =
    rows * ($store.rowHeight + $store.rowMargin / 2) - $store.rowMargin / 2;
  const svgWidth = cols * $store.colWidth;
</script>

<div class="container">
  <div class="seed">
    <p>seed:</p>
    <input class="input_seed" type="number" bind:value={seed} />
  </div>

  <svg width={svgWidth} height={svgHeight}>
    {#each pattern as row, index}
      <Row sequence={row} {index} />
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
</style>
