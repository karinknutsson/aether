import type Feature from "./feature.interface";

export const features: Feature[] = [
  {
    type: "Feature",
    properties: {
      description: "Soviet War Memorial Treptow",
      attachments: [
        "example-images/merzouga.jpg",
        "example-images/chellah-storks.jpg",
        "example-images/meknes-medina.jpg",
      ],
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
      attachments: [
        "example-images/merzouga.jpg",
        "example-images/chellah-storks.jpg",
        "example-images/meknes-medina.jpg",
      ],
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
      attachments: [
        "example-images/merzouga.jpg",
        "example-images/chellah-storks.jpg",
        "example-images/meknes-medina.jpg",
      ],
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
