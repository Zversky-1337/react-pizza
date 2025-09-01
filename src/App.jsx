import "./scss/app.scss";
import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Modal from "./pages/Modal";
import Cart from "./pages/Cart";
import Promo from "./pages/Promo";
import {Route, Routes, useParams} from "react-router-dom";

function App() {
  const params = useParams();

  return (
    <div>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/promo" element={<Promo />} />
          </Routes>
          {params?.id && (
            <Routes>
              <Route path="/modal/:id" element={<Modal id={params?.id} />} />
            </Routes>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
