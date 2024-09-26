const BASE_URL = "https://frontend-take-home-service.fetch.com";

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

        return await response.json();
    } catch (err) {
        return err;
    }
}