import {
  MapContainer,
  ImageOverlay,
  FeatureGroup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw-src.css";
import { useEffect, useRef, useState } from "react";

const Image = ({ lines, setLines }) => {
  const url =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Sydney_Opera_House_-_Dec_2008.jpg/1024px-Sydney_Opera_House_-_Dec_2008.jpg";

  const map = useMap();

  const [bounds, setBounds] = useState();

  const handleChange = (e) => {};

  const handleCreate = (e) => {
    console.group("created");
    const { layer, target } = e;
    const startPoint = layer.editing.latlngs[0][0];
    const endPoint = layer.editing.latlngs[0][1];
    // console.log("startPoint ", startPoint);
    // console.log("endPoint ", endPoint);
    console.log("leaflet_id ", target._leaflet_id);
    console.log("start 1", map.project(startPoint, 0));
    console.log("start 2", startPoint);
    // console.log("end ", map.project(endPoint, 0));
    // console.log("end ", endPoint);
    console.groupEnd();
  };

  const handleRemve = (e) => {};

  //   useEffect(() => {
  //     setBounds(map.getBounds());
  //   }, []);

  useEffect(() => {
    const image = L.imageOverlay(url, [
      [0, 0],
      [1000, 1600],
    ]).addTo(map);

    map.fitBounds(image.getBounds());
  }, []);

  return (
    <EditControl
      position="bottomright"
      onEdited={handleChange}
      onCreated={handleCreate}
      onDeleted={handleRemve}
      draw={{
        circle: false,
        marker: false,
        polyline: {
          maxPoints: 2,
        },
        rectangle: false,
        circlemarker: false,
        polygon: false,
      }}
    />
  );
};

const Map = () => {
  const [lines, setLines] = useState({ data: [] });

  return (
    <MapContainer
      crs={L.CRS.Simple}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <FeatureGroup>
        <Image lines={lines} setLines={setLines} />
      </FeatureGroup>
    </MapContainer>
  );
};

export default Map;
