import data from './assets/image_data';

test('image data contains nine entries', () => {
  expect(data.data).toHaveLength(9);
});

