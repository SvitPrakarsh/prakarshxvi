import { createContext, useState, useEffect } from "react";
import useAuth from "./helpers/useAuth";

// Context
const Context = createContext();
export default Context;

// Provider
export const Provider = (props) => {
  const [drawer, setDrawer] = useState(false);
  const [event, setEvent] = useState(null);
  const auth = useAuth();

  const [cart, setCartR] = useState(null);

  useEffect(() => {
    console.log("Cart is:");
    if (cart) console.log(cart);
  }, [cart]);

  const setCart = (event, remove = false, removeAll = false) => {
    const myEvents = auth.myEvents;

    if (removeAll) {
      setCartR(null);
      return null;
    }

    if (!auth.user) {
      auth.setError("Please Login first!!");
      return null;
    }

    if (remove) {
      let cartN = cart.filter((e) => e != event);
      setCartR(cartN);
      return cartN;
    }

    if (myEvents == null) {
      auth.setError("Try again after some time!!");
      return null;
    }

    if (
      myEvents.some(({ event_name, category_name }) => {
        return (
          event_name == event.eventName && category_name == event.category_name
        );
      })
    ) {
      auth.setError("Already registered for the event!");
      return null;
    }

    if (
      cart?.some(
        ({ eventName, category_name }) =>
          eventName == event.eventName && category_name == event.category_name
      )
    ) {
      auth.setError("Event already in cart!");
      return null;
    }

    if (cart) {
      let cartN = [].concat(...cart);
      cartN = cartN.concat(event);
      setCartR(cartN);
    } else setCartR([event]);
    auth.setSuccess("Event added in cart!");
    return event;
  };

  return (
    <Context.Provider
      value={{
        drawer,
        setDrawer,
        event,
        setEvent,
        cart,
        setCart,
        ...auth,
      }}
    >
      {props.children}
    </Context.Provider>
  );
};
