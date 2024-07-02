import { VStack } from "@chakra-ui/react";
import { DateBox } from "@/components/homepage/date/DateBox";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";

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
    // console.log(newActivity);

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
      {tripDates.map((date) => (
        <DateBox
          key={date}
          date={date}
          activities={activities}
          isSelected={selectedDate === date}
          onDateClick={() => handleDateClick(date)}
          onAddActivity={handleAddActivity}
          onEditActivity={handleEditActivity}
          onDeleteActivity={handleDeleteActivity}
        />
      ))}
    </VStack>
  );
};
