import {
	Button,
	Dialog,
	FormControl,
	Grid,
	InputLabel,
	makeStyles,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core';
import { useContext, useState } from 'react';
import Context from '../Context';
import { signOut } from "next-auth/client";

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		padding: '20px 20px',
	},
}));

export default function Register() {
	const classes = useStyles();
	const { auth, setAuth, session, setUser, setSession } = useContext(Context);
	const [submitting, setSubmitting] = useState(true);

  const register = (values, { setSubmitting }) => {
    let full_name = `${values.firstName} ${values.middleName} ${values.lastName}`;
    let body = { ...values, full_name, user_id: session.user.id };
    Axios.post("/participants/register", body, {
      headers: {
        Authorization: "Bearer " + session.jwt,
      },
    })
      .then((r) => {
        setUser(r.data);
      })
      .catch((e) => {
        setError(e)
      })
      .finally(() => {
        setSubmitting(false);
        setAuth(false);
      });
  };


	console.log(session)
	return (
		<>
			<Dialog
				maxWidth="xs"
				open={session !== null && auth}
				onClose={() => {
					signOut({redirect:false});
					setSession(null);
					setAuth(false);
				}}
				onBackdropClick={() => setAuth(false)}
				// aria-labelledby="max-width-dialog-title"
				classes={{
					paper: classes.dialogPaper,
				}}
			>
				<Typography variant="h6">Welcome Aboard!</Typography>
				<Typography variant="body2">
					Complete your registration before going ahead.
				</Typography>
				<br />
				<form action="">
					<TextField label="First Name" variant="outlined" fullWidth />
					<TextField label="Middle Name" variant="outlined" fullWidth />
					<TextField label="Last Name" variant="outlined" fullWidth />
					<TextField label="Enrollment No." variant="outlined" fullWidth />
					<TextField label="College Name" variant="outlined" fullWidth />
					<TextField label="City" variant="outlined" fullWidth />

					<Grid container spacing={1}>
						<Grid item xs={4}>
							<FormControl variant="outlined" fullWidth>
								<InputLabel id="year">Year</InputLabel>
								<Select
									labelId="year"
									// value={age}
									// onChange={handleChange}
									label="Year"
								>
									<MenuItem value="FY">FY</MenuItem>
									<MenuItem value="SY">SY</MenuItem>
									<MenuItem value="TY">TY</MenuItem>
									<MenuItem value="LY">LY</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs>
							<TextField label="Phone No." variant="outlined" fullWidth />
						</Grid>
					</Grid>
					<TextField label={session ? session.user.email : "Email"} variant="outlined" fullWidth disabled />
					<small>
						*The above data cannot be changed once submitted. All spam entries
						will be disqualified.
					</small>
					<br />
					<br />
					<Grid container spacing={1} justify="center">
						<Button
							variant="contained"
							color="primary"
							size="large"
							type="submit"
							fullWidth
							style={{ margin: '0 auto' }}
						>
							Register
						</Button>
					</Grid>

					<br />
				</form>
			</Dialog>
		</>
	);

	}