import sizeOf from 'image-size';

export default function getBase64ImageSize(base64Screenshot) {
  const buffer = new Buffer.from(base64Screenshot, 'base64'); // eslint-disable-line new-cap
  const size = sizeOf(buffer);
  return size;
}
