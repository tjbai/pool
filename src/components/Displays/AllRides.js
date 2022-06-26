import React, { useEffect, useState } from "react";
import Ride from "./Ride";
import { Stack, Select } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { tabState, poolState } from "../../atoms/atoms";
import { firestore } from "../../firebase/clientApp";
import { routesState } from "../../atoms/atoms";
import { query, collection, orderBy, getDocs } from "firebase/firestore";

const AllRides = ({ map }) => {
  const [poolStateVal, setPoolStateVal] = useRecoilState(poolState);
  const [routesStateVal, setRoutesStateVal] = useRecoilState(routesState);
  // const [loading, setLoading] = useState(false);

  // Calculate routes for each ride
  const calculateRoute = async (pools) => {
    let routes = [];

    const directionsService = new google.maps.DirectionsService();
    for (let i = 0; i < pools.length; i++) {
      const results = await directionsService.route({
        origin: pools[i].origin,
        destination: pools[i].destination,
        travelMode: google.maps.TravelMode.DRIVING,
      });

      routes = [...routes, { id: pools[i].id, route: results }];
    }

    return routes;
  };

  const fetchPools = async () => {
    const poolQuery = query(
      collection(firestore, "pools"),
      orderBy("createdAt", "desc")
    );

    const poolDocs = await getDocs(poolQuery);
    const pools = poolDocs.docs.map((p) => ({ id: p.id, ...p.data() }));
    setPoolStateVal((prev) => ({
      ...prev,
      pools: pools,
    }));

    const routes = await calculateRoute(pools);
    setRoutesStateVal(routes); // Update state

    // Obtain time and distances from calculated routes
    const specs = routes.map((r) => ({
      id: r.id,
      duration: r.route.routes[0].legs[0].duration.text,
      distance: r.route.routes[0].legs[0].distance.text,
    }));

    // Update state to reflect calculated times
    setPoolStateVal((prev) => ({
      ...prev,
      poolSpecs: specs,
    }));
  };

  useEffect(() => {
    fetchPools();
  }, []);

  return (
    <Stack
      align="center"
      justify="flex-start"
      padding="20px"
      spacing={5}
      flex={1}
      width="100%"
      direction="column"
      maxHeight="98vh"
      overflow="scroll"
    >
      <Select
        fontWeight="bold"
        fontSize="12pt"
        border="1px solid black"
        color="white"
        bg="def.800"
        _focus={{
          border: "0px solid",
        }}
      >
        <option>Date created</option>
        <option>Proximity (duration)</option>
        <option>Proximity (distance)</option>
        <option>Dates available</option>
        <option>Has driver</option>
        <option>Number of Poolers</option>
      </Select>
      {poolStateVal.pools.map((p) => (
        <Ride key={p.id} pool={p} map={map} />
      ))}
    </Stack>
  );
};

export default AllRides;
