import { createContext, useState } from 'react';

// Context
const Context = createContext();
export default Context;

// Provider
export const Provider = (props) => {
	const [drawer, setDrawer] = useState(false);
	const [auth, setAuth] = useState(false);
	const [cart, setCart] = useState({});

	return (
		<Context.Provider
			value={{
				drawer,
				setDrawer,
				auth,
				setAuth,
				cart,
				setCart,
			}}
		>
			{props.children}
		</Context.Provider>
	);
};
