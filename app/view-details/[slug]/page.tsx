"use client";
import { useEffect, useState } from "react";
import { Box, VStack, Container, Button, useToast } from "@chakra-ui/react";
import { notFound } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import getData from "@/lib/fetchData";
import { getAllDates } from "@/components/homepage/utils";
import { TripHeader } from "@/components/homepage/header/TripHeader";
import { DateBox } from "@/components/homepage/date/DateBox";
import "react-datepicker/dist/react-datepicker.css";

interface Trip {
  _id: string;
  tripName: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: {
    data: string;
    contentType: string;
  };
}

interface Activity {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

export default function Page({ params }: { params: { slug: string } }) {
  const [trip, setTrip] = useState<Trip | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const toast = useToast();

  useEffect(() => {
    (async () => {
      const fetchedTrips = await getData();
      const matchingTrip = fetchedTrips.find(
        (trip) => trip._id === params.slug
      );
      if (matchingTrip) {
        setTrip(matchingTrip);
      } else {
        notFound();
      }
    })();
  }, [params.slug]);

  useEffect(() => {
    if (trip && trip.image && trip.image.data) {
      const img = new Image();
      img.onload = () => setIsImageLoaded(true);
      img.src = `data:${trip.image.contentType};base64,${trip.image.data}`;
    }
  }, [trip]);

  if (!trip) return null;

  const allDates = getAllDates(trip.startDate, trip.endDate);

  const handleDateClick = (date: string) => {
    setSelectedDate(date === selectedDate ? null : date);
  };

  const handleAddActivity = (newActivity: Omit<Activity, "id">) => {
    const activityWithId = {
      ...newActivity,
      id: uuidv4(),
      date: newActivity.date, // Ensure date is included
    };
    setActivities([...activities, activityWithId]);
  };

  const handleEditActivity = (editedActivity: Activity) => {
    setActivities(
      activities.map((activity) =>
        activity.id === editedActivity.id ? editedActivity : activity
      )
    );
  };

  const handleDeleteActivity = (activityId: string) => {
    setActivities(activities.filter((activity) => activity.id !== activityId));
  };
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
      formattedDate: new Date(activity.date).toLocaleDateString(),
      formattedStartTime: formatTime(activity.startTime),
      formattedEndTime: formatTime(activity.endTime),
      description: activity.description,
    }));

    console.log("Activities to be saved:", formattedActivities);

    try {
      const response = await fetch("http://localhost:3000/api/v2/hello", {
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
      <Box height="40vh" position="relative" overflow="hidden">
        {trip.image && trip.image.data && (
          <img
            src={`data:${trip.image.contentType};base64,${trip.image.data}`}
            alt="Trip"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              top: 0,
              left: 0,
            }}
          />
        )}
      </Box>
      <Container position="relative" maxWidth="container.xl" height="full">
        <TripHeader
          tripName={trip.tripName}
          startDate={trip.startDate}
          endDate={trip.endDate}
        />

        <VStack mt={40} spacing={4} align="stretch">
          {allDates.map((date) => (
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

        <Box mt={4} textAlign="right">
          <Button
            onClick={handleSaveAllActivities}
            colorScheme="green"
            size="lg"
            mb={5}
          >
            Save All Activities
          </Button>
        </Box>
      </Container>
    </VStack>
  );
}
