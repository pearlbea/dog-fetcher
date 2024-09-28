import { BASE_URL } from "./constants";
import type { Dog } from "../types/dog";

export interface QueryParams {
    breeds?: string[];
    zipCodes?: string[];
    ageMin?: number;
    ageMax?: number;
    sort?: string;
}

export async function searchDogs(url:string, searchParams: QueryParams) {
    const search = new URLSearchParams();

    for (const [key, value] of Object.entries(searchParams)) {
        search.append(key, value);
      }
    
    const endpoint = `${BASE_URL}/dogs/search?${search.toString()}`;
    try {
        const response = await fetch(endpoint, {
            credentials: 'include',
        });

        if(response.ok) {
            const json = await response.json();
            return json;
        }

        throw response;

    } catch (err) {
        throw err;
    }
}

export async function getDogData(url: string, dogIds: string[]) {
    const endpoint = `${BASE_URL}/dogs`;

    try {
    const response = await fetch(endpoint, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dogIds)
    });

    if(response.ok) {
        const json = await response.json();
        return json;
    }
    throw response;

} catch (err) {

    throw err;
    }
}

