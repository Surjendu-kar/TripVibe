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
  activities?: Activity[];
}

interface Activity {
  _id: string;
  formattedDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  description: string;
}
