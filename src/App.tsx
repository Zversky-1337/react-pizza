import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Modal from "./pages/Modal";
import Cart from "./pages/Cart";
import Promo from "./pages/Promo";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const state = location.state;
  const backgroundLocation = state?.background || null;

  const isModal = location.pathname.startsWith("/modal/");

  return (
    <div>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes location={backgroundLocation || location}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/promo" element={<Promo />} />
            <Route path="*" element={<NotFound />} />
          </Routes>

          {(backgroundLocation || isModal) && (
            <>
              {!backgroundLocation && <Home />}

              <Routes>
                <Route path="/modal/:id" element={<Modal />} />
              </Routes>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
