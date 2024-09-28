import React from "react";

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

export function DogProfile({ dog }: { dog: Dog }) {
  const [liked, setLiked] = React.useState(false);

  function handleLike() {
    setLiked(!liked);
    if (liked) {
      // TODO: store liked ids for match
    }
  }

  return (
    <Card h="100%">
      <Image
        alt={dog.name}
        borderTopRadius="lg"
        objectFit="cover"
        h="60%"
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
              <ListItem>zip code: {dog.zip_code}</ListItem>
            </UnorderedList>
            <IconButton
              aria-label="like"
              icon={<LikeIcon liked={liked} />}
              onClick={handleLike}
            />
          </Flex>
        </Box>
      </CardBody>
    </Card>
  );
}
