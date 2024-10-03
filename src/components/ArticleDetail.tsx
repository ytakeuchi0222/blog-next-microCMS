import styles from '@/styles/ArticleDetail.module.scss';
import { formatDate } from '@/libs/formatDate';
export const ArticleDetail = ({ blog }) => {
	const publishedAt = formatDate(blog.publishedAt);
	return (
		<article className={styles.ArticleDetail}>
			<h1 className={styles.title}>{blog.title}</h1>
			<p className={styles.publishedAt}>{publishedAt}</p>
			<div
				dangerouslySetInnerHTML={{
					__html: `${blog.content}`,
				}}
				className={styles.post}
			/>
		</article>
	);
};
