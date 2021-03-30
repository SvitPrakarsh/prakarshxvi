import {
	Container,
	Divider,
	Grid,
	makeStyles,
	Paper,
	Typography,
	Snackbar,
	Fade,
	IconButton,
} from '@material-ui/core';
import EventCategories from '../components/Events';
import { useContext, useEffect, useState, useRef } from 'react';
import Context from '../Context';
// import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	heroDesc: {
		fontFamily: '"Operator Mono", monospace',
		fontSize: 24,
		color: '#FF4655',
		fontWeight: 400,
		textAlign: 'left',
	},
}));
import Sponsers from '../components/Sponsers';
import Background from '../components/Background';
import { Head } from 'next/document';
import { Email, Facebook, Instagram, Phone, YouTube } from '@material-ui/icons';
import SplashScreen from '../components/SplashScreen';
import {Form} from "formik";

export default function Home() {
	const classes = useStyles();
	const { error, setError } = useContext(Context);
	const [splash, setSplash] = useState(true);
	const [splashGone, setSplashGone] = useState(false);

	useEffect(() => {
		document.body.style.overflow = 'hidden';
		setSplash(true);
		setTimeout(() => {
			document.body.style.overflow = 'auto';
			setSplash(false);
			setSplashGone(true);
		}, [3000]);
	}, []);
	if (splash) return (<SplashScreen show={splash}/>)
	return (
		<>


			<div id="hero">
				<Background/>
				<div id="xvi">XVI</div>
				<Fade in={splashGone} timeout={{enter: 5000}}>
					<h1 id="hero-main">
						PRA<i>K</i>ARSH
					</h1>
				</Fade>

				<h5 id="hero-desc">AN IMPULSE TO SOAR.</h5>
			</div>
			<Paper style={{ padding: '40px' }}>
				<Container maxWidth="lg">
					<Grid container spacing={5} alignItems="center">
						<Grid item sm>
							<div
								style={{
									borderRadius: '10px',
									width: '100%',
									height: '100%',
									overflow: 'hidden',
								}}
							>
								<img
									src="/images/college-image.png"
									alt=""
									height="auto"
									width="100%"
									style={{ objectFit: 'contain' }}
								/>
							</div>
						</Grid>
						<Grid item sm>
							<div style={{ maxWidth: '36vw', margin: '0 0 25px' }}>
								<Typography variant="h3" gutterBottom>
									What is Prakarsh?
								</Typography>
								<Divider style={{ width: '50%', backgroundColor: '#FF4655' }} />
							</div>
							<Typography variant="body1">
								PRAKARSH, a National Level Technical Symposium to bring together
								the best brains in the country and give them a chance to
								showcase their skills and talents. This will give a platform for
								the students to interact and compete with each other. There are
								non-technical events too to incorporate fun activities alongside
								the technical fervour.
							</Typography>
						</Grid>
					</Grid>
				</Container>
			</Paper>
			<div id="events">
				<EventCategories />
			</div>
			<Paper style={{ padding: '30px 20px' }}>
				<Container>
					<div style={{maxWidth: '36vw', margin: '0 auto 50px'}}>
						<Typography
							variant="h4"
							fontWeight={400}
							align="center"
							gutterBottom
							style={{fontFamily: '"Valorant",sans-serif'}}
						>
							SPONSORS
						</Typography>
						<Divider/>
					</div>
					<Sponsers/>
					<br/>
					<br/>
					<Divider style={{backgroundColor: '#444'}}/>
					<footer>
						<div id="copyright">All Rights Reserved © Prakarsh XVI</div>
						<div>
							<IconButton href="https://www.facebook.com/PrakarshTechFest">
								<Facebook/>
							</IconButton>
							<IconButton href="https://www.instagram.com/prakarsh2019/">
								<Instagram/>
							</IconButton>
							<IconButton href="https://www.youtube.com/channel/UCKMMGkIUwMUokSbjgzb9OUw">
								<YouTube/>
							</IconButton>
							<IconButton href="mailto:support@prakarsh.org">
								<Email />
							</IconButton>
							<IconButton href="telto:+917600998231">
								<Phone />
							</IconButton>
						</div>
					</footer>
				</Container>
			</Paper>
		</>
	);
	// </Container>
}

// export const getServerSideProps = async ({ req }) => {
// 	const session = await getSession({ req });
// 	let user;
// 	console.log(session)
// 	if (session) {
// 		user = await axios({
// 			method: 'post',
// 			url: `${baseUrl}/participants`,
// 			data: {
// 				'email': session.user.email
// 			},
// 			headers: {
// 				'Authorization': `Bearer ${session.jwt}`
// 			}
// 		});
// 	}
// 	return {
// 		props: {
// 			name: "Ayaan",
// 			session,
// 			user
// 		}
// 	}
// };
