import Document, { Html, Head, Main, NextScript } from 'next/document';
// import Footer from '../components/Footer';

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
          {/* <Footer /> */}
        </body>
      </Html>
    );
  }
}
