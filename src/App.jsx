import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LyriumProvider } from "./context/LyriumContext";
import Home from "./pages/Home";
import Resumo from "./pages/Resumo";
import Alimentacao from "./pages/Alimentacao";
import Sono from "./pages/Sono";
import Passos from "./pages/Passos";
import Exercicio from "./pages/Exercicio";
import Avatar from "./pages/Avatar";
import Loja from "./pages/Loja";
import Dash from "./pages/Dash";
import Dicas from "./pages/Dicas";
import Roupas from "./pages/Roupas";
import Personalidades from "./pages/Personalidades";
import Tags from "./pages/Tags";
import Lgpd from "./pages/Lgpd"
import Sincronizacao from "./pages/Sincronizacao"

function App() {
  return (
    <LyriumProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/resumo" element={<Resumo />} />
        <Route path="/resumo/alimentacao" element={<Alimentacao />} />
        <Route path="/resumo/sono" element={<Sono />} />
        <Route path="/resumo/passos" element={<Passos />} />
        <Route path="/resumo/exercicio" element={<Exercicio />} />
        <Route path="/avatar" element={<Avatar />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/resumo/dash" element={<Dash />} />
        <Route path="/resumo/dicas" element={<Dicas />} />
        <Route path="/loja/roupas" element={<Roupas />} />
        <Route path="/loja/personalidades" element={<Personalidades />} />
        <Route path="/loja/tags" element={<Tags />} />
        <Route path="/lgpd" element={<Lgpd />} />
        <Route path="/sincronizacao" element={<Sincronizacao />} />
      </Routes>
    </Router>
    </LyriumProvider>
  );
}

export default App;