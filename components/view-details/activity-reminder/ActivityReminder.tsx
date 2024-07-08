"use client";

import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  useDisclosure,
  Progress,
} from "@chakra-ui/react";

interface ActivityReminderProps {
  activities: Activity[];
}

function convertTo12HourFormat(time: string): string {
  if (time.toLowerCase().includes("am") || time.toLowerCase().includes("pm")) {
    return time.toLowerCase();
  }

  const [hours, minutes] = time.split(":");
  let hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? "pm" : "am";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minutes} ${ampm}`;
}

export function ActivityReminder({ activities }: ActivityReminderProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentActivities, setCurrentActivities] = useState<Activity[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const checkCurrentActivity = () => {
      const now = new Date();
      const currentTime = now
        .toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
        .toLowerCase();
      const currentDate = now.toLocaleDateString();

      const matchingActivities = activities.filter((activity) => {
        const isMatch =
          activity.formattedDate === currentDate &&
          convertTo12HourFormat(activity.formattedStartTime) <= currentTime &&
          convertTo12HourFormat(activity.formattedEndTime) >= currentTime;

        return isMatch;
      });

      if (matchingActivities.length > 0) {
        setCurrentActivities(matchingActivities);
        onOpen();
        setProgress(0);
      } else {
        console.log("No matching activities found");
      }
    };

    // Initial check
    checkCurrentActivity();

    const intervalId = setInterval(checkCurrentActivity, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, [activities, onOpen]);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    if (isOpen) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(progressInterval);
            onClose();
            return 0;
          }
          return prevProgress + 3; // Increase by 2% every 100ms
        });
      }, 100);
    }
    return () => clearInterval(progressInterval);
  }, [isOpen, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Current Activities</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4} paddingBottom={"0.5rem"}>
            {currentActivities.map((activity, index) => (
              <VStack
                key={index}
                align="start"
                spacing={2}
                p={4}
                borderWidth={1}
                borderRadius="md"
              >
                <Text fontWeight="bold">{activity.title}</Text>
                <Text>
                  Time: {activity.formattedStartTime} -{" "}
                  {activity.formattedEndTime}
                </Text>
                <Text>Notes: {activity.notes}</Text>
              </VStack>
            ))}
          </VStack>
          <Progress value={progress} size="xs" colorScheme="blue" mt={4} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
