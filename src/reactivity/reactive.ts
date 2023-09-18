import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export function reactive(raw) {
	return createActiveObjecet(raw, mutableHandlers);
}

export function readonly(raw) {
	return createActiveObjecet(raw, readonlyHandlers);
}

function createActiveObjecet(raw: any, baseHandlers) {
	return new Proxy(raw, baseHandlers);
}
