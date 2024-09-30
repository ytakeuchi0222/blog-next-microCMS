import { client } from '@/libs/client';
import Link from 'next/link';
import FormatDate from '@/libs/FormatDate';
import styles from '@/styles/ArticleList.module.scss';

// import { useSearchParams } from 'next/navigation';
import { PaginationSearch } from '@/components/PaginationSearch';
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
				<main className={styles.main}>
					‘{keyword} で検索した結果：{totalCount} 件{/* {q} */}
					{blog.map((blog) => (
						<article key={blog.id} className={styles.article}>
							<Link href={`/blog/${blog.id}`}>
								<div>
									<span className={styles.date}>{FormatDate(blog.publishedAt)}</span>
									<p className={styles.title}>「{blog.title}」</p>
								</div>
							</Link>
						</article>
					))}
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
	console.log(context.query.q);
	const keyword = context.query.q;
	const page = context.query.page;
	const data = await client.get({
		endpoint: 'blogs',
		queries: { q: keyword, offset: (page - 1) * PER_PAGE, limit: PER_PAGE },
	});
	// console.log(data);

	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
			keyword: keyword,
		},
	};
};
