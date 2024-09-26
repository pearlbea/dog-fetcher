import { BASE_URL } from "./constants";

async function search() {
    const endpoint = `${BASE_URL}/dogs/search?sort=breed:asc`;
    const response = await fetch(endpoint, {
        credentials: 'include',
    });
    const json = await response.json();
    return json;
}

export async function getDogs() {

    const dogSearch = await search();

    console.log(dogSearch.resultIds);

    const endpoint = `${BASE_URL}/dogs`;

    const response = await fetch(endpoint, {
        headers: {
            "Content-Type": "application/json"
        },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(dogSearch.resultIds)
    });
    const json = response.json();
    return json;
} 