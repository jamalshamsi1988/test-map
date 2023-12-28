import React, { useEffect, useRef, useState } from "react";
import { Map, View } from "ol";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { OSM, Vector as VectorSource } from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { fromLonLat } from "ol/proj";
import { GeoJSON } from "ol/format";
import "ol/ol.css";
import { buffer } from "turf";

const MapPage = () => {
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const vectorLayer = new VectorLayer({
        source: new VectorSource({
          url: "https://openlayers.org/en/latest/examples/data/geojson/countries.geojson",
          format: new GeoJSON(),
        }),

        style: new Style({
          fill: new Fill({
            color: "rgba(255, 255, 255, 0.6)",
          }),
          stroke: new Stroke({
            color: "#319FD3",
            width: 1,
          }),
          image: new CircleStyle({
            radius: 7,
            fill: new Fill({
              color: "rgba(255, 255, 255, 0.6)",
            }),
            stroke: new Stroke({
              color: "#319FD3",
              width: 1,
            }),
          }),
        }),
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
          center: fromLonLat([37.41, 8.82]),
          zoom: 14,
        }),
      });

      map.on("pointermove", function (evt) {
        if (evt.dragging) {
          return;
        }
        const feature = map.forEachFeatureAtPixel(
          evt.pixel,
          function (feature, layers) {
            return feature;
          }
        );
        if (feature) {
          const coordinate = evt.coordinate;
          const msg = `Feature ${feature.getId()} at (${coordinate})`;

          const bufferedFeature = buffer(
            feature.getGeometry().getExtent(),
            0.5,
            { units: "kilometers" }
          );
          
        }
      });
    }
  }, []);


  return (
    <>
      <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />
    </>
  );
};

export default MapPage;
