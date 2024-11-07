import Header from "../Header";
import Sidebar from "../Sidebar";

function SidebarLayout({ children }) {
  return (
    <div
      className="App"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <div style={{ flex: 1 }}>{children}</div>
      </div>
    </div>
  );
}
export default SidebarLayout;
