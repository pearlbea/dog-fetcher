"use client";

import { useState, ChangeEvent } from "react";
import useSWR from "swr";
import { getDogData, searchDogs, type QueryParams } from "../requests/dogs";
import { DogProfile } from "./dog";
import { BreedList } from "./breed-list";
import type { Dog } from "../types/dog";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Select,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function Dashboard() {
  const [likedDogs, setLikedDogs] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<QueryParams>({
    sort: "breed:asc",
  });
  const [sortBy, setSortBy] = useState("breed (asc)");

  const {
    data: searchResults,
    error: searchError,
    isLoading: isLoadingSearch,
  } = useSWR(["/dogs/search", searchParams], ([url, searchParams]) =>
    searchDogs(url, searchParams)
  );
  const dogIds = searchResults?.resultIds;

  const {
    data: dogs,
    error: dogError,
    isLoading: isLodingDogs,
  } = useSWR(["/dogs", dogIds], ([url, dogIds]) => getDogData(url, dogIds));

  function handleBreedChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedBreed = event.currentTarget.value;
    setSearchParams({ ...searchParams, breeds: [selectedBreed], from: "0" });
  }

  function handleLike({ dogId, liked }: { dogId: string; liked: boolean }) {
    if (liked) {
      setLikedDogs(() => [...likedDogs, dogId]);
    } else {
      const updatedLikes = likedDogs.filter((item) => item !== dogId);
      setLikedDogs(updatedLikes);
    }
  }

  function handleSort(event: ChangeEvent<HTMLSelectElement>) {
    const sortOrder = event.currentTarget.value;
    setSortBy(sortOrder);
    setSearchParams({ ...searchParams, sort: sortOrder, from: "0" });
  }

  function handleMatch() {
    // TODO: add matching
  }

  function handleNext() {
    if (searchResults.next) {
      const from = new URLSearchParams(searchResults.next).get("from");
      if (from && typeof from === "string") {
        setSearchParams({ ...searchParams, from: from });
      }
    }
  }

  function handlePrev() {
    if (searchResults.prev) {
      const from = new URLSearchParams(searchResults.prev).get("from");
      if (from && typeof from === "string") {
        setSearchParams({ ...searchParams, from: from });
      }
    }
  }

  if (searchError || dogError) {
    return (
      <div>
        {searchError?.status === 401 || dogError?.status === 401 ? (
          <Box p="8">
            <Heading>It looks like you're not logged in.</Heading>
            <Link as={NextLink} href="/">
              Login again
            </Link>
          </Box>
        ) : (
          <Box p="8">
            <Heading>Something went wrong. Sorry!</Heading>
            <Link as={NextLink} href="/">
              Return to Login page
            </Link>
          </Box>
        )}
      </div>
    );
  }

  if (isLoadingSearch || isLodingDogs) {
    return (
      <Container p="8">
        <Spinner />
      </Container>
    );
  }

  if (dogs && !dogs.length) {
    return (
      <div>
        <BreedList onChangeHandler={handleBreedChange} />
        <Box my="4">No results. Try a different search.</Box>
      </div>
    );
  }

  return (
    <div>
      <Flex>
        <BreedList onChangeHandler={handleBreedChange} />
        <Select
          placeholder={`Sort by: ${sortBy}`}
          onChange={handleSort}
          mx="2"
          w="300px"
        >
          <option value="breed:asc">breed (asc)</option>
          <option value="breed:desc">breed (desc)</option>
          <option value="age:asc">age (asc)</option>
          <option value="age:desc">age (desc)</option>
        </Select>
        <Button mx="2" onClick={handleMatch}>
          Find a match!
        </Button>
      </Flex>
      <SimpleGrid my="4" columns={{ sm: 2, md: 3, lg: 4, xl: 5 }} spacing={4}>
        {dogs?.map((dog: Dog) => (
          <Box h="100%" key={dog.id}>
            <DogProfile dog={dog} handleLike={handleLike} />
          </Box>
        ))}
      </SimpleGrid>
      <Center>
        {searchResults.prev ? (
          <Button onClick={handlePrev} m="2">
            Prev
          </Button>
        ) : (
          ""
        )}
        {searchResults.next ? (
          <Button onClick={handleNext} m="2">
            Next
          </Button>
        ) : (
          ""
        )}
      </Center>
    </div>
  );
}
