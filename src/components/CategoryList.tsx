import Link from 'next/link';
export const CategoryList = ({ category }) => {
	return (
		<>
			<ul>
				{category.map((category) => (
					<li key={category.id}>
						<Link href={`/category/${category.id}`}>{category.name}</Link>
					</li>
				))}
			</ul>
		</>
	);
};
