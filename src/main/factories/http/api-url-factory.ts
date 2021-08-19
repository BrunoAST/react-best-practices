export function makeApiUrl(path: string): string {
    return `${process.env.API_URL}${path}`;
}
