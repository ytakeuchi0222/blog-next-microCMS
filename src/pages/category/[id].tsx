'use client';
import { client } from '@/libs/client';
import { PaginationCategory } from '@/components/PaginationCategory';
import { ArticleList } from '@/components/ArticleList';
import styles from '@/styles/Home.module.scss';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Categorytitle } from '@/components/CategoryTitle';
const CategoryId = ({ blog, totalCount, category }) => {
	const [categoryName, setCategoryName] = useState('');
	const params = useParams();
	const param = params && params.id;
	useEffect(() => {
		for (const i of category) {
			if (i.id == param) {
				setCategoryName(i.name);
			}
		}
	}, [params]);
	return (
		<>
			<div className={styles.mainArea}>
				<Categorytitle type="― CATEGORY ―" keyword={categoryName} totalCount={totalCount} />
				<main className={styles.main}>
					<ArticleList blog={blog}></ArticleList>
				</main>
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
	console.log(id);
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
