"use client";

import { ChangeEvent } from "react";
import useSWR from "swr";
import { breeds } from "../requests/breeds";
import { FormControl, FormLabel, Select, Spinner } from "@chakra-ui/react";

export function BreedList({
  onChangeHandler,
}: {
  onChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
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
        onChange={onChangeHandler}
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
