import { client } from '@/libs/client';
import { ArticleList } from '@/components/ArticleList';
import styles from '@/styles/Home.module.scss';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PaginationSearch } from '@/components/PaginationSearch';
import { Categorytitle } from '@/components/CategoryTitle';

const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
const PER_PAGE = Number(PER_PAGE_STRING);

export default function SearchId({ blog, totalCount, keyword }) {
	//ローディング画面
	const [loading, setLoading] = useState(false);
	const Router = useRouter();
	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true);
		const handleRouteChangeComplete = () => setLoading(false);

		Router.events.on('routeChangeStart', handleRouteChangeStart);
		Router.events.on('routeChangeComplete', handleRouteChangeComplete);
		Router.events.on('routeChangeError', handleRouteChangeComplete);

		return () => {
			Router.events.off('routeChangeStart', handleRouteChangeStart);
			Router.events.off('routeChangeComplete', handleRouteChangeComplete);
			Router.events.off('routeChangeError', handleRouteChangeComplete);
		};
	}, []);

	if (loading) {
		return <div className="loading">Loading...</div>;
	}

	return (
		<>
			<div className={styles.mainArea}>
				<Categorytitle type="― SEARCH WORD ―" keyword={keyword} totalCount={totalCount} />
				<main className={styles.main}>
					<ArticleList blog={blog}></ArticleList>
				</main>
			</div>
			<PaginationSearch totalCount={totalCount} keyword={keyword} />
		</>
	);
}

export const getServerSideProps = async (context) => {
	const keyword = context.query.q;
	const page = context.query.page;
	const data = await client.get({
		endpoint: 'blogs',
		queries: { q: keyword, offset: (page - 1) * PER_PAGE, limit: PER_PAGE },
	});
	const categoryData = await client.get({ endpoint: 'categories' });
	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
			keyword: keyword,
			category: categoryData.contents,
		},
	};
};
