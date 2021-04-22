<script>
  import processPattern from './processPattern';
  import store from '$lib/store';

  export let pattern;
  export let index;

  console.log(processPattern(pattern));
</script>

<g transform="translate(0, {index * $store.rowMargin})">
  {#each processPattern(pattern) as sequence}
    <g transform="translate({sequence.x * $store.colWidth}, 0)">
      {#if sequence.state === 1}
        <rect
          width={sequence.length * $store.colWidth}
          height={$store.rowHeight}
          rx={$store.rowHeight / 2}
        />
      {/if}
    </g>
  {/each}
</g>

<style>
  rect {
    fill: #2a2a2a;
  }
</style>
