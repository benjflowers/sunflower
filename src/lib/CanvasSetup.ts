interface ICanvasSetup {
	canvas: HTMLCanvasElement;
	width: number;
	height: number;
	frameRate: number;
	frameLimit: number;
	animationDuration: number;
	animationComplete?: boolean;
}

const basicSetup = {
	width: 500,
	height: 500,
	frameRate: 24,
	animationDuration: 30
};

export class CanvasSetup implements ICanvasSetup {
	public canvas: HTMLCanvasElement;
	public width: number;
	public height: number;
	public frameRate: number;
	public frameLimit: number;
	public animationDuration: number;
	private _animationComplete: boolean;

	constructor(options: Partial<ICanvasSetup> & { canvas: HTMLCanvasElement }) {
		const settings = { ...basicSetup, ...options };
		this.canvas = settings.canvas;
		this.width = settings.width;
		this.height = settings.height;
		this.frameRate = settings.frameRate;
		this.animationDuration = settings.animationDuration;
		this.frameLimit = this.frameRate * this.animationDuration;
		this._animationComplete = false;
	}

	setCanvasSize() {
		this.canvas.setAttribute('width', this.width.toString());
		this.canvas.setAttribute('height', this.height.toString());
	}

	get animationComplete(): boolean {
		return this._animationComplete;
	}

	set animationComplete(value: boolean) {
		this.animationComplete = value;
	}
}
