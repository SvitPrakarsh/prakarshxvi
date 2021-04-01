import {
  Accordion,
  AccordionDetails,
  AccordionSummary, Button,
  Container,
  Divider,
  Fade,
  Grid,
  IconButton, Link,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import {Email, Facebook, Instagram, Phone, YouTube} from "@material-ui/icons";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {useContext, useEffect, useState} from "react";
import Background from "../components/Background";
import CategoryCard from "../components/CategoryCard";
import SplashScreen from "../components/SplashScreen";
import Sponsers from "../components/Sponsers";
import Context from "../Context";
import categories from "../data/eventCategories.json";
import faqs from "../data/faqs.json";
import Footer from "../components/Footer";
import Head from "next/head";

const useStyles = makeStyles(() => ({
  actionArea: {
    width: "fit-content",
  },
  heroDesc: {
    fontFamily: '"Operator Mono", monospace',
    fontSize: 24,
    color: "#FF4655",
    fontWeight: 400,
    textAlign: "left",
  },
}));

export default function Home() {
  const classes = useStyles();
  const { error, setError } = useContext(Context);
  const [splash, setSplash] = useState(true);
  const [splashGone, setSplashGone] = useState(false);
  const [nums, setNums] = useState([]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const generator = () => {
    let nums = [];
    let starter = Math.random() * 7;
    nums.push(Math.floor(starter));

    while (nums.length !== 7) {
      nums.push(Math.floor((nums[nums.length - 1] + 36) % 255));
    }
    shuffleArray(nums);
    // console.log(nums)
    setNums(nums);
  };

  useEffect(() => generator(), []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    setSplash(true);
    setTimeout(() => {
      document.body.style.overflow = "auto";
      setSplash(false);
      setSplashGone(true);
    }, [10]);
  }, []);

  // if (splash) return <SplashScreen show={splash} />;
  return (
      <>
        <Head>
          <title>World's Best Tech Fest | PrakarshXVI - SVIT, Vasad</title>
        </Head>
        <div id="hero">
          <Background/>
          <div id="xvi">XVI</div>
          <Fade in={splashGone} timeout={{enter: 3000}}>
            <h1 id="hero-main">
              PRA<i>K</i>ARSH
            </h1>
          </Fade>

          <h5 id="hero-desc">AN IMPULSE TO SOAR.</h5>
        </div>
        <Paper style={{padding: "40px"}}>
          <Container maxWidth="lg">
            <Grid container spacing={5} alignItems="center">
              <Grid item sm>
                <div
                    style={{
                      borderRadius: "10px",
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                    }}
                >
                  <img
                      src="/images/college-image.png"
                      alt=""
                      height="auto"
                      width="100%"
                      style={{objectFit: "contain"}}
                  />
                </div>
              </Grid>
              <Grid item sm>
                <div style={{maxWidth: "36vw", margin: "0 0 25px"}}>
                  <Typography variant="h3" gutterBottom>
                    What is Prakarsh?
                  </Typography>
                  <Divider style={{width: "50%", backgroundColor: "#FF4655"}}/>
                </div>
                <Typography variant="body1">
                  PRAKARSH, a National Level Technical Symposium to bring together
                  the best brains in the country and give them a chance to
                  showcase their skills and talents. This will give a platform for
                  the students to interact and compete with each other. There are
                  non-technical events too to incorporate fun activities alongside
                  the technical fervour.
                </Typography>
              </Grid>
          </Grid>
        </Container>
      </Paper>
      <Container id="events" style={{ padding: "40px" }} maxWidth="lg">
        <div style={{ maxWidth: "36vw", margin: "0 auto 50px" }}>
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            style={{ fontFamily: '"Valorant",sans-serif' }}
          >
            Events
          </Typography>
          <Divider style={{ backgroundColor: "#FF4655" }} />
        </div>
        <Grid container spacing={2} justify="center" alignItems="center">
          {categories.map((category, key) => {
            console.log(nums[key]);
            return (
              <Grid
                item
                sm
                md={4}
                lg={3}
                key={key}
                justify="center"
                alignItems="center"
              >
                <CategoryCard category={category} color={nums[key]} key={key} />
              </Grid>
            );
          })}
        </Grid>
      </Container>
      <Paper style={{ padding: "30px 20px" }}>
        <Container>
          <div style={{ maxWidth: "36vw", margin: "0 auto 50px" }}>
            <Typography
              variant="h4"
              fontWeight={400}
              align="center"
              gutterBottom
              style={{ fontFamily: '"Valorant",sans-serif' }}
            >
              SPONSORS
            </Typography>
            <Divider />
          </div>
          <Sponsers />
          <br />
          <br />
        </Container>
      </Paper>
      <Container maxWidth="md" style={{ padding: "40px" }}>
        <Typography variant="h3" align="center" gutterBottom>
          FAQ
        </Typography>
        {faqs.map((q) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              id="panel1a-header"
            >
              <Typography variant='h6' style={{fontSize: '18px'}}>{q.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant='body1' color='textSecondary'>{q.answer}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
      <Paper style={{ padding: "40px 0" }}>
        <Container maxWidth="md">
          <Typography variant="h3" align="center" gutterBottom>
            SUPPORT
          </Typography>
          <form onSubmit={(e) => {
            e.preventDefault()
            console.log(e)
          }}>

            <Grid container spacing={3} justify='center'>
              <Grid item xs="12" sm="6" xl='4' style={{textAlign: 'center'}}>
                <iframe
                    src="https://discord.com/widget?id=827025974603284490&theme=dark"
                    // width="350"
                    height="280"
                    allowTransparency="true"
                    frameBorder="0"
                    sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
                    style={{margin: 'auto'}}
                />
                {/* <Typography gutterBottom>*Discord Widget Here*</Typography> */}
              </Grid>
              <Grid container item xs="12" sm="6" xl='4' spacing='1' justify='center'>
                <Grid item xs="12">
                  <TextField
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                  />
                </Grid>
                <Grid item xs="6">
                  <TextField
                      label="Phone"
                      variant="outlined"
                      fullWidth
                  />
                </Grid>
                <Grid item xs="6">
                  <TextField
                      label="Email"
                      variant="outlined"
                      fullWidth
                  />
                </Grid>
                <Grid item xs="12">
                  <TextField
                      multiline
                      label="Message"
                      variant="outlined"
                      rows="5"
                      fullWidth
                  />
                </Grid>
                <Grid item xs="12">
                  <Button variant='contained' color='primary' size='large' style={{margin: '0 auto'}}
                          type='submit' fullWidth>Submit</Button>
                </Grid>


              </Grid>
            </Grid>
          </form>
          <br/>
          <br/>
        </Container>
        <Container maxWidth="xl">
          <Footer/>

        </Container>
      </Paper>
    </>
  );
  // </Container>
}

// export const getServerSideProps = async ({ req }) => {
// 	const session = await getSession({ req });
// 	let user;
// 	console.log(session)
// 	if (session) {
// 		user = await axios({
// 			method: 'post',
// 			url: `${baseUrl}/participants`,
// 			data: {
// 				'email': session.user.email
// 			},
// 			headers: {
// 				'Authorization': `Bearer ${session.jwt}`
// 			}
// 		});
// 	}
// 	return {
// 		props: {
// 			name: "Ayaan",
// 			session,
// 			user
// 		}
// 	}
// };
