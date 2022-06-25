//@ts-check
import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/clientApp";
import { GiStumpRegrowth } from "react-icons/gi";

const Header = () => {
  // const [user, loading, error] = useAuthState(auth);

  return (
    <Flex
      height="50px"
      bg="def.400"
      justify="center"
      align="center"
      padding="10px"
    >
      <Text fontWeight="bold" fontSize="20pt" fontStyle="italic" color="white">
        Pool.it
      </Text>
    </Flex>
  );
};

export default Header;
