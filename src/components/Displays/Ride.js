import React, { useEffect, useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { routesState } from "../../atoms/atoms";

// Just pass in a "ride" object once we actually sync with firebase
const Ride = ({ pool }) => {
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [routesStateVal, setRoutesStateVal] = useRecoilState(routesState);

  const calculateRoute = async () => {
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: pool.origin,
      destination: pool.destination,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setRoutesStateVal((prev) => {
      directions: [1, 2, 3];
    });
  };

  useEffect(() => {
    calculateRoute();
    console.log(routesStateVal);
  }, []);

  return (
    <Flex
      width="100%"
      bg="gray.200"
      transition="0.2s"
      borderRadius="10px"
      padding="10px"
      direction="row"
    >
      <Flex flex={2} direction="column">
        <Text fontSize="15pt" fontWeight="bold">
          {pool.name}
        </Text>
        <Text>
          <b>From:</b> {pool.origin}
        </Text>
        <Text>
          <b>To:</b> {pool.destination}
        </Text>
      </Flex>
      <Flex flex={1}>
        <Text color="gray.500">"{pool.additionalInfo}"</Text>
      </Flex>
    </Flex>
  );
};

export default Ride;
