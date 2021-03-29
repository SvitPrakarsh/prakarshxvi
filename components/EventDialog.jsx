import Context from '../Context';
import { useContext } from 'react';
import {
	Button,
	CardMedia,
	Chip,
	Container,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	makeStyles,
	Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		minWidth: '500px',
		[theme.breakpoints.down('sm')]: {
			minWidth: '85vw',
		},
	},
}));

export default function EventDialog() {
	const classes = useStyles();
	const { cart, setCart, event, setEvent } = useContext(Context);
	// const { eventName } = event;

	return (
		<>
			<Dialog
				open={!!event}
				onClose={() => {
					/*setTimeout(() => */ setEvent(null) /*, 1000)*/;
				}}
				scroll="paper"
				maxWidth="xs"
				aria-labelledby={`scroll-dialog-${event?.name}`}
				aria-describedby={`scroll-dialog-${event?.category}`}
				classes={{
					paper: classes.dialogPaper,
				}}
			>
				<DialogTitle id="scroll-dialog-title" style={{ textAlign: 'center' }}>
					{event?.name}
				</DialogTitle>
				<DialogActions>
					<Grid
						container
						justify="space-between"
						alignItems="center"
						style={{ padding: 10 }}
					>
						{/*<Typography variant="h5">*/}
						{/*	*/}
						{/*</Typography>*/}
						<Chip
							color="primary"
							label={`₹ ${event?.details[2].sectionContent}`}
						/>

						<Button
							size="large"
							variant="outlined"
							onClick={() => setCart({ ...cart, event })}
							color="primary"
						>
							Participate
						</Button>
					</Grid>
				</DialogActions>
				<DialogContent>
					<CardMedia
						image="/prakarsh-logo.svg"
						title=""
						style={{ height: 250, paddingTop: 0 }}
					/>
					<DialogContentText id="scroll-dialog-description" tabIndex={-1}>
						{event?.details.map((detail, key) => {
							if (key !== 2)
								return (
									<div key={key}>
										<Typography variant="h5">{detail.sectionHeader}</Typography>
										{key !== 4 ? (
											<Typography variant="body2">
												{detail.sectionContent}
											</Typography>
										) : (
											detail.sectionContent.map((round, subKey) => (
												<>
													<Typography variant="h6">
														{round.sectionHeader}
													</Typography>
													<Typography variant="body2">
														{round.sectionContent}
													</Typography>
												</>
											))
										)}
									</div>
								);
							return null;
						})}
					</DialogContentText>
				</DialogContent>
			</Dialog>
		</>
	);
}
