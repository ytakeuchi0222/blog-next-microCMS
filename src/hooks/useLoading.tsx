import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export const useLoading = () => {
	const [loading, setLoading] = useState(false);
	const Router = useRouter();

	useEffect(() => {
		const handleRouteChangeStart = () => setLoading(true);
		const handleRouteChangeComplete = () => setLoading(false);

		Router.events.on('routeChangeStart', handleRouteChangeStart);
		Router.events.on('routeChangeComplete', handleRouteChangeComplete);
		Router.events.on('routeChangeError', handleRouteChangeComplete);

		return () => {
			Router.events.off('routeChangeStart', handleRouteChangeStart);
			Router.events.off('routeChangeComplete', handleRouteChangeComplete);
			Router.events.off('routeChangeError', handleRouteChangeComplete);
		};
	}, [Router]);

	return loading;
};
