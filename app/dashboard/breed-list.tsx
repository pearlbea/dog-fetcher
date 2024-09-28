"use client";

import { ChangeEvent, ChangeEventHandler } from "react";
import useSWR from "swr";
import { breeds } from "../requests/breeds";
import { Select, Spinner } from "@chakra-ui/react";

export function BreedList({
  onChangeHandler,
}: {
  onChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
}) {
  const { data, error, isLoading } = useSWR("BREEDS", breeds);

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>is Loading</div>;
  }

  return (
    <Select placeholder="Filter by breed" w="300px" onChange={onChangeHandler}>
      {data.map((breed: string) => (
        <option key={breed} value={breed}>
          {breed}
        </option>
      ))}
    </Select>
  );
}
