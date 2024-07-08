// @ts-nocheck

"use client";
import {
  AspectRatio,
  Box,
  BoxProps,
  Container,
  forwardRef,
  Heading,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useState, useCallback, useEffect } from "react";
import { FaCamera } from "react-icons/fa";

interface ImagePickerProps {
  onImageChange: (image: ImageData | null) => void;
}

const first = {
  rest: {
    rotate: "-15deg",
    scale: 0.95,
    x: "-50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "-70%",
    scale: 1.1,
    rotate: "-20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const second = {
  rest: {
    rotate: "15deg",
    scale: 0.95,
    x: "50%",
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    x: "70%",
    scale: 1.1,
    rotate: "20deg",
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const third = {
  rest: {
    scale: 1.1,
    filter: "grayscale(80%)",
    transition: {
      duration: 0.5,
      type: "tween",
      ease: "easeIn",
    },
  },
  hover: {
    scale: 1.3,
    filter: "grayscale(0%)",
    transition: {
      duration: 0.4,
      type: "tween",
      ease: "easeOut",
    },
  },
};

const PreviewImage = forwardRef<BoxProps, typeof Box>((props, ref) => {
  return (
    <Box
      bg="white"
      top="0"
      height="100%"
      width="100%"
      position="absolute"
      borderWidth="1px"
      borderStyle="solid"
      rounded="sm"
      borderColor="gray.400"
      as={motion.div}
      backgroundSize="cover"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      {...props}
      ref={ref}
    />
  );
});

export default function ImagePicker({ onImageChange }: ImagePickerProps) {
  const controls = useAnimation();
  const startAnimation = () => controls.start("hover");
  const stopAnimation = () => controls.stop();
  const [image, setImage] = useState<ImageData | null>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files[0];
      if (file && file.type.substr(0, 5) === "image") {
        const reader = new FileReader();
        reader.onloadend = () => {
          const newImage = { data: reader.result, contentType: file.type };
          setImage(newImage);
          onImageChange(newImage);
        };
        reader.readAsDataURL(file);
      }
    },
    [onImageChange]
  );

  useEffect(() => {
    console.log(image);
  }, [image]);

  return (
    <Container display={"flex"} justifyContent={"center"}>
      <AspectRatio width="60" ratio={1}>
        <Box
          borderColor={image ? "transparent" : "gray.300"}
          borderStyle={image ? "solid" : "dashed"}
          borderWidth={image ? "0" : "2px"}
          rounded="md"
          shadow={image ? "none" : "sm"}
          role="group"
          transition="all 150ms ease-in-out"
          _hover={{
            shadow: image ? "none" : "md",
          }}
          as={motion.div}
          initial="rest"
          animate="rest"
          whileHover="hover"
        >
          <Box position="relative" height="100%" width="100%">
            {image ? (
              <Box position="relative" width="100%" height="100%">
                <Image
                  src={image.data as string}
                  alt="Selected image"
                  fill
                  style={{ objectFit: "cover", borderRadius: "0.375rem" }}
                />
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  width="100%"
                  bg="blackAlpha.600"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  py={2}
                  rounded="md"
                >
                  <Icon as={FaCamera} w={6} h={6} color="white" mb={1} />
                  <Text color="white" fontSize="sm" fontWeight="bold">
                    Click to change image
                  </Text>
                </Box>
              </Box>
            ) : (
              <Box
                position="absolute"
                top="0"
                left="0"
                height="100%"
                width="100%"
                display="flex"
                flexDirection="column"
              >
                <Stack
                  height="100%"
                  width="100%"
                  display="flex"
                  alignItems="center"
                  justify="center"
                  spacing="4"
                >
                  <Box height="16" width="12" position="relative">
                    <PreviewImage
                      variants={first}
                      backgroundImage="url('/pickerImg/istockphoto-535168027-170667a.webp')"
                    />
                    <PreviewImage
                      variants={second}
                      backgroundImage="url('/pickerImg/pexels-lukas-lussi-930564355-21283183.jpg')"
                    />
                    <PreviewImage
                      variants={third}
                      backgroundImage="url('/pickerImg/109283197-big-group-happy-friends-mountains-travel.jpg')"
                    />
                  </Box>
                  <Stack p="8" textAlign="center" spacing="1">
                    <Heading fontSize="lg" color="gray.700" fontWeight="bold">
                      Drop image here
                    </Heading>
                    <Text fontWeight="light">or click to upload</Text>
                  </Stack>
                </Stack>
              </Box>
            )}
            <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onDragEnter={startAnimation}
              onDragLeave={stopAnimation}
              onChange={handleFileChange}
            />
          </Box>
        </Box>
      </AspectRatio>
    </Container>
  );
}
