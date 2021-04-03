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
import Context from "../Context";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { dashify } from "../helpers/utils";
import Head from "next/head";
import Bugsnag from "../lib/bugsnag";
import React from "react";

const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

const baseUrl = "https://prakarshxvi-api.herokuapp.com";

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
}));

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

  const totalAmount =
    cart?.reduce((acc, curr) => {
      return curr["details"][2].sectionContent + acc;
    }, 0) || 0;

  async function displayRazorpay() {
    try {
      const eventOrder = cart.map((e) => e.event_id);
      setLoading(true);
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }
      const result = await axios.post(
        `${baseUrl}/payment/orders`,
        {
          events: eventOrder,
        },
        {
          headers: {
            Authorization: "Bearer " + session.jwt,
          },
        }
      );

      if (!result) {
        alert("Server error. Are you online?");
        setLoading(false);
        // return;
      }

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: "rzp_live_kz5CWBWE92g5VF",
        amount: amount.toString(),
        currency: currency,
        name: "Prakarsh XVI",
        description: "Prakarsh XVI",
        // image: { logo },
        order_id: order_id,
        notes: {
          events: JSON.stringify(eventOrder),
        },
        handler: async function (response) {
          console.log(response);
          const data = {
            amount: amount,
            user: user,
            events: cart,
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          };
          try {
            const myEventsNew = cart.map((obj) => {
              return {
                event_name: obj.eventName,
                category_name: obj.category_name,
              };
            });
            const result = await axios.post(
              `${baseUrl}/payment/success`,
              data,
              {
                headers: {
                  Authorization: "Bearer " + session.jwt,
                },
              }
            );
            setCart(null, false, true);

            if (myEvents) {
              setmyEvents([...myEvents, ...myEventsNew]);
            } else {
              setmyEvents([...myEventsNew]);
            }
            setLoading(false);
            setSuccess("Transaction completed! Check your email for reciept!");
          } catch (e) {
            console.log(e);
            Bugsnag.notify(e);
            setError(
              "Error while processing request. Please contact support!!"
            );
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: user.full_name,
          email: user.email,
          contact: user.number,
        },
        theme: {
          color: "#61dafb",
        },
        modal: {
          ondismiss: function () {
            console.log("Modal Closed!!");
            setLoading(false);
            setError("Payment Cancelled!!");
          },
          confirm_close: true,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (e) {
      Bugsnag.notify(e);
      setError("Error while fetching data!!");
      setLoading(false);
      return;
    }
  }

  return (
    <>
      <Head>
        <title>Dashboard | PrakarshXVI - SVIT, Vasad</title>
      </Head>
      <ErrorBoundary>
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress size={28} color="secondary" />
            </div>
          ) : (
            <Grid container justify="space-between" spacing={4}>
              <Grid item xs={12} md={myEvents?.length > 0 ? 8 : 12}>
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
                    // disabled
                    onClick={() => {
                      if (user && cart?.length > 0) displayRazorpay();
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
                  {cart?.length > 0 ? (
                    cart.map((event, index) => (
                      <ListItem key={index}>
                        <ListItemAvatar>
                          <Avatar
                            src={`/images/${dashify(
                              event.category_name
                            )}/${dashify(event.eventName)}.png`}
                            style={{ backgroundColor: "#0593ea" }}
                          />
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
                          {/* <IconButton edge="start" aria-label="delete">
                          <Info />
                        </IconButton> */}
                          <span>₹ {event["details"][2].sectionContent}</span>
                        </ListItemSecondaryAction>
                      </ListItem>
                    ))
                  ) : (
                    <div style={{ textAlign: "center" }}>
                      <img
                        src="/empty-cart.svg"
                        height="250"
                        width="auto"
                        alt=""
                        style={{ margin: "20px auto" }}
                      />
                      <h2>Cart is Empty</h2>
                    </div>
                  )}
                </List>
              </Grid>
              {myEvents?.length > 0 ? (
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
                    {myEvents.map((event, index) => {
                      {
                        console.log(event);
                      }

                      return (
                        <ListItem key={index}>
                          <ListItemAvatar>
                            <Avatar
                              src={`/images/${dashify(
                                event.category_name
                              )}/${dashify(event.event_name)}.png`}
                              style={{ backgroundColor: "#FF4655" }}
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary={event.event_name}
                            secondary={event.category_name}
                          />
                          {/* <ListItemSecondaryAction>
                          <span>₹ 50</span>
                        </ListItemSecondaryAction> */}
                        </ListItem>
                      );
                    })}
                  </List>
                </Grid>
              ) : (
                ""
              )}
            </Grid>
          )}
        </Container>
      </ErrorBoundary>
    </>
  );
}
