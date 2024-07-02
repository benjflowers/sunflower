<script>
  import { onMount } from 'svelte';
  import { CanvasSetup } from '$lib';

  let canvas;
  export const frameCount = 0;
  onMount(() => {
    canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    const setup = new CanvasSetup({canvas: canvas});

    setup.setCanvasSize()
  });
</script>

<h1>Lets make something</h1>
<h2>Frame Count: {frameCount}</h2>
<canvas id="canvas"></canvas>

<style>
  canvas {
    border: 1px solid black;
  }
</style>