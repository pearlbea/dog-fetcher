'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { getDogData, searchDogs, type QueryParams } from '../requests/dogs';
import  { DogProfile } from './dog';
import { BreedList } from './breed-list'
import type { Dog } from '../types/dog';
import { Button, Container, Heading, SimpleGrid, Box, Spinner } from '@chakra-ui/react';
import NextLink from 'next/link'
import { Link } from '@chakra-ui/react'

export default function Dashboard() {

    // TODO: Handle likes
    const [ likedDogs, setLikedDogs ] = useState([]);
    const [ searchParams, setSearchParams ] = useState<QueryParams>({ sort: 'breed:asc' });

    const { data: searchResults, error: searchError, isLoading: isLoadingSearch } = useSWR(['/dogs/search', searchParams], ([url, searchParams]) => searchDogs(url, searchParams));
    const dogIds = searchResults?.resultIds;
    const { data: dogs, error: dogError, isLoading: isLodingDogs } = useSWR(['/dogs', dogIds], ([url, dogIds]) => getDogData(url, dogIds));
 
    function handleBreedChange( value: string[]) {
        const breedList = searchParams.breeds ? [...searchParams.breeds, ...value] : value;
        setSearchParams({ ...searchParams, breeds: breedList });
    }

    function handleNext() {
        // TODO: handle next
    }

    if (searchError || dogError) {
        return <div>
            {searchError?.status === 401 || dogError?.status === 401 ? (
                <Box p="8">
                    <Heading>It looks like you're not logged in.</Heading>
                    ;<Link as={NextLink} href='/'>
            Login again
            </Link>
                </Box>
            ) : "Error"}
        </div>
    }

    if (isLoadingSearch || isLodingDogs) {
        return <Container p="8"><Spinner /></Container>;
    }

    if (dogs && !dogs.length) {
        return (
            <div>
                <BreedList onChange={handleBreedChange}/>
                <Box my="4">No results. Try a different search.</Box>
            </div>
        )
    }

    return(
        <div>
            <BreedList onChange={handleBreedChange}/>
            <SimpleGrid my="4" columns={{ sm: 2, md: 3, lg: 4, xl: 5}} spacing={4}>
                {dogs?.map((dog: Dog) => (
                    <Box h="100%">
                        <DogProfile dog={dog} key={dog.id} />
                    </Box>
                ))}
            </SimpleGrid>
            <Button onClick={handleNext}>Next</Button>
        </div>
    )
}