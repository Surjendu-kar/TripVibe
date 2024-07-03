import {
  Box,
  Text,
  VStack,
  Flex,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface FetchedActivitiesProps {
  activities: Activity[];
  onDeleteActivity: (activityId: string) => void;
}

export function FetchedActivities({
  activities,
  onDeleteActivity,
}: FetchedActivitiesProps) {
  const toast = useToast();

  if (activities.length === 0) {
    return null;
  }

  const handleDelete = (activityId: string) => {
    onDeleteActivity(activityId);
    toast({
      title: "Activity deleted",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box mt={40} mb={4}>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Fetched Activities:
      </Text>
      <VStack align="stretch" spacing={2}>
        {activities.map((activity) => (
          <Box key={activity._id} p={2} borderWidth={1} borderRadius="md">
            <Flex justifyContent="space-between" alignItems="center">
              <Box>
                <Text>{`Date: ${activity.formattedDate}`}</Text>
                <Text>{`Time: ${activity.formattedStartTime} - ${activity.formattedEndTime}`}</Text>
                <Text>{`Description: ${activity.description}`}</Text>
              </Box>
              <IconButton
                aria-label="Delete activity"
                icon={<DeleteIcon />}
                size="sm"
                onClick={() => handleDelete(activity._id)}
              />
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}
