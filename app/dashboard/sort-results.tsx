import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export function SortResults({
  handleSort,
}: {
  handleSort: (sortOrder: string) => void;
}) {
  return (
    <FormControl mx="2" maxW="300px">
      <FormLabel fontSize={{ base: "small", sm: "medium" }}>
        Sort results
      </FormLabel>
      <Select
        fontSize={{ base: "small", sm: "medium" }}
        onChange={(e) => handleSort(e.currentTarget.value)}
      >
        <option value="breed:asc">breed (asc)</option>
        <option value="breed:desc">breed (desc)</option>
        <option value="age:asc">age (asc)</option>
        <option value="age:desc">age (desc)</option>
      </Select>
    </FormControl>
  );
}
