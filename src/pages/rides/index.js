//@ts-check
import {
  Flex,
  Text,
  Button,
  Box,
  Stack,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { routesState, poolState, modalState } from "../../atoms/atoms";
import RideDisplay from "../../components/Displays/RideDisplay";
import HighlightRoute from "../../components/Displays/HighlightRoute";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

// Change to dynamic geolocation if time
const CENTER = { lat: 42.2808, lng: -83.738 };

const Rides = () => {
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [routesStateVal, setRoutesStateVal] = useRecoilState(routesState);
  const [poolStateVal, setPoolStateVal] = useRecoilState(poolState);
  const [modalStateVal, setModalStateVal] = useRecoilState(modalState);
  const [modalLoading, setModalLoading] = useState(false);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
    libraries: ["places"],
  });

  const closeModal = () => {
    setModalStateVal((prev) => ({
      ...prev,
      modal: false,
    }));
  };

  const handleSubmitModal = async () => {
    setModalStateVal((prev) => ({
      ...prev,
      button: true,
    }));
    setTimeout(closeModal, 1000);
  };

  if (!isLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <Flex height="100%" width="100vw" overflow="hidden">
      {/* MODAL */}
      <Modal isOpen={modalStateVal.modal} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <Flex borderRadius="10px" direction="column">
            <Flex
              height="50px"
              width="100%"
              bg="def.400"
              align="center"
              justify="center"
              fontSize="16pt"
              fontStyle="italic"
              fontWeight="bold"
              color="white"
            >
              Join Pool
            </Flex>
            <Stack
              direction="column"
              justify="flex-start"
              padding="15px"
              spacing={3}
            >
              <Text>
                <b>Contact information</b>
              </Text>
              <Input placeholder="Name" />
              <Input placeholder="Phone Number" />
              <Text>
                <b>Introduce yourself!</b>
              </Text>
              <Textarea placeholder="About me..." />
              <Text>
                <b>Any accomodations?</b>
              </Text>
              <Textarea placeholder="Ex. Meet halfway... " />
              <Text>
                <b>Can you provide transportation?</b>
              </Text>
              <Select>
                <option>Yes</option>
                <option>No</option>
              </Select>
              <Button
                border="3px solid"
                borderColor="def.400"
                bg="white"
                color="def.400"
                transition="0.2s"
                _hover={{
                  bg: "def.400",
                  color: "white",
                }}
                borderRadius="10px"
                width="50%"
                alignSelf="center"
                onClick={handleSubmitModal}
                isLoading={modalStateVal.button}
              >
                Get in touch!
              </Button>
            </Stack>
          </Flex>
        </ModalContent>
      </Modal>

      <RideDisplay map={map} />
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
          onLoad={(m) => setMap(m)}
        >
          {poolStateVal.selectedRoute && <HighlightRoute />}
          {routesStateVal[0] &&
            routesStateVal.map((route) => (
              <DirectionsRenderer
                key={route.id}
                directions={route.route}
                options={{
                  polylineOptions: {
                    strokeColor: "red",
                    zIndex: -1,
                  },
                }}
              />
            ))}
        </GoogleMap>
      </Flex>
    </Flex>
  );
};

export default Rides;
