import { BASE_URL } from "./constants";

interface LoginResponse {
  ok: boolean;
  status: number;
}

export async function login({
  name,
  email,
}: {
  name: string;
  email: string;
}): Promise<LoginResponse> {
  const endpoint = `${BASE_URL}/auth/login`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
        email: email,
      }),
      credentials: "include",
      mode: "cors",
    });
    return response;
  } catch (err) {
    throw err;
  }
}
