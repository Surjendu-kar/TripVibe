"use client";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import AddNewTrip from "../add-new-trip/AddNewTrip";
import DisplayTripData from "../display-trip-data/DisplayTripData";

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  const clearForm = () => {
    setTripName("");
    setDestination("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <Tabs size="md" variant="enclosed">
      <TabList>
        <Tab>Upcoming Trips</Tab>
        <Tab>Past Trips</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Button onClick={onOpen} type="button">
            Add a Trip
          </Button>
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
            clearForm={clearForm}
          />
          <Box mt={3}>
            <DisplayTripData />
          </Box>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Navbar;