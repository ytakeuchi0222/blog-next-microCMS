import { client } from '@/libs/client';
import styles from '@/styles/Home.module.scss';
import { ArticleList } from '@/components/ArticleList';
import { Pagination } from '@/components/Pagination';

const Home = ({ blog, totalCount }) => {
	return (
		<>
			<div className={styles.mainArea}>
				<main className={styles.main}>
					{/* 検索結果 */}
					<ArticleList blog={blog}></ArticleList>
				</main>
			</div>
			<Pagination totalCount={totalCount} />
		</>
	);
};
export default Home;

// 環境変数の取得と変換
const getPerPage = (): number => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	return Number(PER_PAGE_STRING);
};

// データ取得ロジック
const fetchData = async (endpoint: string, queries: object) => {
	return await client.get({ endpoint, queries });
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
	const PER_PAGE = getPerPage();

	const data = await fetchData('blogs', { offset: 0, limit: PER_PAGE });
	// カテゴリーコンテンツの取得
	const categoryData = await fetchData('categories', {});

	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
			category: categoryData.contents,
		},
	};
};
