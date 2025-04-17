export default interface Feature {
  type: string;
  properties: {
    description: string;
    attachments: string[];
  };
  geometry: {
    type: string;
    coordinates: number[];
  };
}
