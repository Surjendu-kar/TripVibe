import { Box, Heading, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
function Support() {
  return (
    <Box>
      <Navbar />
      <Box mt={3} p={4}>
        <Heading>Support</Heading>
        <Text mt={4}>
          This is the support page. Add your support content here.
        </Text>
      </Box>
    </Box>
  );
}

export default Support;
