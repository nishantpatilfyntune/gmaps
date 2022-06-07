import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import ModalComp from '../ModalComp';
import { shallowEqual, useSelector } from 'react-redux';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaWFtd2FzZWVtIiwiYSI6ImNsM3gxN2RxbjAwcGEzaXBqbjJvam0wbWwifQ.qoWy-EsS-Q5EWoemHwEk4Q';

export default function MapComponent() {
  const mapContainerRef = useRef(null);
  const {
    isLoading,
    weatherData: data,
    forcastData,
    isError,
  } = useSelector((state) => state, shallowEqual);
  const [lng, setLng] = useState(20);
  const [lat, setLat] = useState(70);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: 10,
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/cycling',
    });

    map.addControl(directions, 'top-left');

    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    // map.on('move', () => {
    //   setLng(map.getCenter().lng.toFixed(4));
    //   setLat(map.getCenter().lat.toFixed(4));
    //   setZoom(map.getZoom().toFixed(2));
    // });

    // // Clean up on unmount
    // return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '30%' }}>
        <ModalComp data={data} />
      </div>

      <div
        className="map-container"
        ref={mapContainerRef}
        style={{ width: '70%' }}
      />
    </div>
  );
}
