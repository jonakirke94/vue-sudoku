import MyEventEmitter from '../EventEmitter';

export default class Timer extends MyEventEmitter {
	private timerFunction: ReturnType<typeof setInterval>;

	private startTime: number;

	private elapsedSeconds = 0;

	private pausedSeconds = 0;

	constructor() {
		super();
		this.start();
	}

	public start(): void {
		this.startTime = Date.now();
		this.timerFunction = setInterval(() => {
			this.intrementor();
		}, 500);
	}

	public pause(): void {
		console.log('paused');
		clearInterval(this.timerFunction);
		this.pausedSeconds = this.elapsedSeconds;
	}

	public format(num: number): string {
		let minutes: number | string = Math.floor(num / 60);
		let seconds: number | string = num % 60;

		if (minutes < 10) {
			minutes = `0${minutes}`;
		}

		if (seconds < 10) {
			seconds = `0${seconds}`;
		}

		return `${minutes}:${seconds}`;
	}

	private intrementor(): void {
		const delta = Date.now() - this.startTime;

		this.elapsedSeconds = Math.floor(delta / 1000) + this.pausedSeconds;

		const formatted = this.format(this.elapsedSeconds);
		this.emit('tick', formatted);
	}
}
