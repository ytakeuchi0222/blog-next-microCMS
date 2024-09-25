import { client } from '@/libs/client';
import { Pagination } from '@/components/Pagination';
import Link from 'next/link';
const PER_PAGE: string = process.env.NEXT_PUBLIC_PER_PAGE ? process.env.NEXT_PUBLIC_PER_PAGE : '';

// pages/blog/[id].js
export default function BlogPageId({ blog, totalCount }) {
	return (
		<div>
			<ul>
				{blog.map((blog) => (
					<li key={blog.id}>
						<Link href={`/blog/${blog.id}`}>{blog.title}</Link>
					</li>
				))}
			</ul>
			<Pagination totalCount={totalCount} />
		</div>
	);
}

// 動的なページを作成
export const getStaticPaths = async () => {
	const repos = await client.get({ endpoint: 'blogs' });

	const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

	const paths = range(1, Math.ceil(repos.totalCount / PER_PAGE)).map(
		(repo) => `/blog/page/${repo}`
	);

	return { paths, fallback: false };
};

// データを取得
export const getStaticProps = async (context) => {
	const id = context.params.id;

	const data = await client.get({
		endpoint: 'blogs',
		queries: { offset: (id - 1) * PER_PAGE, limit: PER_PAGE },
	});

	return {
		props: {
			blog: data.contents,
			totalCount: data.totalCount,
		},
	};
};
