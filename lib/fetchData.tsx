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
  formattedDate: string;
  formattedStartTime: string;
  formattedEndTime: string;
  description: string;
}

const getData = async (): Promise<Trip[]> => {
  try {
    let response = await fetch("http://localhost:3000/api/v2/hello");
    let data = await response.json();
    if (data?.success) {
      return data.result as Trip[];
    } else {
      throw new Error("Failed to fetch data");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export default getData;
