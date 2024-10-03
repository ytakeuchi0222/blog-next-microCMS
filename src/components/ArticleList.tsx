import Link from 'next/link';
import { formatDate } from '@/libs/formatDate';
import styles from '@/styles/ArticleList.module.scss';
export const ArticleList = ({ blog }) => {
	if (blog.length === 0) {
		return (
			<>
				<div>ブログコンテンツがありません</div>
			</>
		);
	}
	return (
		<>
			{blog.map((blog) => (
				<article key={blog.id} className={styles.article}>
					<Link href={`/blog/${blog.id}`}>
						<div>
							<span className={styles.date}>{formatDate(blog.publishedAt)}</span>
							<p className={styles.title}>「{blog.title}」</p>
						</div>
					</Link>
				</article>
			))}
		</>
	);
};
