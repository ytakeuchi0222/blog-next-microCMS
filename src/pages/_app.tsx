import type { AppProps } from 'next/app';
import 'modern-css-reset/dist/reset.min.css';
import '@/styles/globals.scss';
import styles from '@/styles/Home.module.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useSearch } from '@/hooks/useSearch';
export default function App({ Component, pageProps }: AppProps) {
	const [keyword, setKeyword, { search }] = useSearch();
	return (
		<>
			<Header></Header>
			{/* 検索エリア */}
			<div className="searchArea">
				<input value={keyword} placeholder="キーワードを入力" onChange={(e) => setKeyword(e.target.value)} />
				{/* <input value={keyword} placeholder="キーワードを入力" onChange={(e) => keywordSearch(e.target.value)} /> */}
				<button onClick={search} style={{ marginLeft: '4px' }}>
					検索
				</button>
			</div>
			<div className={styles.bg}>
				<Component {...pageProps} />
			</div>
			<Footer></Footer>
		</>
	);
}
