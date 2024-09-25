import { client } from '@/libs/client';
import styles from '@/styles/Home.module.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleList } from '@/components/ArticleList';
import { Pagination } from '@/components/Pagination';
import { CategoryList } from '@/components/CategoryList';
const Home = ({ blog, totalCount, category }) => {
	return (
		<>
			<Header />
			<div className={styles.bg}>
				<main className={styles.main}>
					<ArticleList blog={blog}></ArticleList>
				</main>
				<CategoryList category={category} />
				<Pagination totalCount={totalCount} />
			</div>
			<Footer />
		</>
	);
};
export default Home;
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
	const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
	const PER_PAGE = Number(PER_PAGE_STRING);

	const data = await client.get({ endpoint: 'blogs', queries: { offset: 0, limit: PER_PAGE } });
	// カテゴリーコンテンツの取得
	const categoryData = await client.get({ endpoint: 'categories' });
	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
			category: categoryData.contents,
		},
	};
};
