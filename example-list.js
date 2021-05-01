import React from "react";

import Location from "./examples/Locations/Location";
import Map from "./examples/Map/Map";
import SPath from "./examples/SPath/SPath";


export const EXAMPLE_LIST = [
  
  {
    name: "Locations",
    level: 1,
    component: <Location />,
  },
  {
    name: "Map",
    level: 2,
    component: <Map />,
  },
  
  {
    name: "Shortest path",
    level: 3,
    component: <SPath />,
  },
];
