//@ts-check
import { Flex, Text, Button, Image, Box } from "@chakra-ui/react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../firebase/clientApp";
import { useRouter } from "next/router";

export default function Home() {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
  const router = useRouter();

  const handleClick = async () => {
    await signInWithGoogle();
    router.push("/rides");
  };

  return (
    <Flex flex={1} bg="def.400" height="100vh">
      <Flex
        flex={3}
        justify="center"
        align="flex-start"
        padding="50px"
        direction="column"
      >
        <Text
          fontWeight="bold"
          fontStyle="italic"
          color="white"
          fontSize={{ md: "8vw", base: "50pt" }}
          mb={{ base: "60px", md: "40px" }}
          height="8vw"
        >
          Pool
        </Text>
        <Text
          fontStyle="italic"
          color="white"
          fontWeight="bold"
          fontSize="1.6vw"
          mb="20px"
          display={{ base: "none", md: "flex" }}
        >
          Environmentally-conscious ridesharing, made easy
        </Text>
        <Button
          borderRadius="20px"
          bg="white"
          border="2px solid white"
          color="def.400"
          transition="0.3s"
          _hover={{
            bg: "def.400",
            color: "white",
          }}
          width={{ base: "200px", md: "20%" }}
          fontSize={{ base: "12pt", md: "1.2vw" }}
          isLoading={loading}
          onClick={handleClick}
        >
          Continue with Google
        </Button>
      </Flex>
      <Box
        position="absolute"
        top={40}
        right={10}
        height="65%"
        width="50%"
        display={{ base: "none", md: "flex" }}
        padding="50px"
      >
        <Image src="/homeScreen.png" objectFit="contain" />
      </Box>
    </Flex>
  );
}
