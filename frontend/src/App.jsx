import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
//Páginas
import Home from "./pages/Home";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import Cliente from "./pages/Cliente";
import Ajuda from "./pages/Ajuda";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="*" element={<NotFound />}></Route>
          <Route path="/" element={<Index />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/ajuda" element={<Ajuda />}></Route>
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="/admin/cliente/:idCliente" Component={Cliente}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
