import Link from 'next/link';
import FormatDate from '@/libs/FormatDate';
import styles from '@/styles/ArticleList.module.scss';
export const ArticleList = ({ blog }) => {
	return (
		<>
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
		</>
	);
};
