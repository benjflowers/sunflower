<script>
	import { onMount } from 'svelte';
	let canvas

	onMount(() => {
		// default size is 300x150
		canvas = document.getElementById('canvas')
		const ctx = canvas.getContext('2d')
	})
	export let frameCount = 0;
</script>

<main>
	<h1>Frame Count: {frameCount}</h1>
	<canvas id="canvas"></canvas>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	#canvas {
		border: 1px solid #ff3e00;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>