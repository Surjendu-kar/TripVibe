"use client";
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
import { useEffect, useState } from "react";

interface Activity {
  _id: string;
  formattedDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  description: string;
}

interface DateBoxProps {
  date: string;
  activities: Activity[];
  isSelected: boolean;
  onDateClick: () => void;
  onAddActivity: (activity: Omit<Activity, "_id">) => void;
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
  const [newActivity, setNewActivity] = useState({
    formattedStartTime: "",
    formattedEndTime: "",
    description: "",
  });
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
      newActivity.formattedStartTime &&
      newActivity.formattedEndTime &&
      newActivity.description
    ) {
      onAddActivity({ ...newActivity, formattedDate: date });
      setNewActivity({
        formattedStartTime: "",
        formattedEndTime: "",
        description: "",
      });
    }
  };

  const handleEditClick = (activity: Activity) => {
    setEditingActivity(activity);
  };

  const handleDeleteClick = (activityId: string) => {
    onDeleteActivity(activityId);
  };

  const handleCancelEdit = () => {
    setEditingActivity(null);
  };

  const handleInputClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const filteredActivities = activities.filter(
    (activity) => activity.formattedDate === date
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
          <Box key={activity._id} width="100%" position="relative">
            <Text>
              {formatTime(activity.formattedStartTime)} -{" "}
              {formatTime(activity.formattedEndTime)}
            </Text>
            <Text>{activity.description}</Text>
            <Flex position="absolute" top={0} right={0}>
              <IconButton
                aria-label="Edit activity"
                icon={<EditIcon />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleEditClick(activity);
                }}
                mr={1}
              />
              <IconButton
                aria-label="Delete activity"
                icon={<DeleteIcon />}
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick(activity._id);
                }}
              />
            </Flex>
          </Box>
        ))}
      </VStack>
      {(isSelected || editingActivity) && (
        <Flex mt={2} onClick={handleInputClick} flexDirection="column">
          <Flex mb={2}>
            <Box mr={2}>
              <FormLabel htmlFor="formattedStartTime">Start time</FormLabel>
              <Input
                id="formattedStartTime"
                name="formattedStartTime"
                value={
                  editingActivity?.formattedStartTime ||
                  newActivity.formattedStartTime
                }
                onChange={handleInputChange}
                type="time"
              />
            </Box>
            <Box>
              <FormLabel htmlFor="formattedEndTime">End time</FormLabel>
              <Input
                id="formattedEndTime"
                name="formattedEndTime"
                value={
                  editingActivity?.formattedEndTime ||
                  newActivity.formattedEndTime
                }
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
              value={editingActivity?.description || newActivity.description}
              onChange={handleInputChange}
              placeholder="Add an activity"
            />
          </Box>
          <Flex justifyContent="flex-end">
            {editingActivity && (
              <Button onClick={handleCancelEdit} mr={2}>
                Cancel
              </Button>
            )}
            <Button onClick={handleSubmit}>
              {editingActivity ? "Update" : "Add"}
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  );
}
