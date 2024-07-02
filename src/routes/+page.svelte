<script>
  import { onMount } from 'svelte';
  import { CanvasSetup, animate } from '$lib';
  import { frameCount } from '../store'

  let canvas;
  let setup;
  const createSomeIsh = (canvas, setup) => {
    animate(canvas, setup);
  }
  onMount(() => {
    canvas = document.getElementById('canvas')
    setup = new CanvasSetup({canvas: canvas});

    setup.setCanvasSize()
  });
</script>

<h1>Lets make something</h1>
<button on:click={() => createSomeIsh(canvas, setup)}>Make it do</button>
<h2>Frame Count: {$frameCount}</h2>
<canvas id="canvas"></canvas>

<style>
  canvas {
    border: 1px solid black;
  }
</style>