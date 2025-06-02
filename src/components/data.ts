import type Feature from "./feature.interface";

export const features: Feature[] = [
  {
    type: "Feature",
    properties: {
      description: "Soviet War Memorial Treptow",
      attachments: [],
      folderName: "war-memorial-treptow",
    },
    geometry: {
      type: "Point",
      coordinates: [13.469367, 52.487252],
    },
  },
  {
    type: "Feature",
    properties: {
      description: "Grunewald",
      attachments: [],
      folderName: "grunewald",
    },
    geometry: {
      type: "Point",
      coordinates: [13.211403, 52.487731],
    },
  },
  {
    type: "Feature",
    properties: {
      description: "Tiergarten",
      attachments: [],
      folderName: "tiergarten",
    },
    geometry: {
      type: "Point",
      coordinates: [13.340973, 52.512238],
    },
  },
  {
    type: "Feature",
    properties: {
      description: "Volkspark Prenzlauer Berg",
      attachments: ["0.jpg", "1.jpg", "2.jpg", "3.jpg"],
      folderName: "volkspark-prenzlauer-berg",
    },
    geometry: {
      type: "Point",
      coordinates: [13.464988, 52.535379],
    },
  },
  //   { lat:, lng: , title: 'Grunewald' },
  //   { lat: 52.512238, lng: 13.340973, title: 'Tiergarten' },
  //   { lat: 54.13259, lng: 13.432281, title: 'Wampen' },
  //   { lat: 52.535379, lng: 13.464988, title: 'Volkspark Prenzlauer Berg' },
];
