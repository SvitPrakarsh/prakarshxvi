import {Container, Typography} from "@material-ui/core";
import Head from "next/head";

export default function Team() {
    return (<>
            <Head>
                <title>Team | PrakarshXVI</title>
            </Head>
            <Container id='team' maxWidth='xl'>
                <Typography
                    id="title"
                    variant="h2"
                    style={{
                        fontFamily: "'Valorant',sans-serif",
                    }}
                    gutterBottom
                >
                    Coming Soon
                </Typography>
                {/* <Typography
                id="title"
                variant="h2"
                style={{
                    fontFamily: "'Valorant',sans-serif",
                }}
                gutterBottom
            >
                Team
            </Typography>

            <div id='team-card'>
                <div id='picture'></div>
                <h1 id='name'>Akshar Patel</h1>
                <p id='post'>Co-Head</p>
            </div>*/
                }
            </Container></>
    )
}