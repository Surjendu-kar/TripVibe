import {
  Box,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  Button,
} from "@chakra-ui/react";
import Link from "next/link";

interface Trip {
  _id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: {
    data: string;
    contentType: string;
  };
}

export async function fetchTrips() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v2/hello`,
    {
      cache: "no-store",
    }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

const DisplayTripData = async () => {
  const trips: { result: Trip[] } = await fetchTrips();

  if (!trips.result.length) {
    return <Box>No trips available</Box>;
  }

  return (
    <Box display={"flex"} flexWrap={"wrap"} gap={3}>
      {trips.result.map((trip) => (
        <Card
          key={trip._id}
          direction={{ base: "column", sm: "row" }}
          overflow="hidden"
          variant="outline"
          mb={4}
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
          borderWidth="1px"
          borderRadius="lg"
          style={{ width: "50%" }}
        >
          <Image
            objectFit="cover"
            maxW={{ base: "100%", sm: "200px" }}
            src={
              trip.image && trip.image.data
                ? `data:${trip.image.contentType};base64,${trip.image.data}`
                : "https://via.placeholder.com/150"
            }
            alt="Trip Destination"
          />
          <Stack>
            <CardBody>
              <Heading size="md">{trip.tripName}</Heading>
              <Text py="2">Destination: {trip.destination}</Text>
              <Text>Start Date: {trip.startDate}</Text>
              <Text>End Date: {trip.endDate}</Text>
            </CardBody>
            <CardFooter gap={3}>
              <Button variant="solid" colorScheme="teal">
                Edit
              </Button>
              <Link href={`/view-details/${trip._id}`}>
                <Button variant="outline" colorScheme="teal">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Stack>
        </Card>
      ))}
    </Box>
  );
};

export default DisplayTripData;
