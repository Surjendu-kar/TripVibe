"use client";

import { useState } from "react";
import { Box, VStack, Container, Button, useToast } from "@chakra-ui/react";
import { getAllDates } from "@/components/homepage/utils";
import { TripHeader } from "@/components/homepage/header/TripHeader";
import "react-datepicker/dist/react-datepicker.css";
import { TripImage } from "@/components/view-details/TripImage";
import { ActivityList } from "@/components/view-details/ActivityList";
import { FetchedActivities } from "@/components/view-details/FetchedActivities";
import { ActivityReminder } from "@/components/view-details/activity-reminder/ActivityReminder";

export default function ClientPage({ initialTrip }: { initialTrip: Trip }) {
  const [trip, setTrip] = useState<Trip>(initialTrip);
  const [activities, setActivities] = useState<Activity[]>(
    initialTrip.activities || []
  );
  const toast = useToast();

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

  const handleSaveAllActivities = async () => {
    if (!trip) return;

    const formattedActivities = activities.map((activity) => ({
      formattedDate: new Date(activity.formattedDate).toLocaleDateString(),
      formattedStartTime: formatTime(activity.formattedStartTime),
      formattedEndTime: formatTime(activity.formattedEndTime),
      title: activity.title,
      notes: activity.notes,
    }));

    console.log("Activities to be saved:", formattedActivities);

    try {
      const response = await fetch("/api/v2/hello", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: trip._id,
          activities: formattedActivities,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save activities");
      }

      const result = await response.json();

      if (result.success) {
        toast({
          title: "Success",
          description: "All activities saved successfully!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error(result.error || "Failed to save activities");
      }
    } catch (error) {
      console.error("Error saving activities:", error);
      toast({
        title: "Error",
        description: "Failed to save activities. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleDeleteFetchedActivity = async (activityId: string) => {
    if (!trip) return;

    try {
      const response = await fetch("/api/v2/hello", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: trip._id,
          activityId: activityId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete activity");
      }

      const result = await response.json();

      if (result.success) {
        // Update local state
        setTrip((prevTrip) => ({
          ...prevTrip!,
          activities:
            prevTrip!.activities?.filter(
              (activity) => activity._id !== activityId
            ) ?? [],
        }));

        setActivities((prevActivities) =>
          prevActivities.filter((activity) => activity._id !== activityId)
        );
      } else {
        throw new Error(result.error || "Failed to delete activity");
      }
    } catch (error) {
      console.error("Error deleting activity:", error);
      toast({
        title: "Error",
        description: "Failed to delete activity. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <VStack spacing={0} align="stretch">
      <TripImage image={trip.image} />
      <Container position="relative" maxWidth="container.xl" height="full">
        <TripHeader
          tripName={trip.tripName}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />

        <FetchedActivities
          activities={trip.activities ?? []}
          onDeleteActivity={handleDeleteFetchedActivity}
        />
        <ActivityList
          activities={activities}
          setActivities={setActivities}
          tripDates={getAllDates(trip.startDate, trip.endDate)}
        />
        <Button
          onClick={handleSaveAllActivities}
          colorScheme="green"
          size="lg"
          mb={5}
          float="right"
          mt={4}
        >
          Save All Activities
        </Button>
        <ActivityReminder activities={activities} />
      </Container>
    </VStack>
  );
}
