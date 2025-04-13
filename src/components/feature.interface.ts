export default interface Feature {
  type: string;
  properties: {
    description: string;
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}
