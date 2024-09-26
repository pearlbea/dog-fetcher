import React, { MouseEventHandler } from 'react';
import Image from 'next/image';
import { LikeIcon } from './like-icon';
import type { Dog } from '../types/dog';


export default function DogProfile({ dog }: { dog: Dog }) {

    const [ liked, setLiked ] = React.useState(false);
   
    function handleLike() {
        setLiked(!liked);
        if (liked) {
            // TODO: store liked ids for match
        }
    }

    return (
        <div className='border'>
            <div className="relative h-48">
                <Image src={dog.img} alt={dog.name} fill={true} className='object-cover' />
            </div>
            <div className="p-2 text-center">
                <h2 className='text-lg font-semibold'>{dog.name}</h2>
                <div className='flex justify-between px-2'>
                    <ul className='text-left'>
                        <li>{dog.breed}</li>
                        <li>age: {dog.age}</li>
                        <li>zip code: {dog.zip_code}</li>
                    </ul>
                        <button onClick={handleLike}>
                            <LikeIcon liked={liked} />
                        </button>
                </div>
            </div>
        </div>  
    );
}