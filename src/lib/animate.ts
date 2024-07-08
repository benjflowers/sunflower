import { CanvasSetup } from './CanvasSetup';
import { get } from 'svelte/store';
import { frameCount } from '../store';

let canvas: HTMLCanvasElement;
let setup: CanvasSetup;

export const animate = (_canvas: HTMLCanvasElement, _setup: CanvasSetup) => {
	canvas = _canvas;
	setup = _setup;
	const ctx = canvas.getContext('2d');

	if (!setup.animationComplete && ctx) {
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, 500, 500);

		const x = Math.random() * (setup.width - 20);
		const y = Math.random() * (setup.height - 20);
		const radius = Math.random() * 20 + 5;

		ctx.beginPath();
		ctx.arc(x, y, radius, 0, Math.PI * 2, true);
		ctx.fillStyle = 'blue';
		ctx.fill();

		const imageDateUrl = canvas.toDataURL();
		saveImage(imageDateUrl)
		cleanup();
	}

	return;
};

const saveImage = async (imageDataUrl: string) => {
	const fetchRes = await fetch(imageDataUrl);
	const blob = await fetchRes.blob();

	const formData = new FormData();
	formData.append('image', blob, `frame-${get(frameCount)}.png`);

	fetch('http://localhost:3000/upload', {
		method: 'POST',
		body: formData,
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error(error))
}

const cleanup = () => {
	updateFrameCount();
	if (!checkForComplete()) {
		requestAnimationFrame(() => animate(canvas, setup));
	}
};

const checkForComplete = () => {
	if (get(frameCount) >= setup.frameLimit) {
		setup.animationComplete = true;
		return true;
	} else {
		return false;
	}
};

const updateFrameCount = () => {
	frameCount.update((n) => n + 1);
};
