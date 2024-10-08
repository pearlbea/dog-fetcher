"use client";

import { useState } from "react";
import useSWR from "swr";
import { getDogData, searchDogs, findAMatch } from "../requests/dogs";
import { QueryParams } from "../types/query-params";
import type { Dog } from "../types/dog";
import { DogProfile } from "./dog";
import { BreedList } from "./breed-list";
import { SortResults } from "./sort-results";
import { MatchModal } from "./match-modal";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import { Link } from "@chakra-ui/react";

export default function Dashboard() {
  const [likedDogs, setLikedDogs] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useState<QueryParams>({
    sort: "breed:asc",
  });
  const [currentBreed, setCurrentBreed] = useState("");
  const [sortBy, setSortBy] = useState("breed (asc)");
  const [match, setMatch] = useState(null);
  const [matchError, setMatchError] = useState(false);

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
  } = useSWR(["/dogs", dogIds], ([url, dogIds]) => getDogData({ url, dogIds }));

  function handleBreedChange(selectedBreed: string) {
    setCurrentBreed(selectedBreed);
    setSearchParams({ ...searchParams, breeds: [selectedBreed], from: "0" });
  }

  function handleLike({ dogId, liked }: { dogId: string; liked: boolean }) {
    if (liked) {
      setMatchError(false);
      setLikedDogs(() => [...likedDogs, dogId]);
    } else {
      const updatedLikes = likedDogs.filter((item) => item !== dogId);
      setLikedDogs(updatedLikes);
    }
  }

  function handleSort(newSortOrder: string) {
    setSortBy(newSortOrder);
    setSearchParams({ ...searchParams, sort: newSortOrder, from: "0" });
  }

  async function handleMatch() {
    setMatchError(false);
    if (!likedDogs.length || likedDogs.length > 100) {
      return setMatchError(true);
    }
    const matchId = await findAMatch(likedDogs);
    const response = await getDogData({ dogIds: [matchId.match] });
    setMatch(response[0]);
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
            <Heading>It looks like you&rsquo;re not logged in.</Heading>
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
        <BreedList
          onChangeHandler={handleBreedChange}
          currentBreed={currentBreed}
        />
        <Box my="4">No results. Try a different search.</Box>
      </div>
    );
  }

  return (
    <>
      <Flex alignItems="flex-end">
        <BreedList
          onChangeHandler={handleBreedChange}
          currentBreed={currentBreed}
        />
        <SortResults handleSort={handleSort} sortBy={sortBy} />
        <Button mx="2" onClick={handleMatch} minW="120px">
          <Text fontSize={{ sm: "sm", md: "md" }}>Find a match!</Text>
        </Button>
      </Flex>
      {matchError ? (
        <Text p="2" align="right">
          <WarningIcon w={8} h={8} color="red.500" pr="2" />
          Please favorite at least one (but no more than 100) dogs to get a
          match.
        </Text>
      ) : null}
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

      {match ? (
        <MatchModal dog={match} onModalClose={() => setMatch(null)} />
      ) : null}
    </>
  );
}
