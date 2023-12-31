import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { GeoJSON } from "ol/format";
import "ol/ol.css";

import Mapdetailes from "./MapDetailes";

const MapPage = () => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const vectorLayer = new VectorLayer({
        url: "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
        format: new GeoJSON(),
      });
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          vectorLayer,
        ],
        view: new View({
          center: fromLonLat([-75.760933332842754, 45.375401587496128]),
          zoom: 9,
        }),
      });
    }
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ height: "100vh", width: "100vw",position:"absolute" }} />
      <Mapdetailes />
    </>
  );
};

export default MapPage;
