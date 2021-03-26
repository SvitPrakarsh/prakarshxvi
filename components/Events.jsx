import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Divider,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';
import categories from '../data/eventCategories.json';
import { useRouter } from 'next/router';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	actionArea: {
		width: 'fit-content',
	},
});

export default function EventCategories() {
	const classes = useStyles();
	const router = useRouter();

	// useEffect(()=>{
	// 	onMou
	// },[])

	return (
		<Container style={{ padding: '40px' }} maxWidth="md">
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
					return (
						<Grid item sm md={4} lg={3} key={key}>
							<Card className={classes.root}>
								<CardActionArea
									className={classes.actionArea}
									onClick={() => {
										console.log(encodeURI(category.name));
										router.push(`/events/${encodeURI(category.name)}`);
									}}
								>
									{/* <CardMedia
										className={classes.media}
										image="/prakarsh2021-logo.png"
										title=""
										style={{ height: 160, paddingTop: 0 }}
									/>
									<CardContent>
										<Typography gutterBottom variant="h5" component="h2">
											{category.name}
										</Typography>
										<Typography
											variant="body2"
											color="textSecondary"
											component="p"
										>
											{category.subtitle}
										</Typography>
									</CardContent> */}
									<div id="event-card">
										<div id="card-icon">
											<img src={category.iconUrl} alt="" />
										</div>
										<div id="card-text">
											<img src={category.textUrl} alt="" />
										</div>
									</div>
								</CardActionArea>
							</Card>
						</Grid>
					);
				})}
				<div id="event-card">
					<img src="/hex-icon.png" alt="" id="card-icon" />
					<img id="card-text" src="/images/ancillary.svg" alt="" />
				</div>
			</Grid>
		</Container>
	);
}

const Animation = () => {
	const [selectedId, setSelectedId] = useState(null);

	const items = [
		{
			id: 1,
			title: 'Dexters Lab',
			subtitle: 'lorem ipsum',
		},
	];
	return (
		<AnimateSharedLayout type="crossfade">
			{items.map((item) => (
				<motion.div layoutId={item.id} onClick={() => setSelectedId(item.id)}>
					<motion.h5>{item.subtitle}</motion.h5>
					<motion.h2>{item.title}</motion.h2>
				</motion.div>
			))}

			<AnimatePresence>
				{selectedId && (
					<motion.div layoutId={selectedId}>
						<motion.h5>{items[selectedId].subtitle}</motion.h5>
						<motion.h2>{items[selectedId].title}</motion.h2>
						<motion.button onClick={() => setSelectedId(null)} />
					</motion.div>
				)}
			</AnimatePresence>
		</AnimateSharedLayout>
	);
};
