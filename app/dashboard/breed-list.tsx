"use client";

import useSWR from "swr";
import { breeds } from "../requests/breeds";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";

export function BreedList({
  onChange,
}: {
  onChange: (value: string[]) => void;
}) {
  const { data, error, isLoading } = useSWR("BREEDS", breeds);

  function handleChange(value: string[]) {
    onChange(value);
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>is Loading</div>;
  }

  return (
    <Popover placement="bottom-start">
      <PopoverTrigger>
        <Button>Filter by breed</Button>
      </PopoverTrigger>
      <PopoverContent maxH="64" overflow="scroll">
        <CheckboxGroup colorScheme="pink" onChange={handleChange}>
          {data.map((breed: string) => (
            <Checkbox
              _active={{ backgroundColor: "pink.100", color: "gray.900" }}
              _focus={{ backgroundColor: "pink.100", color: "gray.900" }}
              _hover={{ backgroundColor: "pink.100", color: "gray.900" }}
              key={breed}
              name={breed}
              px="4"
              py="2"
              role="option"
              value={breed}
            >
              {breed}
            </Checkbox>
          ))}
        </CheckboxGroup>
      </PopoverContent>
    </Popover>
  );
}
