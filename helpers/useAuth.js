import Axios from 'axios';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/client';
import axios from 'axios';

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// const baseUrl = "http://localhost:1337"

export default function useAuth() {
	const [auth, setAuth] = useState(false);
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(null);
	const [myEvents, setmyEvents] = useState(null);

	const authenticate = () => {
		getSession().then((s) => {
			setSession(s);
			if (s) {
				// console.log(s.jwt);
				axios({
					method: 'post',
					url: `${baseUrl}/participants`,
					data: {
						email: s.user.email,
					},
					headers: {
						Authorization: 'Bearer ' + s.jwt,
					},
				})
					.then((u) => {
						if (u.data.length > 0) {
							setUser(u.data[0]);
						} else {
							setAuth(true);
						}
					})
					.catch((e) => {
						console.log(e);
						setError('Unable to reach server!');
					})
					.finally(() => {
						setLoading(false);
					});
			} else {
				setLoading(false);
			}
		});
	};
	const getMyEvents = () => {
		axios({
			method: 'get',
			url: `${baseUrl}/participations?user_id=${user._id}`,
			headers: {
				Authorization: 'Bearer ' + session.jwt,
			},
		}).then((myEv) => {
			const myEventData = myEv.data.map((ev) => {
				return {
					event_name: ev.event_name,
					category_name: ev.category_name,
					transaction_id: ev.transaction_id
				};
			});
			setmyEvents(myEventData);
		});
	};

	useEffect(() => {
		authenticate();
	}, []);

	useEffect(() => {
		if (user) getMyEvents();
	}, [user]);

	return {
		auth,
		setAuth,
		session,
		setSession,
		user,
		setUser,
		loading,
		setLoading,
		error,
		setError,
		success,
		setSuccess,
		myEvents,
		setmyEvents,
	};
}
