import { client } from '@/libs/client';
// import Link from 'next/link';
// import FormatDate from '@/libs/FormatDate';
import { ArticleList } from '@/components/ArticleList';
import styles from '@/styles/Home.module.scss';
// import { useSearchParams } from 'next/navigation';
import { PaginationSearch } from '@/components/PaginationSearch';
import { Categorytitle } from '@/components/CategoryTitle';
const PER_PAGE_STRING: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';
const PER_PAGE = Number(PER_PAGE_STRING);
export default function SearchId({ blog, totalCount, keyword }) {
	// const searchParams = useSearchParams();
	// const q = searchParams.get('q');

	// カテゴリーに紐付いたコンテンツがない場合に表示
	if (blog.length === 0) {
		return <div>ブログコンテンツがありません</div>;
	}
	return (
		<>
			<div className={styles.mainArea}>
				<Categorytitle type="― SEARCH WORD ―" keyword={keyword} totalCount={totalCount} />
				<main className={styles.main}>
					<ArticleList blog={blog}></ArticleList>
				</main>
				<div className={styles.sideBar}>{/* <CategoryList category={category} /> */}</div>
			</div>
			<PaginationSearch totalCount={totalCount} keyword={keyword} />
		</>
	);
}

// データをテンプレートに受け渡す部分の処理を記述します
// export const getStaticProps = async (context) => {
// 	console.log(context.params);
// 	const keyword = 'サンプル';
// 	const data = await client.get({ endpoint: 'blogs', queries: { q: keyword } });
// 	// console.log(data);
// 	return {
// 		props: {
// 			blog: data.contents,
// 			totalCount: data.totalCount,
// 			keyword: keyword,
// 		},
// 	};
// };
export const getServerSideProps = async (context) => {
	// console.log(context);
	// console.log(context.query.q);
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
