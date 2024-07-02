import { CanvasSetup } from './CanvasSetup';
import { get } from 'svelte/store';
import { frameCount } from '../store';

let canvas: HTMLCanvasElement;
let setup: CanvasSetup;

export const animate = (_canvas: HTMLCanvasElement, _setup: CanvasSetup) => {
	canvas = _canvas;
	setup = _setup;
	const ctx = canvas.getContext('2d');

	if (ctx) {
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, 500, 500);

		const x = Math.random() * (setup.width - 20);
		const y = Math.random() * (setup.height - 20);
		const radius = Math.random() * 20 + 5;

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		ctx.fillStyle = 'blue';
		ctx.fill();

		cleanup();
	}

	if (setup.animationComplete) {
		return;
	}

	if (!setup.animationComplete) {
		requestAnimationFrame(() => animate(canvas, setup));
	}
};

const cleanup = () => {
	updateFrameCount();
	checkForComplete();
};

const checkForComplete = () => {
	if (get(frameCount) >= setup.frameLimit) {
		setup.animationComplete = true;
	}
};

const updateFrameCount = () => {
	frameCount.update((n) => n + 1);
};
