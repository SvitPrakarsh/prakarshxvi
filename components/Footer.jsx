import {Container, Divider, IconButton, Link} from "@material-ui/core";
import {Email, Facebook, Instagram, Phone, YouTube} from "@material-ui/icons";

export default function Footer() {
    return (
        <>
            <Divider style={{backgroundColor: "#444"}}/>
            <footer>
                <div id="copyright">All Rights Reserved © Prakarsh XVI</div>
                <div id='links'>
                    <Link href="#" color='inherit'>
                        Terms
                    </Link> <Link href="#" color='inherit'>
                    Privacy
                </Link> <Link href="#" color='inherit'>
                    Refunds
                </Link>
                </div>
                <div id='social'>
                    {/*<IconButton href="https://www.facebook.com/PrakarshTechFest">
                        <Facebook/>
                    </IconButton>*/}
                    <IconButton href="https://www.instagram.com/prakarsh2021/">
                        <Instagram/>
                    </IconButton>
                    <IconButton href="https://www.youtube.com/channel/UCKMMGkIUwMUokSbjgzb9OUw">
                        <YouTube/>
                    </IconButton>
                    <IconButton href="mailto:support@prakarsh.org">
                        <Email/>
                    </IconButton>
                    <IconButton href="telto:+918141153732">
                        <Phone/>
                    </IconButton>
                </div>
            </footer>
        </>
    )
}