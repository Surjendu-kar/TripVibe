"use client";
import { useState } from "react";
import { Box, Button } from "@chakra-ui/react";
import dynamic from "next/dynamic";

const AddNewTrip = dynamic(() => import("../add-new-trip/AddNewTrip"), {
  ssr: false,
});

function AddTripBtn() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState<ImageData | null>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  const clearForm = () => {
    setTripName("");
    setDestination("");
    setStartDate("");
    setEndDate("");
    setImage(null);
  };

  return (
    <Box style={{ display: "flex", justifyContent: "center" }}>
      <Button onClick={onOpen} type="button">
        Add a Trip
      </Button>
      {isOpen && (
        <AddNewTrip
          isOpen={isOpen}
          onClose={onClose}
          tripName={tripName}
          setTripName={setTripName}
          destination={destination}
          setDestination={setDestination}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
          image={image}
          setImage={setImage}
          clearForm={clearForm}
        />
      )}
    </Box>
  );
}

export default AddTripBtn;
