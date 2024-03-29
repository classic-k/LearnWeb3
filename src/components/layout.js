import Navbar from "./navbar";
import Head from "next/head";
import Script from "next/script";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{`${title} || DAO Reloaded`}</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer className="footer">Made with &#10084; by Crypto Devs Kamal</footer>
    </>
  );
}
