import data from './assets/image_data';

test('image data contains ten entries', () => {
  expect(data.data).toHaveLength(10);
});

