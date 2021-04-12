class MyEventEmitter extends EventTarget {
	on(target: string, callback: EventListenerOrEventListenerObject): void {
		this.addEventListener(target, callback);
	}

	off(target: string, callback: EventListenerOrEventListenerObject): void {
		this.removeEventListener(target, callback);
	}

	emit(target: string): void {
		this.dispatchEvent(new Event(target));
	}
}

export default MyEventEmitter;
