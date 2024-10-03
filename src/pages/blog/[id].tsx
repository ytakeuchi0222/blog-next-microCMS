import { client } from '@/libs/client';
import React from 'react';
import styles from '@/styles/Home.module.scss';
import { ArticleDetail } from '@/components/ArticleDetail';
//ハイライトのテーマ
import 'highlight.js/styles/hybrid.css';
import { hightLight } from '@/libs/hightLight';
// import "highlight.js/styles/vs2015.css";
type PropsBlogId = {
	blog: { title: string; publishedAt: string; content: string };
};
const BlogId: React.FC<PropsBlogId> = ({ blog }) => {
	return (
		<>
			<main className={styles.main}>
				<ArticleDetail blog={blog}></ArticleDetail>
			</main>
		</>
	);
};
export default BlogId;
// 静的生成のためのパスを指定します
export const getStaticPaths = async () => {
	const data = await client.get({ endpoint: 'blogs' });

	const paths = data.contents.map((content: { id: string }) => `/blog/${content.id}`);
	return { paths, fallback: false };
};

// データをテンプレートに受け渡す部分の処理を記述します
export const getStaticProps = async (context) => {
	const id = context.params.id;
	const data = await client.get({ endpoint: 'blogs', contentId: id });

	//ハイライト整形
	const result = hightLight(data);
	const categoryData = await client.get({ endpoint: 'categories' });
	return {
		props: {
			blog: result,
			category: categoryData.contents,
			// bodyをコードハイライト実装ずみのものに入れ替え
			// blog: { ...data, body: $.html() },
		},
	};
};
