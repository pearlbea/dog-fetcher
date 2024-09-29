import { useState } from "react";

import {
  Card,
  CardBody,
  Image,
  IconButton,
  Box,
  Flex,
  Heading,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { LikeIcon } from "./like-icon";
import type { Dog } from "../types/dog";

export function DogProfile({
  dog,
  handleLike,
}: {
  dog: Dog;
  handleLike?: ({ dogId, liked }: { dogId: string; liked: boolean }) => void;
}) {
  const [liked, setLiked] = useState(false);

  function handleDogLike() {
    setLiked(!liked);
    if (handleLike) handleLike({ dogId: dog.id, liked: !liked });
  }

  return (
    <Card h="100%">
      <Image
        alt={dog.name}
        borderTopRadius="lg"
        h="60%"
        loading="lazy"
        objectFit="cover"
        src={dog.img}
      />
      <CardBody>
        <Box>
          <Heading size="md" textAlign="center">
            {dog.name}
          </Heading>
          <Flex justify="space-between" align="center">
            <UnorderedList styleType="none" m="0">
              <ListItem>{dog.breed}</ListItem>
              <ListItem>age: {dog.age}</ListItem>
              <ListItem>zipcode: {dog.zip_code}</ListItem>
            </UnorderedList>
            <IconButton
              aria-label="like"
              icon={<LikeIcon liked={liked} />}
              onClick={handleDogLike}
              variant="ghost"
              colorScheme="pink"
            />
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
}
