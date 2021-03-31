import {ButtonBase, makeStyles} from '@material-ui/core';
import Link from 'next/link';

const dashify = (str) => {
	let dashedString = str.toLowerCase();
	dashedString = dashedString.replace(/ /g, '-');
	dashedString = dashedString.replace(/'/g, '');
	console.log(dashedString);
	return dashedString;
};

export default function CategoryCard({category, color}) {

	return (
		<Link href={`/events/${dashify(category.name)}`}>
			<ButtonBase
				focusRipple
				style={{
					display: 'block',
					margin: 'auto',
					borderRadius: '20px',
				}}
			>
				<div

					id="event-card"
					style={{
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
