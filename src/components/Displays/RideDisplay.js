import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { tabState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import AllRides from "./AllRides";
import CreateRide from "./CreateRide";

const RideDisplay = () => {
  const [user, loading, error] = useAuthState(auth);
  const [tabStateVal, setTabStateVal] = useRecoilState(tabState);

  return (
    <Flex
      zIndex={2}
      bg="white"
      width="600px"
      transition="0.3s"
      align="flex-start"
      minHeight="98vh"
      direction="column"
      maxHeight="98vh"
      overflow="scroll"
    >
      <Flex
        width="100%"
        bg="def.800"
        align="center"
        padding="5px 20px"
        justify="space-between"
      >
        {user && (
          <Text
            color="white"
            fontWeight="bold"
            fontSize="18pt"
            fontStyle="italic"
          >
            Welcome, {user.displayName}
          </Text>
        )}
        <Flex justify="flex-end" align="center">
          <Button
            bg="white"
            color="def.800"
            transition="0.3s"
            border="3px solid white"
            _hover={{
              color: "white",
              bg: "def.800",
            }}
            _focus={{
              color: "white",
              bg: "def.800",
            }}
            width="120px"
            borderRadius="20px"
            onClick={() => {
              setTabStateVal("all");
            }}
            m={2}
          >
            Find Pool
          </Button>
          <Button
            bg="def.800"
            color="white"
            width="120px"
            border="3px solid white"
            transition="0.3s"
            _hover={{
              bg: "white",
              color: "def.800",
            }}
            _focus={{
              bg: "white",
              color: "def.800",
            }}
            borderRadius="20px"
            onClick={() => {
              setTabStateVal("create");
            }}
          >
            Create Pool
          </Button>
        </Flex>
      </Flex>

      {tabStateVal === "all" && <AllRides />}
      {tabStateVal === "create" && <CreateRide />}
    </Flex>
  );
};

export default RideDisplay;
