import { Flex, VStack, Heading, Text } from "@chakra-ui/react";
import { formatDate } from "../utils";

interface TripHeaderProps {
  tripName: string;
  startDate: string;
  endDate: string;
}

export function TripHeader({ tripName, startDate, endDate }: TripHeaderProps) {
  return (
    <Flex
      position="absolute"
      top="0"
      left="50%"
      transform="translate(-50%, -50%)"
      height="30vh"
      width="50%"
      bg="white"
      borderRadius="1rem"
      boxShadow="0 0 10px rgba(0, 0, 0, 0.5)"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={2} align="center">
        <Heading fontSize="2vw" textAlign="center">{tripName}</Heading>
        <Text fontSize="1vw" fontWeight="bold">
          {formatDate(startDate, 'short')} - {formatDate(endDate, 'short')}
        </Text>
      </VStack>
    </Flex>
  );
}