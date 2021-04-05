import {Container, Typography} from "@material-ui/core";
import Head from "next/head";
import teamsData from "../data/teams.json"

export default function Team() {
    return (<>
            <Head>
                <title>Team | PrakarshXVI</title>
            </Head>
            <Container id='team' maxWidth='xl'>
                {/* <Typography
                    id="title"
                    variant="h2"
                    style={{
                        fontFamily: "'Valorant',sans-serif",
                    }}
                    gutterBottom
                >
                    Coming Soon
                </Typography>*/}
                <Typography
                    id="title"
                    variant="h2"
                    style={{
                        fontFamily: "'Valorant',sans-serif",
                    }}
                    gutterBottom
                >
                    Team
                </Typography>

                {Object.entries(teamsData).map((team, teamId) =>

                    (<>
                            <Typography id='team-name' variant='h4' align='center'>{team[0]}</Typography>
                            <div key={teamId} id='team-container'>
                                {team[1].members.map((member, memberId) => (
                                    <div id='team-card' key={memberId}>
                                        <div id='picture'>
                                            <img src={member.imageUrl} alt=""/>
                                        </div>
                                        <h1 id='name'>{member.name}</h1>
                                        <p id='post'>{member.post}</p>
                                    </div>
                                ))}
                            </div>
                        </>
                    )
                )}

            </Container></>
    )
}