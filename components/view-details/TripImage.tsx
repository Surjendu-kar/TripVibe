import { Box } from "@chakra-ui/react";

interface TripImageProps {
  image?: {
    data: string;
    contentType: string;
  };
}

export const TripImage: React.FC<TripImageProps> = ({ image }) => (
  <Box height="40vh" position="relative" overflow="hidden">
    {image && image.data && (
      <img
        src={`data:${image.contentType};base64,${image.data}`}
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
);