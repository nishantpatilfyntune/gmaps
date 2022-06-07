import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
mapboxgl.accessToken =
  'pk.eyJ1IjoiaWFtd2FzZWVtIiwiYSI6ImNsM3gxN2RxbjAwcGEzaXBqbjJvam0wbWwifQ.qoWy-EsS-Q5EWoemHwEk4Q';

export default function MapComponent() {
  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 14,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
    });

    map.addControl(directions, 'top-left');

    // map.on('move', () => {
    //   setLng(map.getCenter().lng.toFixed(4));
    //   setLat(map.getCenter().lat.toFixed(4));
    //   setZoom(map.getZoom().toFixed(2));
    // });

    // // Clean up on unmount
    // return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
}
