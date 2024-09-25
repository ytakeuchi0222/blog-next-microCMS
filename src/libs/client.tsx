// libs/client.js
import { createClient } from "microcms-js-sdk";
let API_KEY;
if (process.env.NEXT_PUBLIC_API_KEY) {
    API_KEY = process.env.NEXT_PUBLIC_API_KEY;
}
export const client = createClient({
    serviceDomain: "ytakeuchi",
    apiKey: API_KEY,
});
