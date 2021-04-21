/* eslint-disable @typescript-eslint/no-explicit-any */
import { DirectiveOptions } from 'vue';

class FireworkRenderer {
	bubbles = 100;

	colors = ['#DC2626', '#D97706', '#FBBF24'];

	public getRandomCoords(targetNode: HTMLElement) {
		const { x, y, width, height } = targetNode.getBoundingClientRect();

		const xVal = x + width / 2;
		const yVal = y + height / 2;

		return {
			x: Math.floor(Math.random() * xVal) + x - 100,
			y: Math.floor(Math.random() * yVal) + y,
		};
	}

	public render(particles: any, ctx: any, width: any, height: any) {
		// https://codepen.io/explosion/pen/zKEovE
		requestAnimationFrame(() => this.render(particles, ctx, width, height));
		ctx.clearRect(0, 0, width, height);

		particles.forEach((p: any) => {
			p.x += p.speed * Math.cos((p.rotation * Math.PI) / 180);
			p.y += p.speed * Math.sin((p.rotation * Math.PI) / 180);

			p.opacity -= 0.01;
			p.speed *= p.friction;
			p.radius *= p.friction;
			p.yVel += p.gravity;
			p.y += p.yVel;

			if (p.opacity < 0 || p.radius < 0) return;

			ctx.beginPath();
			ctx.globalAlpha = p.opacity;
			ctx.fillStyle = p.color;
			ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, false);
			ctx.fill();
		});

		return ctx;
	}

	public explode(x: any, y: any) {
		const particles = [];
		const ratio = window.devicePixelRatio;
		const c = document.createElement('canvas');
		const ctx = c.getContext('2d');

		c.style.position = 'absolute';
		c.style.left = `${x - 100}px`;
		c.style.top = `${y - 100}px`;
		c.style.pointerEvents = 'none';
		c.style.width = `${200}px`;
		c.style.height = `${200}px`;
		c.style.zIndex = '10000';
		c.width = 300 * ratio;
		c.height = 300 * ratio;
		document.body.appendChild(c);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const r = (a: any, b: any, d: any) =>
			parseFloat((Math.random() * ((a || 1) - (b || 0)) + (b || 0)).toFixed(d || 0));

		// eslint-disable-next-line no-plusplus
		for (let i = 0; i < this.bubbles; i++) {
			particles.push({
				x: c.width / 2,
				y: c.height / 2,
				radius: r(20, 30, null),
				color: this.colors[Math.floor(Math.random() * this.colors.length)],
				rotation: r(0, 360, true),
				speed: r(8, 12, null),
				friction: 0.9,
				opacity: r(0, 0.5, true),
				yVel: 0,
				gravity: 0.1,
			});
		}

		this.render(particles, ctx, c.width, c.height);
		setTimeout(() => document.body.removeChild(c), 1000);
	}
}

const instance = new FireworkRenderer();
let intervalFunc: ReturnType<typeof setInterval> | null;

const clear = () => {
	if (intervalFunc) {
		clearInterval(intervalFunc);
	}

	intervalFunc = null;
};

const fireworks: DirectiveOptions = {
	update(el, { value }, _vnode) {
		if (value && !intervalFunc) {
			const board = document.getElementById('board');

			intervalFunc = setInterval(() => {
				const points = instance.getRandomCoords(board!);
				instance.explode(points.x, points.y);
			}, 750);
		}

		if (!value && intervalFunc) {
			clear();
		}
	},

	unbind() {
		clear();
	},
};

export default fireworks;
