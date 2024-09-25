import Link from 'next/link';

export const Pagination = ({ totalCount }) => {
	const PER_PAGE: string = process.env.NEXT_PUBLIC_PER_PAGE
		? process.env.NEXT_PUBLIC_PER_PAGE
		: '';
	const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);

	return (
		<ul>
			{range(1, Math.ceil(totalCount / PER_PAGE)).map((number, index) => (
				<li key={index}>
					<Link href={`/blog/page/${number}`}>{number}</Link>
				</li>
			))}
		</ul>
	);
};
