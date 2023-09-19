import { mutableHandlers, readonlyHandlers } from './baseHandlers';

export const enum ReaactiveFlags {
	IS_REACTIVE = '__v_isReactive',
	IS_READONLY = '__v_isReadonly',
}

export function reactive(raw) {
	return createActiveObjecet(raw, mutableHandlers);
}

export function readonly(raw) {
	return createActiveObjecet(raw, readonlyHandlers);
}

export function isReactive(value) {
	return !!value[ReaactiveFlags.IS_REACTIVE];
}

export function isReadonly(value) {
	return !!value[ReaactiveFlags.IS_READONLY];
}

function createActiveObjecet(raw: any, baseHandlers) {
	return new Proxy(raw, baseHandlers);
}
