import Router from 'next/router';
export const keywordSearch = (keyword) => {
	Router.push('/search/?q=' + keyword + '&page=1');
	return keyword;
};
