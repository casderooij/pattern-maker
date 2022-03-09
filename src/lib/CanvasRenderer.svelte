<script>
  import { onMount } from 'svelte';
  import store from '$lib/store';
  import createPattern from '$lib/createPattern';
  import processSequence from '$lib/processSequence';

  let canvasElement;

  const rowCount = 10;
  const colCount = 30;

  let width;
  let height;

  let thresh = 0.5;

  onMount(() => {
    const ctx = setupCanvas();

    let pattern = createPattern({
      rows: rowCount,
      cols: colCount,
      seed: 12,
      threshold: thresh,
      frequency: 0.1,
    });

    ctx.fillStyle = 'lightblue';
    ctx.fillRect(0, 0, width, height);

    drawPattern(ctx, pattern);
  });

  function setupCanvas() {
    height =
      rowCount * ($store.rowHeight + $store.rowMargin / 2) -
      $store.rowMargin / 2;
    width = colCount * $store.colWidth;

    const dpi = window.devicePixelRatio;
    canvasElement.width = width * dpi;
    canvasElement.height = height * dpi;
    canvasElement.style.width = `${width}px`;
    canvasElement.style.height = `${height}px`;

    const ctx = canvasElement.getContext('2d');
    ctx.scale(dpi, dpi);

    return ctx;
  }

  function drawPattern(ctx, pattern) {
    ctx.lineStyle = 'black';
    ctx.lineWidth = 20;
    ctx.lineCap = 'round';

    ctx.save();
    ctx.translate(20, 20);
    pattern.forEach((row, rowIndex) => {
      processSequence(row).forEach((s) => {
        if (s.state === 1) {
          ctx.beginPath();
          ctx.moveTo(s.x * $store.colWidth, rowIndex * $store.rowMargin);
          ctx.lineTo(s.length * $store.colWidth, rowIndex * $store.rowMargin);
          ctx.stroke();
        }
      });
    });
    ctx.restore();
  }
</script>

<canvas bind:this={canvasElement} />

<input type="number" bind:value={thresh} />
