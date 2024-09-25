import type { AppProps } from 'next/app';
import 'modern-css-reset/dist/reset.min.css';
import '@/styles/globals.scss';
import styles from '@/styles/Home.module.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Header></Header>
			<div className={styles.bg}>
				<Component {...pageProps} />
			</div>
			<Footer></Footer>
		</>
	);
}
