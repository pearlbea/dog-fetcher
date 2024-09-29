"use client";

import useSWR from "swr";
import { breeds } from "../requests/breeds";
import { FormControl, FormLabel, Select, Spinner } from "@chakra-ui/react";

export function BreedList({
  currentBreed,
  onChangeHandler,
}: {
  currentBreed: string;
  onChangeHandler: (selectedBreed: string) => void;
}) {
  const { data, error, isLoading } = useSWR("BREEDS", breeds);

  if (error) {
    return <div>Error!</div>;
  }

  if (isLoading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <FormControl maxW="300px">
      <FormLabel fontSize={{ base: "small", sm: "medium" }}>
        Filter by breed
      </FormLabel>
      <Select
        fontSize={{ base: "small", sm: "medium" }}
        onChange={(e) => onChangeHandler(e.currentTarget.value)}
        value={currentBreed}
      >
        {data.map((breed: string) => (
          <option key={breed} value={breed}>
            {breed}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}
