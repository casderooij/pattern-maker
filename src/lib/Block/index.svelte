<script>
  import Row from '$lib/Row/index.svelte';
  import store from '$lib/store';

  const rows = $store.rowCount;
  const cols = $store.colCount;
  const pattern = [];

  for (let i = 0; i < rows; i++) {
    const rowPattern = [];
    for (let j = 0; j < cols; j++) {
      const random = Math.random();
      if (random < 0.2) {
        rowPattern.push(0);
      } else {
        rowPattern.push(1);
      }
    }
    pattern.push(rowPattern);
  }

  function svgHeight() {
    return (
      $store.rowCount * ($store.rowHeight + $store.rowMargin / 2) -
      $store.rowMargin / 2
    );
  }
</script>

<div class="container">
  <svg width={$store.colCount * $store.colWidth} height={svgHeight()}>
    {#each pattern as row, index}
      <Row pattern={row} {index} />
    {/each}
  </svg>
</div>

<style>
  .container {
    width: 200px;
    height: 200px;
    /* background: lightblue; */
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    /* width: 100%;
    height: 100%; */
    /* background-color: lightcoral; */
  }
</style>
