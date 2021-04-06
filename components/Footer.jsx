import { Container, Divider, IconButton, Link } from '@material-ui/core';
import { Email, Facebook, Instagram, Phone, YouTube } from '@material-ui/icons';

export default function Footer() {
	return (
		<>
			<Divider style={{ backgroundColor: '#444' }} />
			<footer>
				<div id="copyright">All Rights Reserved © Prakarsh XVI</div>
				<div id="links">
					<Link
						href="/Terms.pdf"
						color="inherit"
						target="_blank"
						noreferrer={true}
						noopener
					>
						Terms
					</Link>{' '}
					<Link
						href="/Privacy.pdf"
						color="inherit"
						target="_blank"
						noreferrer={true}
						noopener
					>
						Privacy
					</Link>
					<Link
						href="/Refunds.pdf"
						color="inherit"
						target="_blank"
						noreferrer={true}
						noopener
					>
						Refunds
					</Link>
				</div>
				<div id="social">
					{/*<IconButton href="https://www.facebook.com/PrakarshTechFest">
                        <Facebook/>
                    </IconButton>*/}
					<IconButton href="https://www.instagram.com/prakarsh2021/">
						<Instagram />
					</IconButton>
					<IconButton href="https://www.youtube.com/channel/UCKMMGkIUwMUokSbjgzb9OUw">
						<YouTube />
					</IconButton>
					<IconButton href="mailto:support@prakarsh.org">
						<Email />
					</IconButton>
					<IconButton href="tel:+918141153732">
						<Phone />
					</IconButton>
				</div>
			</footer>
		</>
	);
}
