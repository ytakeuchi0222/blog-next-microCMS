// libs/client.js
import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "ytakeuchi",
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
});
