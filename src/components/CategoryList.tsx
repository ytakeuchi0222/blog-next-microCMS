import Router from 'next/router';
import { useState, FC } from 'react';

interface Category {
	id: string;
	name: string;
}

interface CategoryListProps {
	category: Category[];
}

export const CategoryList: FC<CategoryListProps> = ({ category }) => {
	const [categoryValue, setCategoryValue] = useState('カテゴリで検索');

	const categoryPush = (category: string) => {
		setCategoryValue(category);
		if (category !== 'カテゴリで検索') {
			Router.push('/category/' + category + '?page=1');
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		categoryPush(e.target.value);
	};

	return (
		<label className="selectbox">
			<select name="category" value={categoryValue} onChange={handleChange}>
				<option value="カテゴリで検索">カテゴリで検索</option>
				{category?.map((category) => (
					<option value={category.id} key={category.id}>
						{category.name}
					</option>
				))}
			</select>
		</label>
	);
};
