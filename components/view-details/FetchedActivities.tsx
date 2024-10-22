import {
  Box,
  Text,
  VStack,
  Flex,
  IconButton,
  useToast,
  Heading,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";

interface FetchedActivitiesProps {
  activities: Activity[];
  onDeleteActivity: (activityId: string) => void;
}

interface GroupedActivities {
  [date: string]: Activity[];
}

function formatDate(dateString: string): string {
  const [month, day, year] = dateString.split("/");
  return `${day}/${month}/${year}`;
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

  const groupedActivities: GroupedActivities = activities.reduce(
    (acc, activity) => {
      const date = activity.formattedDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(activity);
      return acc;
    },
    {} as GroupedActivities
  );

  const sortedDates = Object.keys(groupedActivities).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <Box mt={40} mb={4}>
      <VStack align="stretch" spacing={6}>
        {sortedDates.map((date, index) => (
          <Box key={date} mt={10}>
            <Heading size="lg" mb={4}>
              Day {index + 1}
              {"  "}
              <Text as="span" fontSize="md" color="gray.500">
                [ {formatDate(date)} ]
              </Text>
            </Heading>
            <VStack align="stretch" spacing={4}>
              {groupedActivities[date].map((activity) => (
                <Box
                  key={activity._id}
                  p={7}
                  borderWidth={1}
                  borderRadius="md"
                  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
                >
                  <Flex justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Flex alignItems="center" mb={2}>
                        <Box
                          as={FaMapMarkerAlt}
                          size="20px"
                          color="gray.500"
                          mr={2}
                        />
                        <Heading size="md">{activity.title}</Heading>
                      </Flex>
                      <Text ml={7}>{activity.notes}</Text>
                      <Text ml={7} fontSize="sm" color="gray.500">
                        {`${activity.formattedStartTime} - ${activity.formattedEndTime}`}
                      </Text>
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
        ))}
      </VStack>
    </Box>
  );
}
