import Home from "./pages/home";
import Deploy from "./pages/deploy";
import NFTMint from "./nftmint/pages/home";
import NavBar from "./pages/components/navbar";
import Whitelist from "./whitelist/pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/deploy" element={<Deploy />} />
          <Route path="/nfts" element={<NFTMint />} />
          <Route path="/whitelist" element={<Whitelist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
