import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
  //UseRef: can be used to create so-called references which
  //can be one of two things, we often use them to get a reference,
  //a pointer at a real DOM node.

  // useEffect: It allows you to register some logic (i.e. a JS function)
  // which will be executed when certain dependencies - which you define - change.

  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom,
    });

    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
