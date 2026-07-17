import { describe, expect, it } from 'vitest';
import { classNames } from './classNames';

describe('classNames', () => {
  it('no parameters', () => {
    expect(classNames()).toBe('');
  });

  it('single string', () => {
    expect(classNames('foo')).toBe('foo');
  });

  it('combines strings', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('combine object', () => {
    expect(
      classNames({
        foo: true,
        bar: false,
        baz: true
      })
    ).toBe('foo baz');
  });

  it('combine multiple', () => {
    expect(
      classNames('aaa', ['bbb', 'ccc', ['ddd']], { eee: true, fff: false }, [
        'foo',
        { bar: true, bazz: false }
      ])
    ).toBe('aaa bbb ccc ddd eee foo bar');
  });
});
