import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/navbar/Navbar"), {
  ssr: false,
});
const AddTripBtn = dynamic(
  () => import("@/components/homepage/add-trip-btn/AddTripBtn"),
  { ssr: false }
);
const DisplayTripData = dynamic(
  () => import("@/components/homepage/display-trip-data/DisplayTripData"),
  { ssr: false }
);

function Page() {
  return (
    <Box>
      <Navbar />
      <Box mt={3}>
        <AddTripBtn />
        <Box mt={4}>
          <DisplayTripData />
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
