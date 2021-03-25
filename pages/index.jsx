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
		fontFamily: 'Rubik',
		fontSize: 18,
	},
}));


export default function Home() {
	const classes = useStyles();
	const { error, setError } = useContext(Context);


	return (
		<>
			<div id="hero">
				<Typography id="hero-main" variant="h1" className={classes.heroMain}>
					PRAKARSH XVI
				</Typography>

				<Typography
					component="div"
					variant="caption"
					className={classes.heroDesc}
				>
					An Impulse to Soar.
				</Typography>
			</div>
			<Paper style={{ padding: '30px 20px' }}>
				<Container maxWidth="lg">
					<Grid container spacing={5}>
						<Grid item sm>
							<div
								style={{
									borderRadius: '10px',
									backgroundColor: '#fafafa',
									width: '100%',
									height: '100%',
								}}
							/>
						</Grid>
						<Grid item sm>
							<Typography variant="h3">What is Prakarsh?</Typography>
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
			<EventCategories />
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
