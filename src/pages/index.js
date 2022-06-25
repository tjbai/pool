//@ts-check
import { Flex, Text, Button } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useRouter } from "next/router";

export default function Home() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  console.log(user);

  const handleClick = async () => {
    await signInWithGoogle();
    router.push("/rides");
  };

  return (
    <Flex flex={1} bg="def.400" height="100vh">
      <Flex
        flex={2}
        justify="center"
        align="flex-start"
        padding="50px"
        direction="column"
      >
        <Text
          fontWeight="bold"
          fontStyle="italic"
          color="white"
          fontSize={{ md: "6vw", base: "50pt" }}
        >
          Pool.it
        </Text>
        <Text
          fontStyle="italic"
          color="white"
          fontWeight="bold"
          fontSize="1.5vw"
          mb="20px"
          display={{ base: "none", md: "flex" }}
        >
          Environmental and financially-conscious ridesharing, made easy
        </Text>
        <Button
          borderRadius="20px"
          bg="def.400"
          border="2px solid white"
          color="white"
          transition="0.3s"
          _hover={{
            bg: "white",
            color: "def.400",
          }}
          padding="5px"
          width={{ base: "200px", md: "20%" }}
          fontSize={{ base: "12pt", md: "1.2vw" }}
          isLoading={loading}
          onClick={handleClick}
        >
          Continue with Google
        </Button>
      </Flex>
    </Flex>
  );
}
