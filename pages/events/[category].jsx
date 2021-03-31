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

const dashify = (str) => {
	let dashedString = str.toLowerCase();
	dashedString = dashedString.replace(/ /g, '-');
	dashedString = dashedString.replace(/'/g, '');
	console.log(dashedString);
	return dashedString;
};

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
			<EventDialog />
			<Container>
				<Grid
					container
					justify="space-between"
					alignItems="center"
					style={{ padding: 10 }}
				>
					<Typography
						id="category-title"
						variant="h2"
						style={{
							fontFamily: "'Valorant',sans-serif",
						}}
					>
						{events[0].category_name}
					</Typography>
					{/*<IconButton disabled>*/}
					<img
						id="category-icon"
						src={`/images/${category}.png`}
						alt=""
						height="150px"
						width="auto"
					/>
					{/*</IconButton>*/}
				</Grid>
				<div className={classes.content}>
					<Grid container spacing={3}>
						{events.map((event, key) => (
							<Grid item sm={6} md={4} lg={3} key={key}>
								<Card
									style={{
										minWidth: 200,
										maxWidth: 250,
										borderRadius: '15px',
									}}
								>
									<CardActionArea onClick={() => setEvent(event)}>
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
										<CardContent>
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
	// console.log('category:', category);
	const events = allEvents[category];
	// console.log('events:', events);

	return {
		props: { category: ctx.params.category, events },
	};
};

export const getStaticPaths = async () => {
	const categories = Object.keys(allEvents);

	const path = categories.map((category) => {
		return { params: { category: category } };
	});
	console.log(path);
	return {
		paths: path,
		fallback: false,
	};
};
