import { Link } from "react-router-dom";
import "./nav.css";
const NavBar = () => {
  return (
    <>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="/" className="btn">
            Home
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/deploy" className="btn">
            Deploy
          </Link>
        </li>
        <li className="list-group-item">
          <Link to="/whitelist" className="btn">
            Join Whitelist
          </Link>
        </li>

        <li className="list-group-item">
          <Link to="/nfts" className="btn">
            NFT Mint
          </Link>
        </li>
      </ul>
    </>
  );
};

export default NavBar;
