import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	Container,
	Divider,
	Fade,
	Grid,
	IconButton,
	Link,
	makeStyles,
	Paper,
	TextField,
	Typography,
} from '@material-ui/core';
import { Facebook, YouTube } from '@material-ui/icons';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useContext, useEffect, useState } from 'react';
import Background from '../components/Background';
import CategoryCard from '../components/CategoryCard';
import SplashScreen from '../components/SplashScreen';
import Sponsers from '../components/Sponsers';
import Context from '../Context';
import categories from '../data/eventCategories.json';
import faqs from '../data/faqs.json';
import Footer from '../components/Footer';
import Head from 'next/head';
import useLocalStorage from '../helpers/useLocalStorage';
import { Swiper, SwiperSlide } from 'swiper/react';
import talks from '../data/talks.json';

const useStyles = makeStyles(() => ({
	actionArea: {
		width: 'fit-content',
	},
	heroDesc: {
		fontFamily: '"Operator Mono", monospace',
		fontSize: 24,
		color: '#FF4655',
		fontWeight: 400,
		textAlign: 'left',
	},
}));

export default function Home() {
	const classes = useStyles();
	const { error, setError } = useContext(Context);
	const [splashGone, setSplashGone] = useState(false);
	const [nums, setNums] = useState([]);
	const [support, setSupport] = useState({
		name: '',
		message: '',
		email: '',
		phone: '',
	});
	const shuffleArray = (array) => {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	};

	const generator = () => {
		let nums = [];
		let starter = Math.random() * 7;
		nums.push(Math.floor(starter));

		while (nums.length !== 7) {
			nums.push(Math.floor((nums[nums.length - 1] + 36) % 255));
		}
		shuffleArray(nums);
		// console.log(nums)
		setNums(nums);
	};

	useEffect(() => {
		generator();
	}, []);

	return (
		<>
			{/*idhar SplashScreen rekhna mana he*/}
			<Head>
				<title> PrakarshXVI | SVIT's Largest Tech Fest</title>
			</Head>
			<div id="hero">
				<Background />
				<div id="xvi">XVI</div>
				<Fade in timeout={{ enter: 3000 }}>
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
			<Container id="events" style={{ padding: '40px 0' }} maxWidth="xl">
				<div style={{ maxWidth: '36vw', margin: '0 auto 50px' }}>
					<Typography
						variant="h3"
						align="center"
						gutterBottom
						style={{ fontFamily: '"Valorant",sans-serif' }}
					>
						Talk Fest
					</Typography>
					<Divider style={{ backgroundColor: '#FF4655' }} />
				</div>
				<div id="talk-events">
					{/* <Swiper
						spaceBetween={20}
						loop={true}
						centeredSlides={true}
						setWrapperSize={true}
						scrollbar={{ draggable: true }}
						speed={1900}
						// autoplay={{ delay: 1210, disableOnInteraction: false }}
						// data-swiper-autoplay={2877}
						breakpoints={{
							// when window width is >= 640px
							280: {
								slidesPerView: 1,
							},
							// when window width is >= 768px
							520: {
								slidesPerView: 1.6,
							},
						}}
					> */}
					{talks.map((talk, key) => (
						// <SwiperSlide style={{ textAlign: 'center' }} key={key}>
						<div id="talk-card">
							<div id="img">
								<img key={key} src={talk.imageUrl} alt="" />
							</div>
							<div id="txt">
								<div>
									<h2>{talk.name}</h2>
									<p>{talk.intoduction}</p>
									<p>{talk.detail}</p>
									{/*<div className="tag">{props.type}</div>*/}
								</div>
								<div id="links">
									<p>{talk.time}</p>
									<a
										href="https://www.youtube.com/channel/UCNAulOO7sXufEpLQix1txqA"
										target="_blank"
										rel="noopener noreferrer"
									>
										<YouTube />
									</a>
									<a
										href="https://www.facebook.com/SVIT.Vasad.Official/"
										target="_blank"
										rel="noopener noreferrer"
									>
										<Facebook />
									</a>
								</div>
							</div>
						</div>
					))}
					{/* </Swiper> */}
				</div>
			</Container>
			<Container id="events" style={{ padding: '40px' }} maxWidth="lg">
				<div style={{ maxWidth: '36vw', margin: '0 auto 50px' }}>
					<Typography
						variant="h3"
						align="center"
						gutterBottom
						style={{ fontFamily: '"Valorant",sans-serif' }}
					>
						Events
					</Typography>
					<Divider style={{ backgroundColor: '#FF4655' }} />
				</div>
				<Grid container spacing={2} justify="center" alignItems="center">
					{categories.map((category, key) => {
						console.log(nums[key]);
						return (
							<Grid
								item
								sm
								md={4}
								lg={3}
								key={key}
								justify="center"
								alignItems="center"
							>
								<CategoryCard category={category} color={nums[key]} key={key} />
							</Grid>
						);
					})}
				</Grid>
			</Container>
			<Paper style={{ padding: '30px 20px' }}>
				<Container maxWidth="md">
					<div style={{ maxWidth: '36vw', margin: '0 auto 50px' }}>
						<Typography
							variant="h4"
							fontWeight={400}
							align="center"
							gutterBottom
							style={{ fontFamily: '"Valorant",sans-serif' }}
						>
							SPONSORS
						</Typography>
						<Divider />
					</div>
					<Sponsers />
					<br />
					<br />
				</Container>
			</Paper>
			<Container maxWidth="md" style={{ padding: '40px' }}>
				<Typography variant="h3" align="center" gutterBottom>
					FAQ
				</Typography>
				{faqs.map((q) => (
					<Accordion>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							id="panel1a-header"
						>
							<Typography variant="h6" style={{ fontSize: '18px' }}>
								{q.question}
							</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography variant="body1" color="textSecondary">
								{q.answer}
							</Typography>
						</AccordionDetails>
					</Accordion>
				))}
			</Container>
			<Paper style={{ padding: '40px 0' }}>
				<Container maxWidth="md">
					<Typography variant="h3" align="center" gutterBottom>
						SUPPORT
					</Typography>
					<Grid container spacing={3} justify="center">
						<Grid item xs="12" sm="6" xl="4" style={{ textAlign: 'center' }}>
							<iframe
								src="https://discord.com/widget?id=826456950443081769&theme=dark"
								// width="350"
								height="280"
								allowTransparency
								frameBorder="0"
								style={{ margin: 'auto' }}
								sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
							/>
						</Grid>
						<Grid
							container
							item
							xs="12"
							sm="6"
							xl="4"
							spacing="1"
							justify="center"
						>
							<Grid item xs="12">
								<TextField
									required
									value={support.name}
									onChange={(e) =>
										setSupport({ ...support, name: e.target.value })
									}
									label="Full Name"
									variant="outlined"
									fullWidth
								/>
							</Grid>
							<Grid item xs="6">
								<TextField
									required
									value={support.phone}
									onChange={(e) =>
										setSupport({ ...support, phone: e.target.value })
									}
									label="Phone"
									variant="outlined"
									fullWidth
								/>
							</Grid>
							<Grid item xs="6">
								<TextField
									required
									value={support.email}
									onChange={(e) =>
										setSupport({ ...support, email: e.target.value })
									}
									label="Email"
									variant="outlined"
									fullWidth
								/>
							</Grid>
							<Grid item xs="12">
								<TextField
									required
									multiline
									value={support.message}
									onChange={(e) =>
										setSupport({ ...support, message: e.target.value })
									}
									label="Message"
									variant="outlined"
									rows="5"
									fullWidth
								/>
							</Grid>
							<Grid item xs="12">
								<Button
									href={`mailto:support@prakarsh.org?&subject=${support.name} - Support Request&body=Email: ${support.email} | Phone: ${support.phone} \n ${support.message}`}
									variant="contained"
									color="primary"
									size="large"
									style={{ margin: '0 auto' }}
									name="submit"
									type="submit"
									fullWidth
								>
									Submit
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<br />
					<br />
				</Container>
				<Container maxWidth="xl">
					<Footer />
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
