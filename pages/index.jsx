import {
	Container,
	Divider,
	Grid,
	makeStyles,
	Paper,
	Typography,
	Snackbar
} from '@material-ui/core';
import EventCategories from '../components/Events';
import { useContext, useEffect, useState, useRef } from 'react';
import Context from '../Context';
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
	heroDesc: {
		fontFamily: '"Operator Mono", monospace',
		fontSize: 24,
		color: '#FF4655',
		fontWeight: 400,
		textAlign: 'left'
	},
}));
import Sponsers from '../components/Sponsers';
import Background from "../components/Background";
import {Head} from "next/document";

export default function Home() {
	const classes = useStyles();
	const { error, setError } = useContext(Context);


	return (
		<>
			<div id="hero">
				<Background />
				<h1 id="hero-main">
					PRAKARSH XVI
				</h1>
				<h5
					id='hero-desc'
				>
					[ an impulse to soar ]
				</h5>
			</div>
			<Paper style={{ padding: '40px' }}>
				<Container maxWidth="lg">
					<Grid container spacing={5} alignItems='center'>
						<Grid item sm>
							<div
								style={{
									borderRadius: '10px',
									width: '100%',
									height: '100%',
									overflow:'hidden'
								}}
							><img src='/College_Image.png' alt='' height='auto' width='600px' style={{objectFit: 'contain'}}/></div>
						</Grid>
						<Grid item sm>
							<div style={{ maxWidth: '36vw', margin: '0 0 25px' }}>
								<Typography variant="h3" gutterBottom>What is Prakarsh?</Typography>
								<Divider style={{width: '50%', backgroundColor:'#FF4655' }}/>
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
			<div id='events'>
			<EventCategories />

			</div>
			<Paper style={{ padding: '30px 20px' }}>
				<Container>
					<div style={{ maxWidth: '36vw', margin: '0 auto 50px' }}>
						<Typography
							variant="h3"
							align="center"
							gutterBottom
							style={{ fontFamily: '"Valorant",sans-serif' }}
						>
							SPONSORS
						</Typography>
						<Divider />
					</div>
					<Sponsers style={{ padding: '30px 20px' }} />
				</Container>
			</Paper>
			<Snackbar
				autoHideDuration={6000}
				anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				open={error}
				onClose={() => { setError(null) }}
			>
				<MuiAlert elevation={6} variant="filled" severity="error">{error}</MuiAlert>
			</Snackbar>
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
