'use client';
import { client } from '@/libs/client';
import { PaginationCategory } from '@/components/PaginationCategory';
import { ArticleList } from '@/components/ArticleList';
import styles from '@/styles/Home.module.scss';
import { CategoryList } from '@/components/CategoryList';
const CategoryId = ({ blog, totalCount, category }) => {
	//const { blog, totalCount, category } = props;
	// カテゴリーに紐付いたコンテンツがない場合に表示
	if (blog.length === 0) {
		return (
			<>
				<div>ブログコンテンツがありません</div>
			</>
		);
	}
	return (
		<>
			<div className={styles.mainArea}>
				<main className={styles.main}>
					で検索した結果：{totalCount} 件{/* {q} */}
					<ArticleList blog={blog}></ArticleList>
				</main>
				<div className={styles.sideBar}>
					<CategoryList category={category} />
				</div>
			</div>
			<PaginationCategory totalCount={totalCount} />
		</>
	);
};
export default CategoryId;
// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'categories' });

	const paths = data.contents.map((content) => `/category/${content.id}`);
	return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
	const id = context.params.id;
	const data = await client.get({ endpoint: 'blogs', queries: { filters: `category[equals]${id}` } });
	const categoryData = await client.get({ endpoint: 'categories' });
	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
			category: categoryData.contents,
		},
	};
};
