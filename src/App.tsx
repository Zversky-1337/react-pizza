import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Modal from "./pages/Modal";
import Cart from "./pages/Cart";
import Promo from "./pages/Promo";
import { Routes, Route, useLocation } from "react-router-dom";
import { createContext, useState } from "react";

export const SearchContext = createContext("");

function App() {
  const location = useLocation();
  const state = location.state;
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <div className="wrapper">
          <Header />
          <div className="content">
            <Routes location={state?.background || location}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
              <Route path="/promo" element={<Promo />} />
            </Routes>

            {state?.background && (
              <Routes>
                <Route path="/modal" element={<Modal />} />
              </Routes>
            )}
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
