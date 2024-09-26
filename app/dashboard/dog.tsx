import React from 'react';
import Image from 'next/image';
import { LikeButton } from './like-button';
import type { Dog } from '../types/dog';


export default function DogProfile({ dog }: { dog: Dog }) {

    return (
        <div className='border'>
            <div className="relative h-48">
                <Image src={dog.img} alt={dog.name} fill={true} className='object-cover' />
            </div>
            <div className="p-2 text-center">
                <h2 className=''>{dog.name}</h2>

                <div className='flex space-between'>
                    <ul className='text-left'>
                        <li>{dog.breed}</li>
                        <li>age: {dog.age}</li>
                        <li>zip code: {dog.zip_code}</li>
                    </ul>
                    <button className="border">
                        <LikeButton />
                    </button>
                </div>

            </div>
        </div>  
    );
}