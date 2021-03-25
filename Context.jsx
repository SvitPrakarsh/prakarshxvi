import { createContext, useState } from 'react';
import useAuth from './helpers/useAuth'

// Context
const Context = createContext();
export default Context;

// Provider
export const Provider = (props) => {
	const [drawer, setDrawer] = useState(false);
	const [auth, setAuth] = useState(false);
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [error, setError] = useState(null);

	return (
		<Context.Provider
			value={{
				drawer,
				setDrawer,
				auth,
				setAuth,
				user,
				setUser,
				session, 
				setSession,
				error,
				setError
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
