import Router from 'next/router';
import { useState } from 'react';
export const CategoryList = ({ category }) => {
	const [categoryValue, setCategoryValue] = useState('カテゴリで検索');

	const categoryPush = (category) => {
		setCategoryValue(category);
		if (category != 'カテゴリで検索') {
			Router.push('/category/' + category + '?page=1');
		}
	};

	return (
		<>
			{/* <ul>
				{category.map((category) => (
					<li key={category.id}>
						<Link href={`/category/${category.id}?page=1`}>{category.name}</Link>
					</li>
				))}
			</ul> */}
			<label className="selectbox">
				<select name="category" value={categoryValue} onChange={(e) => categoryPush(e.target.value)}>
					<option value="カテゴリで検索">カテゴリで検索</option>
					{category?.map((category) => (
						<option value={category.id} key={category.id}>
							{category.name}
						</option>
					))}
				</select>
			</label>
		</>
	);
};
