import type { AppProps } from 'next/app';
import 'modern-css-reset/dist/reset.min.css';
import '@/styles/globals.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

import { client } from '@/libs/client';

export default function App({ Component, pageProps }: AppProps) {
	// console.log(pageProps.category);
	// console.log('------pagepRops');
	return (
		<>
			<div className="wrapper">
				<Header category={pageProps.category} />
				<Component {...pageProps} />
				<Footer />
			</div>
		</>
	);
}
export const getStaticProps = async () => {
	const categoryData = await client.get({ endpoint: 'categories' });

	return {
		props: {
			category: categoryData.contents,
		},
	};
};
