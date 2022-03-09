<script lang="ts">
  import processSequence from '$lib/processSequence';
  import store from '$lib/store';

  export let sequence: number[];
  export let index: number;
</script>

<g transform="translate(0, {index * $store.rowMargin})">
  {#each processSequence(sequence) as s}
    <g transform="translate({s.x * $store.colWidth}, 0)">
      {#if s.state === 1}
        <rect
          width={s.length * $store.colWidth}
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
