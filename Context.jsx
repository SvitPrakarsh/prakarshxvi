import { createContext, useState } from 'react';

import useAuth from './helpers/useAuth';

// Context
const Context = createContext();
export default Context;

// Provider
export const Provider = (props) => {
	const [drawer, setDrawer] = useState(false);
	const [event, setEvent] = useState(null);
	// const [auth, setAuth] = useState(false);
	// const [session, setSession] = useState(null);
	// const [user, setUser] = useState(null);
	// const [error, setError] = useState(null);

	const auth = useAuth();

	const [cart, setCartR] = useState(null);
	const setCart = (event) => {
		if (cart.includes(event)) {
			return null;
		}
		setCartR({...cart, event})
		return {...cart, event}
	}

	return (
		<Context.Provider
			value={{
				drawer,
				setDrawer,
				event,
				setEvent,
				cart,
				setCart,
				/*auth,
				setAuth,
				user,
				setUser,
				session,
				setSession,
				error,
				setError*/
				...auth
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
