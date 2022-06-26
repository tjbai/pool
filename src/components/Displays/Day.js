import React from "react";
import { Flex } from "@chakra-ui/react";

const Day = ({ day, checkedDays }) => {
  return (
    <Flex
      borderLeftRadius={day == "M" ? "inherit" : "0px"}
      borderRightRadius={day == "Sun" ? "inherit" : "0px"}
      height="100%"
      width="40px"
      padding="8px"
      color={checkedDays.includes(day) ? "white" : "gray.500"}
      bg={checkedDays.includes(day) ? "def.400" : "gray.300"}
      fontWeight="bold"
      justify="center"
      align="center"
    >
      {day}
    </Flex>
  );
};

export default Day;
