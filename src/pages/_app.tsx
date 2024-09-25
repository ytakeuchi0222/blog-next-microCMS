import type { AppProps } from "next/app";
import "modern-css-reset/dist/reset.min.css";
import "@/styles/globals.scss";
export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
