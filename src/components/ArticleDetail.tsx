import styles from '@/styles/Home.module.scss';
import FormatDate from '@/libs/FormatDate';
export const ArticleDetail = ({ blog }) => {
	const publishedAt = FormatDate(blog.publishedAt);
	return (
		<>
			<h1 className={styles.title}>{blog.title}</h1>
			<p className={styles.publishedAt}>{publishedAt}</p>
			<div
				dangerouslySetInnerHTML={{
					__html: `${blog.content}`,
				}}
				className={styles.post}
			/>
		</>
	);
};
