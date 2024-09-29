import Link from 'next/link';
import FormatDate from '@/libs/FormatDate';
import styles from '@/styles/ArticleList.module.scss';
export const ArticleSearch = ({ searchResult }) => {
	return (
		<>
			{/* 検索結果 */}
			{searchResult &&
				searchResult.map((blog) => (
					<article key={blog.id} className={styles.article}>
						<Link href={`/blog/${blog.id}`}>
							<div>
								<span className={styles.date}>{FormatDate(blog.publishedAt)}</span>
								<p className={styles.title}>「{blog.title}」</p>
							</div>
						</Link>
					</article>
				))}
			<div>ここまで検索</div>
		</>
	);
};
