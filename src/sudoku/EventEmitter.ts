class MyEventEmitter extends EventTarget {
	on(target: string, callback: EventListenerOrEventListenerObject): void {
		this.addEventListener(target, callback);
	}

	off(target: string, callback: EventListenerOrEventListenerObject): void {
		this.removeEventListener(target, callback);
	}

	emit(target: string, value: string): void {
		this.dispatchEvent(new CustomEvent(target, { detail: value }));
	}
}

export default MyEventEmitter;
