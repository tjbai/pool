//@ts-check
import React, { useState } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import RideDisplay from "../../components/Displays/RideDisplay";

// Change to dynamic geolocation if time
const CENTER = { lat: 42.2808, lng: -83.738 };

const Rides = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex height="100%" width="100vw" overflow="hidden">
      <RideDisplay />
      <Flex overflow="scroll" flex={1}>
        <GoogleMap
          center={CENTER}
          zoom={15}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          options={{
            streetViewControl: false,
            fullscreenControl: false,
            mapTypeControl: false,
            zoomControl: false,
          }}
        >
          {/* Display markers and directions inside here */}
        </GoogleMap>
      </Flex>
    </Flex>
  );
};

export default Rides;
