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
import CategoryCard from './CategoryCard';

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
	const [nums, setNums] = useState([])

	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
	}

	const generator = () => {
		let nums = []
		let starter = Math.random() * 7
		nums.push(Math.floor(starter))

		while (nums.length !== 7) {
			nums.push(Math.floor((nums[nums.length - 1] + 36) % 255));
		}
		shuffleArray(nums)
		console.log(nums)
		setNums(nums)

	}

	useEffect(() => generator(), [])

	return (
		<Container style={{padding: '40px'}} maxWidth="lg">
			<div style={{maxWidth: '36vw', margin: '0 auto 50px'}}>
				<Typography
					variant="h3"
					align="center"
					gutterBottom
					style={{fontFamily: '"Valorant",sans-serif'}}
				>
					Events
				</Typography>
				<Divider style={{backgroundColor: '#FF4655'}}/>
			</div>
			<Grid container spacing={2} justify="center" alignItems="center">
				{categories.map((category, key) => {
					console.log(nums[key])
					return (
						<Grid item sm md={4} lg={3} key={key} justify='center' alignItems='center'>
							<CategoryCard category={category} color={nums[key]} key={key}/>
						</Grid>
					);
				})}
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

