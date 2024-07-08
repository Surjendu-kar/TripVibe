import { VStack, Container, Skeleton, Box } from "@chakra-ui/react";

export default function Loading() {
  return (
    <VStack spacing={0} align="stretch">
      <Skeleton height="300px" width="100%" /> {/* Placeholder for TripImage */}
      <Container position="relative" maxWidth="container.xl" height="full">
        <Box mb={6}>
          <Skeleton height="40px" width="60%" mb={2} /> {/* Trip name */}
          <Skeleton height="20px" width="40%" /> {/* Date range */}
        </Box>

        {/* Placeholder for FetchedActivities */}
        <Box mb={6}>
          <Skeleton height="30px" width="40%" mb={2} />
          <Skeleton height="100px" width="100%" mb={2} />
          <Skeleton height="100px" width="100%" mb={2} />
        </Box>

        {/* Placeholder for ActivityList */}
        <Box mb={6}>
          <Skeleton height="30px" width="40%" mb={2} />
          <Skeleton height="100px" width="100%" mb={2} />
          <Skeleton height="100px" width="100%" mb={2} />
        </Box>

        {/* Placeholder for Save All Activities button */}
        <Skeleton height="40px" width="200px" float="right" mt={4} mb={5} />

        {/* Placeholder for ActivityReminder */}
        <Box mt={6}>
          <Skeleton height="100px" width="100%" />
        </Box>
      </Container>
    </VStack>
  );
}