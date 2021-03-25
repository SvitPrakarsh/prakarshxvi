import { createContext, useState } from 'react';
import useAuth from './helpers/useAuth';

// Context
const Context = createContext();
export default Context;

// Provider
export const Provider = (props) => {
	const [drawer, setDrawer] = useState(false);
	const [auth, setAuth] = useState(false);
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [event, setEvent] = useState(null);
	const [cart, setCartR] = useState(null);


	const setCart = (event) => {
		if(cart.includes(event)){
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
				auth,
				setAuth,
				event,
				setEvent,
				user,
				setUser,
				session,
				setSession,
				cart,
				setCart
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
