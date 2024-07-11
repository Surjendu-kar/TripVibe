// loading.tsx
import { Box, Skeleton, Stack } from "@chakra-ui/react";

const DisplayTripDataSkeleton = () => {
  return (
    <Box>
      {[1, 2, 3].map((item) => (
        <Box
          key={item}
          mb={4}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
        >
          <Stack direction={{ base: "column", sm: "row" }} spacing={4}>
            <Skeleton height="200px" width={{ base: "100%", sm: "200px" }} />
            <Box p={4} width="100%">
              <Skeleton height="24px" width="50%" mb={2} />
              <Skeleton height="20px" width="70%" mb={2} />
              <Skeleton height="20px" width="60%" mb={2} />
              <Skeleton height="20px" width="60%" mb={4} />
              <Stack direction="row" spacing={4}>
                <Skeleton height="40px" width="80px" />
                <Skeleton height="40px" width="120px" />
              </Stack>
            </Box>
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

export default DisplayTripDataSkeleton;
