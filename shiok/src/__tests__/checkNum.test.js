import checkNum from '../hooks/checkNum';

const number = 123;
const string = 'test';

test('allow numeric input', () => {
    expect(checkNum(number)).toEqual(true);
});

test('disallow string input', () => {
    expect(checkNum(string)).toEqual(false);
});