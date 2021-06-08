import React from "react";

import Location from "./examples/Locations/Location";
import Map from "./examples/Map/Map";
import SPath from "./examples/SPath/SPath";
import Home from "./examples/Language/Home";
import Region from "./examples/Region/Region";

export const EXAMPLE_LIST = [
  
  {
    name: "Locatioens",
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
  // {
  //   name: "Home",
  //   level: 3,
  //   component: <Home />,
  // },
  {
    name: "test",
    level: 4,
    component: <Region />,
  },
  // {
  //   name: "Home2",
  //   level: 3,
  //   // component: <Home />,
  // },
];
