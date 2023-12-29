import React, { useEffect, useRef, useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";

import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM } from "ol/source";
import { fromLonLat } from "ol/proj";
import { GeoJSON } from "ol/format";
import "ol/ol.css";

import parkDate from "../data/skateboard-parks.json";
import Mapdetailes from "./MapNew";

const MapPage = () => {
  const mapRef = useRef();
  const [selectedPark, setSelectedPark] = useState();
  const [viewport, setViewport] = useState({
    latitude: 45.4211,
    longitude: -75.6903,
    zoom: 10,
  });
  useEffect(() => {
    if (mapRef.current) {
      const vectorLayer = new VectorLayer({
        url: "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
        format: new GeoJSON(),
        width: "100vw",
        height: "100vh",
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
          center: fromLonLat([51.65, 51.18]),
          zoom: 14,
        }),
      });
    }
  }, []);

  return (
    <>
      <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
      <Mapdetailes />
    </>
  );
};

export default MapPage;
