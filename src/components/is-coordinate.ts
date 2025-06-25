export default function isCoordinate(input: string) {
  const coordRegex = /^\s*(-?\d+(\.\d+)?)[,\s]+(-?\d+(\.\d+)?)\s*$/;
  const match = input.match(coordRegex);
  if (!match || !match[1] || !match[3]) return null;

  const lat = parseFloat(match[1]);
  const lng = parseFloat(match[3]);

  if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
    return { lat, lng };
  }
  return null;
}
