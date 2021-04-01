import Document, {Html, Head, Main, NextScript} from 'next/document';


class MyDocument extends Document {
	static async getInitialProps(ctx) {
		const initialProps = await Document.getInitialProps(ctx);
		return {...initialProps};
	}

	render() {
		return (
			<Html>
				<Head>
					<script src="/noise.min.js"/>
					<link
						rel="stylesheet"
						href="https://unpkg.com/nprogress@0.2.0/nprogress.css"
					/>
					<link
						rel="shortcut icon"
						href="/prakarsh-logo.svg"
						type="image/png"
					/>
					<link
						rel="preload"
						href="/fonts/Tungsten-Bold.ttf"
						as="font"
						crossOrigin=""
					/>
					<link
						rel="preload"
						href="/fonts/Valorant.ttf"
						as="font"
						crossOrigin=""
					/>
					{' '}
					<link
						rel="preload"
						href="/fonts/OperatorMono.otf"
						as="font"
						crossOrigin=""
					/>
					{/*<title>PrakarshXVI - SVIT, Vasad</title>*/}
				</Head>
				<body>
				<Main/>
				<NextScript/>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
