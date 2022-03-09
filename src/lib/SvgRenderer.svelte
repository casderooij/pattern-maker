<script>
  import { onMount } from 'svelte';
  import store from '$lib/store';
  import Row from '$lib/Row.svelte';
  import { createPattern } from '$lib/utils';
  import { Canvas } from 'glsl-canvas-js';

  export let rows = 10;
  export let cols = 12;
  export let seed = 25;
  export let threshold = 0.5;
  export let frequency = 0.2;

  let svgElement;
  let imgElement;
  let canvasElement;

  onMount(() => {
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const imageFromSvg = `data:image/svg+xml;base64,${window.btoa(
      unescape(encodeURIComponent(svgData))
    )}`;

    imgElement.setAttribute('src', imageFromSvg);
  });

  $: pattern = createPattern({ rows, cols, seed, threshold, frequency });

  const svgHeight =
    rows * ($store.rowHeight + $store.rowMargin / 2) - $store.rowMargin / 2;
  const svgWidth = cols * $store.colWidth;

  const sandbox = new Canvas(canvasElement);
</script>

<svg width={svgWidth} height={svgHeight} bind:this={svgElement}>
  {#each pattern as row, index}
    <Row sequence={row} {index} />
  {/each}
</svg>

<img bind:this={imgElement} alt="" />

<canvas bind:this={canvasElement} />

<style>
  svg {
    background: lightblue;
  }
</style>
