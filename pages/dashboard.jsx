import {
  Avatar,
  Button,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

import DeleteIcon from "@material-ui/icons/Delete";
import { cloneElement } from "react";
import { Info } from "@material-ui/icons";
import Context from "../Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
  // checkout: {
  // 	backgroundColor: theme.palette.background.paper,
  // 	color: '#fff',
  // },
}));

function generate(element) {
  return [0, 1, 2].map((value) =>
    cloneElement(element, {
      key: value,
    })
  );
}

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export default function Dashboard() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const {
    cart,
    setCart,
    session,
    setSuccess,
    setError,
    user,
    myEvents,
    setmyEvents,
  } = useContext(Context);
  const totalAmount = cart?.length * 50 || 0;

  async function displayRazorpay() {
    setLoading(true);
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    console.log("Amount: " + totalAmount);
    const result = await axios.post(
      "http://localhost:1337/payment/orders",
      {
        amount: totalAmount * 100,
      },
      {
        headers: {
          Authorization: "Bearer " + session.jwt,
        },
      }
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }

    const { amount, id: order_id, currency } = result.data;

    const options = {
      key: "rzp_test_2dXDY8rEMwXGvD",
      amount: amount.toString(),
      currency: currency,
      name: "Prakarsh XVI",
      description: "Test Transaction",
      // image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          events: cart,
          user: {
            name: user.full_name,
            id: user._id,
            email: user.email,
          },
          amount: amount,
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };
        try {
          const result = await axios.post(
            "http://localhost:1337/payment/success",
            data,
            {
              headers: {
                Authorization: "Bearer " + session.jwt,
              },
            }
          );
          console.log(result.data);
          setSuccess("Transaction completed!");
          const myEventsNew = cart.map((obj) => {
            return {
              event_name: obj.eventName,
              category_name: obj.category_name,
            };
          });

          if (myEvents) {
            setmyEvents([...myEventsNew]);
            setCart(null, false, true);
          } else {
            setmyEvents([...myEvents, ...myEventsNew]);
            setCart(null, false, true);
          }
          setLoading(false);
        } catch (e) {
          setError("Error while processing request please contact support!!");
        }
      },
      prefill: {
        name: user.full_name,
        email: user.email,
        contact: user.number,
      },
      notes: {
        events: cart,
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    console.log("Cart is:");
    if (cart) console.log(cart);
  }, [cart]);

  return (
    <Container maxWidth="lg" id="dashboard">
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        style={{
          marginTop: 20,
          fontFamily: "'Valorant',sans-serif",
          fontWeight: 400,
        }}
      >
        Dashboard
      </Typography>

      {loading ? (
        <CircularProgress size={28} color="secondary" />
      ) : (
        <Grid container justify="space-between" alignItems="center" spacing={4}>
          <Grid item xs={12} md={8}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: 10 }}
            >
              <Typography variant="h5" gutterBottom>
                Cart
              </Typography>
              <Button
                variant="outlined"
                className={classes.checkout}
                size="large"
                onClick={() => {
                  if (user && cart) displayRazorpay();
                  else {
                    if (!user) setError("Please login to continue!!");
                    else setError("Cart is empty!");
                  }
                }}
              >
                Checkout&nbsp;<b>₹ {totalAmount}</b>
              </Button>
            </Grid>
            <Divider />
            <List>
              {cart
                ? cart.map((event, index) => (
                    <ListItem key={index}>
                      <ListItemAvatar>
                        <Avatar
                          src="/images/workshops.png"
                          style={{ backgroundColor: "#0593ea" }}
                        >
                          {/*<FolderIcon/>*/}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.eventName}
                        secondary={event.category_name}
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="start"
                          aria-label="delete"
                          onClick={() => setCart(event, true)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton edge="start" aria-label="delete">
                          <Info />
                        </IconButton>
                        <span>₹ 50</span>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : ""}
            </List>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
              style={{ padding: 10 }}
            >
              <Typography variant="h5" gutterBottom>
                My Events
              </Typography>
            </Grid>
            <Divider />
            <List>
              {myEvents
                ? myEvents.map((event) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar
                          src="/images/workshops.png"
                          style={{ backgroundColor: "#0593ea" }}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={event.event_name}
                        secondary={event.category_name}
                      />
                      <ListItemSecondaryAction>
                        <span>₹ 50</span>
                        {/* <IconButton edge="end" aria-label="delete">
                        <Info />
                      </IconButton> */}
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                : ""}
            </List>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
