import Link from 'next/link';
export const CategoryList = ({ category }) => {
	return (
		<>
			<dl>
				<dt>カテゴリー</dt>
				{category.map((category) => (
					<dd key={category.id}>
						<Link href={`/category/${category.id}`}>{category.name}</Link>
					</dd>
				))}
			</dl>
		</>
	);
};
