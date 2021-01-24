import { deepClone } from './objects';

describe('deepClone', () => {
    it('clones object with only first level properties', () => {
        const foo = {
            foo: 'bar',
            baz: 'qux',
        };
        expect(deepClone(foo)).toEqual(foo);
    });

    it('clones object with multi level children', () => {
        const foo = {
            foo: {
                bar: {
                    baz: 'qux',
                },
            },
        };
        expect(deepClone(foo)).toEqual(foo);
    });
});
