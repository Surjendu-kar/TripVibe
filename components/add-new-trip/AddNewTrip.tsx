"use client";
import { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import ImagePicker from "../img-picker/ImagePicker";

interface ImageData {
  data: string;
  contentType: string;
}

interface AddNewTripProps {
  isOpen: boolean;
  onClose: () => void;
  tripName: string;
  setTripName: (value: string) => void;
  destination: string;
  setDestination: (value: string) => void;
  startDate: string;
  setStartDate: (value: string) => void;
  endDate: string;
  setEndDate: (value: string) => void;
  image: ImageData | null;
  setImage: React.Dispatch<React.SetStateAction<ImageData | null>>;
  clearForm: () => void;
}

function AddNewTrip({
  isOpen,
  onClose,
  tripName,
  setTripName,
  destination,
  setDestination,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  clearForm,
  image,
  setImage,
}: AddNewTripProps) {
  const [minDate, setMinDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    setMinDate(formattedDate);
  }, [isOpen]);

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
    if (endDate && e.target.value > endDate) {
      setEndDate(e.target.value);
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value >= startDate) {
      setEndDate(e.target.value);
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      tripName,
      destination,
      startDate,
      endDate,
      image: image
        ? {
            data: image.data,
            contentType: image.contentType,
          }
        : null,
    };

    try {
      const response = await fetch("http://localhost:3000/api/v2/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result?.success) {
        toast({
          title: "Trip added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        clearForm();
        onClose();
      } else {
        throw new Error("Failed to add trip");
      }
    } catch (error) {
      toast({
        title: "Error adding trip",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const InputStyle = {
    transition: "all 0.3s ease-in-out",
    _focus: {
      transform: "scale(1.02)",
      boxShadow: "0 0 0 3px rgba(66, 153, 225, 0.6)",
    },
    _hover: {
      backgroundColor: "blue.50",
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader sx={{ textAlign: "center" }}>Plan a new trip</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <ImagePicker
              onImageChange={(newImage: ImageData | null) => setImage(newImage)}
            />
            <FormControl>
              <FormLabel>Trip Name</FormLabel>
              <Input
                placeholder="Trip name"
                value={tripName}
                onChange={(e) => setTripName(e.target.value)}
                sx={InputStyle}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Destination</FormLabel>
              <Input
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                sx={InputStyle}
              />
            </FormControl>
            <Flex gap={4}>
              <FormControl flex={1}>
                <FormLabel>Start Date</FormLabel>
                <Box position="relative">
                  <Input
                    placeholder="Select Start Date"
                    size="md"
                    type="date"
                    value={startDate}
                    min={minDate}
                    onChange={handleStartDateChange}
                    sx={InputStyle}
                  />
                </Box>
              </FormControl>
              <FormControl flex={1}>
                <FormLabel>End Date</FormLabel>
                <Box position="relative">
                  <Input
                    placeholder="Select End Date"
                    size="md"
                    type="date"
                    value={endDate}
                    min={startDate || minDate}
                    onChange={handleEndDateChange}
                    sx={InputStyle}
                  />
                </Box>
              </FormControl>
            </Flex>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={isLoading}
            loadingText="Saving"
          >
            Save
          </Button>
          <Button onClick={onClose} isDisabled={isLoading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddNewTrip;
