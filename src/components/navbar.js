import Link from "next/link";
import navSty from "./nav.module.css";
const NavBar = () => {
  return (
    <header>
      <ul className={navSty.list}>
        <li className={navSty.listItem}>
          <Link href="/">
            <a className={navSty.btn}> Home </a>
          </Link>
        </li>
        <li className={navSty.listItem}>
          <Link href="/deploy">
            <a className={navSty.btn}> Deploy </a>
          </Link>
        </li>
        <li className={navSty.listItem}>
          <Link href="/whitelist">
            <a className={navSty.btn}> Join whitelist </a>
          </Link>
        </li>

        <li className={navSty.listItem}>
          <Link href="/nftmint">
            <a className={navSty.btn}> NFT Mint </a>
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default NavBar;
