import { client } from '@/libs/client';
import styles from '@/styles/Home.module.scss';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ArticleList } from '@/components/ArticleList';
import { Pagination } from '../components/Pagination';
const Home = ({ blog, totalCount }) => {
	return (
		<>
			<Header></Header>
			<div className={styles.bg}>
				<main className={styles.main}>
					<ArticleList blog={blog}></ArticleList>
				</main>
				<Pagination totalCount={totalCount} />
			</div>
			<Footer></Footer>
		</>
	);
};
export default Home;
// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async () => {
	const PER_PAGE: string = process.env.NEXT_PUBLIC_PER_PAGE
		? process.env.NEXT_PUBLIC_PER_PAGE
		: '';
	const data = await client.get({ endpoint: 'blogs', queries: { offset: 0, limit: PER_PAGE } });
	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
		},
	};
};
