import Alpine from 'alpinejs';

beforeAll(() => {
	window.Alpine = Alpine;
});

test('middleware > test', () => {
	expect(true).toBe(true);
});
