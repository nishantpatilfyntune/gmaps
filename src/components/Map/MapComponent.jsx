import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import ModalComp from '../ModalComp';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/macro';
import { Heading } from '@chakra-ui/react';

mapboxgl.accessToken =
  'pk.eyJ1IjoiaWFtd2FzZWVtIiwiYSI6ImNsM3gxN2RxbjAwcGEzaXBqbjJvam0wbWwifQ.qoWy-EsS-Q5EWoemHwEk4Q';

export default function MapComponent() {
  const dispatch = useDispatch();
  const mapContainerRef = useRef(null);
  const {
    isLoading,
    weatherData: data,
    forcastData,
    isError,
  } = useSelector((state) => state, shallowEqual);
  const [lng, setLng] = useState(74.775751);
  const [lat, setLat] = useState(20.878755);

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
      interactive: false,
    });
    // console.log(directions);
    // directions.getOrigin((e) => console.log(e));
    map.addControl(directions, 'top-left');
    map.on('sourcedata', () => {
      let a = directions.getOrigin();
      let b = directions.getDestination();

      console.log('okok', a, b);
    });
    // directions.on('route', (e) => {

    //   // console.log('nice');
    //   // let routes = e.route;
    //   // let or = routes.map(
    //   //   (r) => r?.legs[0]?.steps[0].intersections[0].location[0]
    //   // );

    //   // // let tail = routes.map((r) => r.legs[0].steps.length);
    //   // // let de = routes.map((r) => r);

    // });
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
      `}
    >
      <div
        css={`
          padding: 5px 0;
          margin: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <Heading>Navigation System</Heading>
        <ModalComp data={data} />
      </div>

      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
}
