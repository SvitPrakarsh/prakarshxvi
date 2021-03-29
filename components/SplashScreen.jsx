import { CircularProgress, Fade } from '@material-ui/core';
import { useEffect } from 'react';

export default function SplashScreen({ show }) {
	useEffect(() => {
		document.body.style.overflow = 'hidden';
		// return (document.body.style.overflow = 'auto');
	}, []);

	return (
		<Fade in={show} timeout={{ exit: '500' }}>
			<div className="splash-screen">
				<img src="/prakarsh-logo.svg" alt="" />
				<i style={{ fontFamily: 'serif' }}>"An Impulse to Soar."</i>
				<CircularProgress style={{ marginTop: '10px' }} />
			</div>
		</Fade>
	);
}
