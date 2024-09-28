import { BASE_URL } from "./constants";

export async function breeds() {
  const endpoint = `${BASE_URL}/dogs/breeds`;

  try {
    const response = await fetch(endpoint, {
      credentials: "include",
    });
    const json = await response.json();
    return json;
  } catch (err) {
    throw err;
  }
}
