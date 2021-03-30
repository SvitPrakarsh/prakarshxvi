import { ButtonBase, makeStyles } from '@material-ui/core';
import { useRef, useEffect } from 'react';
import { animated, useSpring, config } from 'react-spring';
import Link from 'next/link';

export default function CategoryCard({ category, color }) {
	const container = useRef(null);
	const [props, set] = useSpring(() => ({
		xys: [0, 0, 1],
		config: config.default,
	}));
	const calc = (x, y) => {
		const height = container.current.offsetHeight;
		const width = container.current.offsetWidth;
		const animX = (x - width / 2) / 20;
		const animY = -(y - height / 2) / 20;
		// console.log([animY, animX, 1])
		return [animY, animX, 1];
	};
	const trans = (x, y, s) =>
		`perspective(300px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

	return (
		<Link href={`/events/${encodeURI(category.name)}`}>
			<ButtonBase
				focusRipple
				// disabled={}
				style={{
					borderRadius: '20px',
				}}
			>
				<div
					// ref={container}
					// onMouseMove={(e) =>
					// 	set({xys: calc(e.nativeEvent.offsetX, e.nativeEvent.offsetY)})
					// }
					// onMouseLeave={() => set({xys: [0, 0, 1]})}
					id="event-card"
					style={{
						// transform: props.xys.interpolate(trans),
						background: `hsla(${color}, 75%, 60%, 1) url(${category.textUrl}) no-repeat 98%`,
					}}>
					<img id="card-icon" src={category.iconUrl} alt=""/>
				</div>
			</ButtonBase>
		</Link>
	);
}

// <Card className={classes.root}>
/* <CardActionArea
									className={classes.actionArea}
									onClick={() => {
										console.log(encodeURI(category.name));
										router.push(`/events/${encodeURI(category.name)}`);
									}}
								> */
/* <CardMedia
										className={classes.media}
										image="/prakarsh-logo.svg"
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
									</CardContent> */
/* </CardActionArea> */
// </Card>
