import { BASE_URL } from "./constants";

export async function login({ name, email } : { name: string, email: string }) {
    const endpoint = `${BASE_URL}/auth/login`;

    try {
        const response = await fetch(endpoint, {
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            body: JSON.stringify({
                "name": name,
                "email": email
            }),
            credentials: 'include',
            mode: 'cors',
        });
        return response;
    } catch (err) {
        return err;
    }
}