import Navbar from "./navbar";
import Head from "next/head";
import Script from "next/script";

export default function Layout({ children, title }) {
  return (
    <>
      <Head>
        <title>{`${title} || DAO Reloaded`}</title>
        <Script
          src="https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"
          onLoad={() => {
            window.W3 = new window.web3(window.ethereum);
          }}
        ></Script>
      </Head>
      <Navbar />
      <main>{children}</main>
      <footer className="footer">Made with &#10084; by Crypto Devs</footer>
    </>
  );
}
