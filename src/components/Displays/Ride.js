import React, { useEffect, useState } from "react";
import { Flex, Text, Icon, Stack, Box, Button } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { routesState, poolState, modalState } from "../../atoms/atoms";
import { GoVerified } from "react-icons/go";
import { MdEmojiPeople } from "react-icons/md";
import { AiFillCar } from "react-icons/ai";
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { BsClockFill, BsTrashFill } from "react-icons/bs";
import { RiPinDistanceFill } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import Day from "./Day";
import Geocode from "react-geocode";
import { useRouter } from "next/router";

// Just pass in a "ride" object once we actually sync with firebase
const Ride = ({ pool, map }) => {
  const [routesStateVal, setRoutesStateVal] = useRecoilState(routesState);
  const [poolStateVal, setPoolStateVal] = useRecoilState(poolState);
  const [modalStateVal, setModalStateVal] = useRecoilState(modalState);
  const router = useRouter();

  const toTime = (seconds) => {
    let min = Math.round(seconds / 60);
    return `${min} m`;
  };

  const toMiles = (yards) => {
    return `${Math.round(yards / 1760)} mi`;
  };

  const indicatorColor = (seconds) => {
    if (seconds < 600) {
      return "def.400";
    } else if (seconds < 900) {
      return "#dbd13b";
    } else {
      return "red";
    }
  };

  // toStart or toEnd
  const handleClick = (command) => {
    Geocode.setApiKey(process.env.NEXT_PUBLIC_MAPS_API_KEY);
    Geocode.setLocationType("ROOFTOP");

    const r = routesStateVal.find((r) => r.id === pool.id);
    setPoolStateVal((prev) => ({
      ...prev,
      selectedRoute: r,
      isSelected: !poolStateVal.isSelected,
    }));

    const loc = command === "START" ? pool.origin : pool.destination;
    Geocode.fromAddress(loc).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        map.panTo({ lat: lat, lng: lng });
      },
      (error) => {
        console.log("ERROR");
      }
    );
  };

  // User selects this post
  const handleSelect = (event) => {
    setModalStateVal({ modal: true, button: false });
  };

  return (
    <Flex
      p="15px"
      width="100%"
      bg="def.300"
      transition="0.2s"
      borderRadius="10px"
      direction="row"
    >
      <Stack flex={6} spacing={3} direction="column" borderColor="gray.500">
        <Stack align="center" direction="row">
          <Text fontSize="18pt" fontWeight="bold">
            {pool.name}
          </Text>
          <Icon color="#1D9BF0" as={GoVerified} ml={1} />
          <Text color="gray.500">{pool.phoneNum}</Text>
          {pool.name === "TJ Bai" && (
            <Flex flex={1} height="100%" justify="flex-end">
              <Button
                bg="red"
                borderRadius="50%"
                height="40px"
                width="40px"
                color="white"
                transition="0.2s"
                _hover={{
                  bg: "#a83248",
                }}
              >
                <Icon as={BsTrashFill} fontSize="15pt" />
              </Button>
            </Flex>
          )}
        </Stack>
        <Text>
          <b>From:</b> {pool.origin}
        </Text>
        <Text>
          <b>To:</b> {pool.destination}
        </Text>
        <Text>
          <b>About: </b>"{pool.additionalInfo}"
        </Text>

        {/* First row of specs */}
        <Flex direction="row" align="center" fontWeight="bold">
          <Flex
            align="center"
            padding="5px 10px"
            fontSize="15pt"
            fontWeight="bold"
            mr={2}
            borderRadius="10px"
            bg="def.400"
            color="white"
          >
            <Icon as={MdEmojiPeople} />
            <Text mr={1}>{pool.poolCount == -1 ? "Any" : pool.poolCount}</Text>
          </Flex>

          <Flex
            padding="8px"
            fontSize="18pt"
            borderRadius="10px"
            bg={pool.hasDriver === "Yes" ? "def.400" : "red"}
            color="white"
            mr={2}
          >
            <Icon as={AiFillCar} />
            {pool.hasDriver === "Yes" && (
              <Icon fontSize="15pt" ml={1} as={FaThumbsUp} />
            )}
            {pool.hasDriver === "No" && (
              <Icon fontSize="15pt" mt={0.5} ml={1} as={FaThumbsDown} />
            )}
          </Flex>

          <Flex
            justify="center"
            align="center"
            mr={2}
            padding="5px 10px"
            borderRadius="10px"
            bg={indicatorColor(pool.duration)}
            color="white"
          >
            <Icon as={RiPinDistanceFill} fontSize="20pt" />
            <Text fontSize="15pt" ml={1}>
              {toMiles(pool.distance)}
            </Text>
          </Flex>

          <Flex
            align="center"
            justify="center"
            fontSize="15pt"
            padding="5px"
            borderRadius="10px"
            bg={indicatorColor(pool.duration)}
            color="white"
          >
            <Icon as={BsClockFill} />
            <Text ml={1}>{toTime(pool.duration)}</Text>
          </Flex>

          <Flex flex={1} justify="flex-end">
            <Button
              width="155px"
              bg="def.800"
              fontSize="15pt"
              color="white"
              transition="0.2s"
              fontWeight="bold"
              _hover={{
                bg: "def.600",
              }}
              onClick={() => handleSelect()}
            >
              Join this Pool
            </Button>
          </Flex>
        </Flex>

        {/* WHICH DAYS */}
        <Stack direction="row" spacing={0} borderRadius="10px" fontSize="12pt">
          <Day checkedDays={pool.days} day="M" />
          <Day checkedDays={pool.days} day="T" />
          <Day checkedDays={pool.days} day="W" />
          <Day checkedDays={pool.days} day="Th" />
          <Day checkedDays={pool.days} day="F" />
          <Day checkedDays={pool.days} day="Sat" />
          <Day checkedDays={pool.days} day="Sun" />

          {/* START AND END */}
          <Flex justify="flex-end" flex={1}>
            <Button
              bg="def.800"
              color="white"
              transition="0.2s"
              _hover={{ bg: "def.600" }}
              borderRadius="10px"
              mr={2}
              width="75px"
              onClick={() => handleClick("START")}
            >
              <Icon mr={1} as={FaMapMarkerAlt} />
              Start
            </Button>
            <Button
              bg="def.800"
              color="white"
              transition="0.2s"
              _hover={{ bg: "def.600" }}
              borderRadius="10px"
              width="75px"
              onClick={() => handleClick("END")}
            >
              End
              <Icon ml={1} as={FaMapMarkerAlt} />
            </Button>
          </Flex>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default Ride;
