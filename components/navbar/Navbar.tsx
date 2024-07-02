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

function Navbar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);
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
    setImage(null);
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
            image={image}
            setImage={setImage}
            clearForm={clearForm}
          />
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default Navbar;
