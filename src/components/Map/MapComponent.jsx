// import React, { useEffect } from 'react';
// import Map from 'react-mapbox-gl';
// import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css';
// import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// const MapComponent = () => {
//   const Map = ReactMapboxGl({
//     accessToken: process.env.MAPBOX_ACCESS_TOKEN,
//   });

//   return (
//     <Map
//       style="mapbox://styles/mapbox/streets-v9"
//       containerStyle={{
//         height: '100vh',
//         width: '100vw',
//       }}
//     >
//       <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
//         <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
//       </Layer>
//     </Map>
//   );
// };

// export default MapComponent;

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken =
  'pk.eyJ1IjoiaWFtd2FzZWVtIiwiYSI6ImNsM3gxN2RxbjAwcGEzaXBqbjJvam0wbWwifQ.qoWy-EsS-Q5EWoemHwEk4Q';

export default function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
