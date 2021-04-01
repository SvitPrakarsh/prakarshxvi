import {Container, Typography} from "@material-ui/core";

export default function Team() {
    return (
        <Container id='team' maxWidth='xl'>

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

            <div id='team-card'>
                <div id='picture'></div>
                <h1 id='name'>Akshar Patel</h1>
                <p id='post'>Co-Head</p>
            </div>
        </Container>
    )
}