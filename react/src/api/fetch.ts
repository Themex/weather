export function api<T>(url: string, params: Record<string, any> = {}): Promise<T | undefined> {
    let uri = new URL(`http://localhost:8008${url}`);
    uri.search = new URLSearchParams(params).toString();

    return fetch(uri.toString())
        .then(async res => {
            if (!res.ok) {
                alert("Server Error");
                return;
            }
            const data: T = await res.json();
            return data;
        }).catch((error: Error) => {
            alert("Client Error:" + error.message);
            throw error;
        });
}