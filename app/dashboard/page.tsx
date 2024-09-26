'use client';

import React from 'react';
import useSWR from 'swr';
import { getDogs } from '../requests/dogs';
import  DogProfile from './dog';
import type { Dog } from '../types/dog';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR('GET_DOGS', getDogs);
    
    const [ likedDogs, setLikedDogs ] = React.useState([]);

    if (error) {
       return router.push('/')
    }

    if (isLoading) {
        return <div>Is Loading</div>
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-4 pt-8">
                {data.map((dog: Dog) => (
                    <DogProfile dog={dog} key={dog.id} />
                ))}
            </div>
            <button>More!</button>
        </div>
        
    )
}