import {
  Box,
  Text,
  Flex,
  Input,
  Button,
  VStack,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { formatDate } from "../utils";
import { useState } from "react";

interface Activity {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface DateBoxProps {
  date: string;
  activities: Activity[];
  isSelected: boolean;
  onDateClick: () => void;
  onAddActivity: (activity: Omit<Activity, "id">) => void;
  onEditActivity: (activity: Activity) => void;
  onDeleteActivity: (activityId: string) => void;
}

function formatTime(time: string): string {
  const [hours, minutes] = time.split(":");
  const date = new Date(2000, 0, 1, parseInt(hours), parseInt(minutes));
  return date
    .toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    })
    .toLowerCase();
}

export function DateBox({
  date,
  activities,
  isSelected,
  onDateClick,
  onAddActivity,
  onEditActivity,
  onDeleteActivity,
}: DateBoxProps) {
  const [newActivity, setNewActivity] = useState<Omit<Activity, "id" | "date">>(
    {
      startTime: "",
      endTime: "",
      description: "",
    }
  );
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingActivity) {
      setEditingActivity({ ...editingActivity, [name]: value });
    } else {
      setNewActivity((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (editingActivity) {
      onEditActivity(editingActivity);
      setEditingActivity(null);
    } else if (
      newActivity.startTime &&
      newActivity.endTime &&
      newActivity.description
    ) {
      onAddActivity({ ...newActivity, date }); // Ensure date is passed
      setNewActivity({ startTime: "", endTime: "", description: "" });
    }
  };

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity);
  };

  const handleDelete = (activityId: string) => {
    onDeleteActivity(activityId);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const filteredActivities = activities.filter(
    (activity) => activity.date === date
  );

  return (
    <Box
      p={4}
      borderWidth={1}
      borderRadius="md"
      onClick={onDateClick}
      cursor="pointer"
    >
      <Text fontWeight="bold">{formatDate(date)}</Text>
      <VStack align="start" spacing={2} mt={2} width="100%">
        {filteredActivities.map((activity) => (
          <Box key={activity.id} width="100%">
            {editingActivity && editingActivity.id === activity.id ? (
              <Flex direction="column" width="100%">
                <Flex mb={2} width="100%" justify="space-between">
                  <Flex>
                    <Input
                      name="startTime"
                      value={editingActivity.startTime}
                      onChange={handleInputChange}
                      type="time"
                      mr={2}
                      width="auto"
                    />
                    <Input
                      name="endTime"
                      value={editingActivity.endTime}
                      onChange={handleInputChange}
                      type="time"
                      width="auto"
                    />
                  </Flex>
                  <Button onClick={handleSubmit} size="sm">
                    Save
                  </Button>
                </Flex>
                <Input
                  name="description"
                  value={editingActivity.description}
                  onChange={handleInputChange}
                  mb={2}
                />
              </Flex>
            ) : (
              <>
                <Flex justify="space-between" align="center" width="100%">
                  <Text>
                    {formatTime(activity.startTime)} -{" "}
                    {formatTime(activity.endTime)}
                  </Text>
                  <Flex>
                    <IconButton
                      aria-label="Edit activity"
                      icon={<EditIcon />}
                      size="sm"
                      mr={2}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(activity);
                      }}
                    />
                    <IconButton
                      aria-label="Delete activity"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(activity.id);
                      }}
                    />
                  </Flex>
                </Flex>
                <Text>{activity.description}</Text>
              </>
            )}
          </Box>
        ))}
      </VStack>
      {isSelected && !editingActivity && (
        <Flex mt={2} onClick={handleInputClick} flexDirection="column">
          <Flex mb={2}>
            <Box mr={2}>
              <FormLabel htmlFor="startTime">Start time</FormLabel>
              <Input
                id="startTime"
                name="startTime"
                value={newActivity.startTime}
                onChange={handleInputChange}
                type="time"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="endTime">End time</FormLabel>
              <Input
                id="endTime"
                name="endTime"
                value={newActivity.endTime}
                onChange={handleInputChange}
                type="time"
              />
            </Box>
          </Flex>
          <Box mb={2}>
            <FormLabel htmlFor="description">Activity</FormLabel>
            <Input
              id="description"
              name="description"
              value={newActivity.description}
              onChange={handleInputChange}
              placeholder="Add an activity"
            />
          </Box>
          <Button onClick={handleSubmit} alignSelf="flex-end">
            Add
          </Button>
        </Flex>
      )}
    </Box>
  );
}
