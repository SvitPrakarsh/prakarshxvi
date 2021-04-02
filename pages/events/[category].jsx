import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Chip,
	Container,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import { useContext, useEffect } from 'react';
import Context from '../../Context';
import EventDialog from '../../components/EventDialog';
import allEvents from '../../data/events.json';
import NProgress from 'nprogress';
import { dashify } from '../../helpers/utils';
import Head from 'next/head';

const useStyles = makeStyles((theme) => ({
	content: {
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		overflow: 'hidden',
		// backgroundColor: theme.palette.background.paper,
	},
	gridList: {
		width: 1000,
		height: 1000,
	},
	titleBar: {
		background:
			'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
}));

export default function Events({ category, events }) {
	const classes = useStyles();
	const { event, setEvent } = useContext(Context);

	useEffect(() => {
		console.log(event);
	}, [event]);

	return (
		<>
			<Head>
				<title>{events[0].category_name} | PrakarshXVI</title>
			</Head>
			<EventDialog />
			<Container>
				<Typography
					id="category-title"
					variant="h2"
					style={{
						fontFamily: "'Valorant',sans-serif",
					}}
					gutterBottom
				>
					{events[0].category_name} {/*100IQ logic*/}
				</Typography>
				<div className={classes.content}>
					<Grid container spacing={3} justify="center">
						{events.map((event, key) => (
							<Grid item sm={6} md={4} lg={3} key={key}>
								{/*<ButtonBase>*/}
								<Card
									style={{
										margin: '0 auto',
										minWidth: 240,
										maxWidth: 240,
										minHeight: 351,
										borderRadius: '15px',
									}}
								>
									<CardActionArea disableRipple onClick={() => setEvent(event)}>
										<div id="event-price">
											<Chip
												color="primary"
												label={`₹ ${event?.details[2].sectionContent}`}
											/>
										</div>
										<CardMedia
											className={classes.media}
											image={`/images/${dashify(event.category_name)}/${dashify(
												event.eventName
											)}.png`}
											title={event.eventName}
											style={{ height: 250, paddingTop: 0 }}
										/>
										<CardContent style={{ height: '100%' }}>
											<Typography gutterBottom variant="h5" component="h2">
												{event.eventName}
											</Typography>
											<Typography
												variant="body2"
												color="textSecondary"
												component="p"
											>
												{event.category_name}
											</Typography>
										</CardContent>
									</CardActionArea>
								</Card>
								{/*</ButtonBase>*/}
							</Grid>
						))}
					</Grid>
				</div>
			</Container>
		</>
	);
}

// © Akshar Patel | BigBrain
export const getStaticProps = async (ctx) => {
	const category = dashify(ctx.params.category);
	console.log('category:', ctx.params);
	const events = allEvents[category];
	console.log('events:', events);
	// console.log(category)

	return {
		props: { category: ctx.params.category, events },
	};
};

export const getStaticPaths = async () => {
	const categories = Object.keys(allEvents);

	const path = categories.map((category) => {
		return { params: { category: category } };
	});
	// console.log(path);
	return {
		paths: path,
		fallback: false,
	};
};
