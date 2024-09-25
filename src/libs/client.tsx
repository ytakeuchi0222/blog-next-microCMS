// libs/client.js
import { createClient } from 'microcms-js-sdk';
const API_KEY: string = process.env.API_KEY ? process.env.API_KEY : '';
export const client = createClient({
	serviceDomain: 'ytakeuchi',
	apiKey: API_KEY,
});
