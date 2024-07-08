"use client";
import { Box, Flex, Link as ChakraLink, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import TripIcon from "@/public/tripIcon.png";

function Navbar() {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-around"
      wrap="wrap"
      padding="1rem 0"
      bg="#373A40"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Link href="/">
          <Box borderRadius="md" overflow="hidden">
            <Image
              src={TripIcon}
              alt="Logo"
              width={50}
              height={50}
              style={{ borderRadius: "50%" }}
            />
          </Box>
        </Link>
      </Flex>

      <Flex>
        <Link href="/" passHref>
          <ChakraLink mr={4}>Home</ChakraLink>
        </Link>
        <Link href="/support" passHref>
          <ChakraLink>Support</ChakraLink>
        </Link>
      </Flex>
    </Flex>
  );
}

export default Navbar;
