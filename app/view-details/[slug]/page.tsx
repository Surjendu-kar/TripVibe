"use client";
import { useEffect, useState } from "react";
import { Box, VStack, Container, Button, useToast } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { getAllDates } from "@/components/homepage/utils";
import { TripHeader } from "@/components/homepage/header/TripHeader";
import "react-datepicker/dist/react-datepicker.css";
import { TripImage } from "@/components/view-details/TripImage";
import { ActivityList } from "@/components/view-details/ActivityList";
import getData from "@/lib/fetchData";

export default function Page({ params }: { params: { slug: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  // const [isImageLoaded, setIsImageLoaded] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const fetchedTrips = await getData();
      const matchingTrip = fetchedTrips.find(
        (trip) => trip._id === params.slug
      );
      if (matchingTrip) {
        const _activities = matchingTrip?.activities;
        if (_activities) {
          setActivities(_activities);
        }

        setTrip(matchingTrip);
      } else {
        notFound();
      }
    })();
  }, [params.slug]);

  if (!trip) return null;

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
      description: activity.description,
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

  return (
    <VStack spacing={0} align="stretch">
      <TripImage image={trip.image} />
      <Container position="relative" maxWidth="container.xl" height="full">
        <TripHeader
          tripName={trip.tripName}
          startDate={trip.startDate}
          endDate={trip.endDate}
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
      </Container>
    </VStack>
  );
}
