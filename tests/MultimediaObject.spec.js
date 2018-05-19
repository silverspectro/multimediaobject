import test from 'ava';
import MultimediaObject from "../src/index";

test('my passing test', t => {
	t.throws(() => new MultimediaObject({
		name: "_#@kC2_  ~",
	}), Error);
});