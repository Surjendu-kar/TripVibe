import { VStack, Box, Icon, Text, Heading } from "@chakra-ui/react";
import { DateBox } from "@/components/homepage/date/DateBox";
import { v4 as uuid } from "uuid";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

interface ActivityListProps {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
  tripDates: string[];
}

export const ActivityList: React.FC<ActivityListProps> = ({
  activities,
  setActivities,
  tripDates,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const handleDateClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const handleAddActivity = (newActivity: Omit<Activity, "_id">) => {
    const activityWithId = {
      ...newActivity,
      _id: uuid(),
    };
    setActivities([...activities, activityWithId]);
  };

  const handleEditActivity = (editedActivity: Activity) => {
    setActivities(
      activities.map((activity) =>
        activity._id === editedActivity._id ? editedActivity : activity
      )
    );
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(activities.filter((activity) => activity._id !== activityId));
  };

  return (
    <VStack mt={40} spacing={4} align="stretch">
      <Heading size={"lg"} ml={2} mb={2}>
        Add Activity
      </Heading>
      {tripDates.map((date) => (
        <Box
          key={date}
          position="relative"
          boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        >
          <DateBox
            date={date}
            activities={activities}
            isSelected={selectedDate === date}
            onDateClick={() => handleDateClick(date)}
            onAddActivity={handleAddActivity}
            onEditActivity={handleEditActivity}
            onDeleteActivity={handleDeleteActivity}
          />
          {selectedDate !== date && (
            <Box
              position="absolute"
              top="50%"
              right="-40px"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={() => handleDateClick(date)}
            >
              <Icon as={AddIcon} w={6} h={6} color="black.500" />
              {/* <Text fontSize="sm" color="black.500">
                Add
              </Text> */}
            </Box>
          )}
        </Box>
      ))}
    </VStack>
  );
};
