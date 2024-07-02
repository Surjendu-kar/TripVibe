import DisplayTripData from "@/components/display-trip-data/DisplayTripData";
import Navbar from "@/components/navbar/Navbar";
import { Box } from "@chakra-ui/react";

function Page() {
  return (
    <Box>
      <Navbar />

      <Box mt={3}>
        <DisplayTripData />
      </Box>
    </Box>
  );
}

export default Page;
