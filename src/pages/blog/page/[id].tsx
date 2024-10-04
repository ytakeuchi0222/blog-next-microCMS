import { client } from '@/libs/client';
import { Pagination } from '@/components/Pagination';
import styles from '@/styles/Home.module.scss';
import { ArticleList } from '@/components/ArticleList';
const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
const PER_PAGE = Number(PER_PAGE_STRING);

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
	return (
		<>
			<div className={styles.mainArea}>
				<main className={styles.main}>
					<ArticleList blog={blog}></ArticleList>
				</main>
			</div>
			<Pagination totalCount={totalCount} />
		</>
	);
}

// 動的なページを作成
export const getStaticPaths = async () => {
	const repos = await client.get({ endpoint: 'blogs' });
	const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
	const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map((repo) => `/blog/page/${repo}`);
	return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
	const id = context.params.id;

	const data = await client.get({
		endpoint: 'blogs',
		queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE },
	});
	const categoryData = await client.get({ endpoint: 'categories' });
	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
			category: categoryData.contents,
		},
	};
};
