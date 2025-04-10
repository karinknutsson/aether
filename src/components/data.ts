import type Feature from "./feature.interface";

export const features: Feature[] = [
  {
    type: "Feature",
    properties: {
      description: "Soviet War Memorial Treptow",
    },
    geometry: {
      type: "Point",
      coordinates: [52.487252, 13.469367],
    },
  },
  {
    type: "Feature",
    properties: {
      description: "Grunewald",
    },
    geometry: {
      type: "Point",
      coordinates: [52.487731, 13.211403],
    },
  },
  {
    type: "Feature",
    properties: {
      description: "Tiergarten",
    },
    geometry: {
      type: "Point",
      coordinates: [52.512238, 13.340973],
    },
  },
  {
    type: "Feature",
    properties: {
      description: "Volkspark Prenzlauer Berg",
    },
    geometry: {
      type: "Point",
      coordinates: [52.535379, 13.464988],
    },
  },
  //   { lat:, lng: , title: 'Grunewald' },
  //   { lat: 52.512238, lng: 13.340973, title: 'Tiergarten' },
  //   { lat: 54.13259, lng: 13.432281, title: 'Wampen' },
  //   { lat: 52.535379, lng: 13.464988, title: 'Volkspark Prenzlauer Berg' },
];
