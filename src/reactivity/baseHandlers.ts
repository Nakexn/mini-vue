import { track, trigger } from './effect';
import { ReaactiveFlags } from './reactive';

const get = createGetter();
const set = createSetter();
const readonlyGet = createGetter(true);

function createGetter(isReadonly = false) {
	return function get(target, key, receiver) {
		if (key === ReaactiveFlags.IS_REACTIVE) {
			return !isReadonly;
		} else if (key === ReaactiveFlags.IS_READONLY) {
			return isReadonly;
		}

		const res = Reflect.get(target, key, receiver);

		if (!isReadonly) {
			track(target, key);
		}
		return res;
	};
}

function createSetter() {
	return function set(target, key, value, receiver) {
		const res = Reflect.set(target, key, value, receiver);

		trigger(target, key);
		return res;
	};
}

export const mutableHandlers = {
	get,
	set,
};

export const readonlyHandlers = {
	get: readonlyGet,
	set(target, key, value, receiver) {
		console.warn(`key: ${key} set 失败，因为 target 是 readonly 的`, target);
		return true;
	},
};
