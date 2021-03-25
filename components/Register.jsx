import {
	Button,
	CircularProgress,
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
import { signOut } from 'next-auth/client';
import { ErrorMessage, Form, Formik } from 'formik';
import Axios from 'axios';
import * as Yup from 'yup';

const useStyles = makeStyles((theme) => ({
	dialogPaper: {
		padding: '20px 20px',
	},
}));

export default function Register() {
	const classes = useStyles();
	const { auth, setAuth, session, setUser, setSession } = useContext(Context);
	// const [submitting, setSubmitting] = useState(true);

	const register = (values, { setSubmitting }) => {
		let full_name = `${values.firstName} ${values.middleName} ${values.lastName}`;
		let body = { ...values, full_name, user_id: session.user.id };
		Axios.post('/participants/register', body, {
			headers: {
				Authorization: 'Bearer ' + session.jwt,
			},
		})
			.then((r) => {
				setUser(body);
			})
			.catch((e) => console.log(e))
			.finally(() => {
				setSubmitting(false);
				setAuth(false);
			});
	};

	const initialValues = {
		firstName: '',
		middleName: '',
		lastName: '',
		enroll: undefined,
		number: undefined,
		college: '',
		city: '',
		year: 'FY',
		email: session?.user.email,
	};
	const registerSchema = Yup.object().shape({
		firstName: Yup.string().required('First Name is Required'),
		middleName: Yup.string().required('Middle Name is Required'),
		lastName: Yup.string().required('Last Name is Required'),
		college: Yup.string().required('College is Required'),
		city: Yup.string().required('City is Required'),
		year: Yup.string().required('Year is Required'),
		enroll: Yup.string().required('Enrollment No. is Required'),
		number: Yup.string()
			.matches(
				/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
				'Phone number is not valid'
			)
			.required('Phone Number is Required'),
	});

	// console.log(session);
	return (
		<>
			<Dialog
				maxWidth="xs"
				open={session !== null && auth}
				onClose={() => {
					signOut({ redirect: false });
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
				<Formik
					initialValues={initialValues}
					onSubmit={register}
					validationSchema={registerSchema}
					validateOnBlur
				>
					{(formik) => (
						<Form>
							<TextField
								name="firstName"
								label="First Name"
								variant="outlined"
								fullWidth
								required
								value={formik.values.firstName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.firstName && !!formik.errors.firstName}
							/>
							<ErrorMessage name="firstName" component="i" />
							<TextField
								name="middleName"
								label="Middle Name"
								variant="outlined"
								fullWidth
								required
								value={formik.values.middleName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.middleName && !!formik.errors.middleName}
							/>
							<ErrorMessage name="middleName" component="i" />
							<TextField
								name="lastName"
								label="Last Name"
								variant="outlined"
								fullWidth
								required
								value={formik.values.lastName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.lastName && !!formik.errors.lastName}
							/>
							<ErrorMessage name="lastName" component="i" />
							<TextField
								name="enroll"
								label="Enrollment No."
								variant="outlined"
								fullWidth
								required
								value={formik.values.enroll}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.enroll && !!formik.errors.enroll}
							/>
							<ErrorMessage name="enroll" component="i" />
							<TextField
								name="college"
								label="College Name"
								variant="outlined"
								fullWidth
								required
								value={formik.values.college}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.college && !!formik.errors.college}
							/>
							<ErrorMessage name="college" component="i" />
							<TextField
								name="city"
								label="City"
								variant="outlined"
								fullWidth
								required
								value={formik.values.city}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								error={formik.touched.city && !!formik.errors.city}
							/>
							<ErrorMessage name="city" component="i" />
							<Grid container spacing={1}>
								<Grid item xs={4}>
									<FormControl variant="outlined" fullWidth required>
										<InputLabel id="year">Year</InputLabel>
										<Select
											labelId="year"
											name="year"
											label="Year"
											value={formik.values.year}
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											error={formik.touched.year && !!formik.errors.year}
										>
											<MenuItem value="FY">FY</MenuItem>
											<MenuItem value="SY">SY</MenuItem>
											<MenuItem value="TY">TY</MenuItem>
											<MenuItem value="LY">LY</MenuItem>
										</Select>
									</FormControl>
									<ErrorMessage name="year" component="i" />
								</Grid>
								<Grid item xs>
									<TextField
										name="number"
										label="Phone No."
										variant="outlined"
										fullWidth
										required
										value={formik.values.number}
										onChange={formik.handleChange}
										onBlur={formik.handleBlur}
										error={formik.touched.number && !!formik.errors.number}
									/>
									<ErrorMessage name="number" component="i" />
								</Grid>
							</Grid>
							<TextField
								name="email"
								label={session?.user.email || 'Email'}
								variant="outlined"
								fullWidth
								required
								disabled
								value={formik.values.email}
							/>
							<small>
								*The above data cannot be changed once submitted. All spam
								entries will be disqualified.
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
									disabled={formik.isSubmitting}
								>
									{formik.isSubmitting ? (
										<CircularProgress color="secondary" />
									) : (
										'Register'
									)}
								</Button>
							</Grid>
						</Form>
					)}
				</Formik>
			</Dialog>
		</>
	);
}
