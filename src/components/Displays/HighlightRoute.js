import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { routesState, poolState } from "../../atoms/atoms";
import { DirectionsRenderer } from "@react-google-maps/api";

const HighlightRoute = () => {
  const [poolStateVal, setPoolStateVal] = useRecoilState(poolState);

  return (
    <DirectionsRenderer
      directions={
        poolStateVal.selectedRoute ? poolStateVal.selectedRoute.route : []
      }
      options={{
        polyLineOptions: {},
      }}
    />
  );
};

export default HighlightRoute;
