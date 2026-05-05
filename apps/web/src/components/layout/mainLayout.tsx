import Sidebar from "./sidebar";
import Header from "./header";

export default function MainLayout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <Header />
        <div style={{ padding: "20px" }}>{children}</div>
      </div>
    </div>
  );
}