import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <Sidebar /> {/* Sidebar fixo à esquerda */}
      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Header /> {/* Header ocupa toda a largura no topo */}
        <div style={{ flexGrow: 1, padding: '20px' }}> {/* Área principal do conteúdo */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
