import Link from 'next/link';
import FormatDate from '@/libs/FormatDate';
export const ArticleList = ({ blog }) => {
	return (
		<>
			{blog.map((blog) => (
				<article key={blog.id}>
					<Link href={`/blog/${blog.id}`}>
						<p className="title">
							{FormatDate(blog.publishedAt)}「{blog.title}」
						</p>
					</Link>
				</article>
			))}
		</>
	);
};
