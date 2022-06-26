import {
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import React, { useEffect, useState, useRef } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { tabState } from "../../atoms/atoms";

const DAYS = ["M", "T", "W", "Th", "F", "Sat", "Sun"];
const DEFAULT_FORM = {
  name: "",
  phoneNum: "",
  hasDriver: "Yes",
  additionalInfo: "",
};

const CreateRide = () => {
  const setTabStateVal = useSetRecoilState(tabState);

  // Form state management
  const [checkedDays, setCheckedDays] = useState([]);
  const [poolCount, setPoolCount] = useState(0);
  const [formState, setFormState] = useState(DEFAULT_FORM);

  // Submit button loading
  const [loading, setLoading] = useState(false);

  // Autocomplete input refs
  const originRef = useRef();
  const destinationRef = useRef();

  // Handle checking and unchecking of day boxes
  const handleDayChange = (day) => {
    if (checkedDays.includes(day)) {
      setCheckedDays(checkedDays.filter((d) => d !== day));
    } else {
      setCheckedDays([...checkedDays, day]);
    }
  };

  // Handle form change
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  // Handle submission of the form, add error checking and stuff here later
  const handleSubmit = async () => {
    setLoading(true);
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    const duration = results.routes[0].legs[0].duration.value;
    const distance = results.routes[0].legs[0].distance.value;

    const newPool = {
      ...formState,
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      days: [...checkedDays],
      poolCount: poolCount,
      createdAt: serverTimestamp(),
      distance: distance,
      duration: duration,
    };

    try {
      const docRef = await addDoc(collection(firestore, "pools"), newPool);
    } catch (error) {
      console.log("Submitting form", error);
    }
    setLoading(false);
    setTabStateVal("all");
  };

  return (
    <Stack
      width="100%"
      direction="column"
      padding="10px 20px"
      fontSize="14pt"
      spacing={4}
    >
      <Text fontWeight="bold">Contact information</Text>
      <Input
        placeholder="Name: "
        name="name"
        value={formState.name}
        onChange={handleChange}
      />
      <Input
        placeholder="Phone Number: "
        name="phoneNum"
        value={formState.phoneNum}
        onChange={handleChange}
      />

      <Text fontWeight="bold">Origin and destination</Text>
      <Autocomplete>
        <Input placeholder="From: " ref={originRef} />
      </Autocomplete>
      <Autocomplete>
        <Input placeholder="To: " ref={destinationRef} />
      </Autocomplete>

      <Text fontWeight="bold">
        How many poolers are you looking for? (-1 if no preference)
      </Text>
      <NumberInput
        defaultValue={0}
        min={-1}
        max={10}
        onChange={(e) => setPoolCount(e)}
      >
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>

      <Text fontWeight="bold">Can you provide transportation?</Text>
      <Select
        value={formState.hasDriver}
        onChange={handleChange}
        name="hasDriver"
      >
        <option>Yes</option>
        <option>No</option>
      </Select>

      <Text fontWeight="bold">How often will you need this pool?</Text>
      <CheckboxGroup>
        <Stack direction="row" justify="space-evenly">
          {DAYS.map((day) => (
            <Checkbox
              key={day}
              id={day}
              onChange={() => handleDayChange(day)}
              size="lg"
            >
              {day}
            </Checkbox>
          ))}
        </Stack>
      </CheckboxGroup>

      <Text fontWeight="bold">Additional information</Text>
      <Textarea
        placeholder="About this pool..."
        name="additionalInfo"
        value={formState.additionalInfo}
        onChange={handleChange}
      />

      <Button
        bg="def.800"
        color="white"
        borderRadius="10px"
        transition="0.2s"
        _hover={{
          bg: "def.900",
        }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Create Pool
      </Button>
    </Stack>
  );
};

export default CreateRide;
