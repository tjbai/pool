import React, { useEffect, useState } from "react";
import Ride from "./Ride";
import { Stack } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import { tabState, poolState } from "../../atoms/atoms";
import { firestore } from "../../firebase/clientApp";
import {
  getDoc,
  query,
  collection,
  orderBy,
  getDocs,
} from "firebase/firestore";

const AllRides = () => {
  const [tabStateVal, setTabStateVal] = useRecoilState(tabState);
  const [poolStateVal, setPoolStateVal] = useRecoilState(poolState);
  const [loading, setLoading] = useState(false);

  const fetchPools = async () => {
    try {
      const poolQuery = query(
        collection(firestore, "pool")
        // orderBy("createdAt", "desc")
      );

      const poolDocs = await getDocs(poolQuery);
      const pools = poolDocs.docs.map((d) => ({ id: d.id, ...d.data() }));

      // Update recoil state
      setPoolStateVal((prev) => ({
        ...prev,
        pools: pools,
      }));
    } catch (error) {
      console.log("Fetching pools", error);
    }
  };

  useEffect(() => fetchPools, []);

  return (
    <Stack
      align="center"
      justify="flex-start"
      padding="20px"
      flex={1}
      width="100%"
      direction="column"
      maxHeight="98vh"
      overflow="scroll"
    >
      {poolStateVal.pools.map((p) => (
        <Ride pool={p} />
      ))}
    </Stack>
  );
};

export default AllRides;
