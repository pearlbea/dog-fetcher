import { BASE_URL } from "./constants";
import { QueryParams } from "../types/query-params";

export async function searchDogs(_url: string, searchParams: QueryParams) {
  const search = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    search.append(key, value);
  }

  const endpoint = `${BASE_URL}/dogs/search?${search.toString()}`;
  try {
    const response = await fetch(endpoint, {
      credentials: "include",
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw response;
  } catch (err) {
    throw err;
  }
}

export async function getDogData({
  dogIds,
}: {
  url?: string;
  dogIds: string[];
}) {
  const endpoint = `${BASE_URL}/dogs`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(dogIds),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw response;
  } catch (err) {
    throw err;
  }
}

export async function findAMatch(likedDogIds: string[]) {
  const endpoint = `${BASE_URL}/dogs/match`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(likedDogIds),
    });

    if (response.ok) {
      const json = await response.json();
      return json;
    }
    throw response;
  } catch (err) {
    throw err;
  }
}
