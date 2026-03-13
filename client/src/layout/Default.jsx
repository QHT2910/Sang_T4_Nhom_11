import { Outlet } from "react-router-dom";
import Header from "../components/common/Header.jsx";
import Footer from "../components/common/Footer.jsx";

function Default() {
  return (
    <div className="default-layout">
      <Header />
      <main className="main-content">

        <Outlet />

      </main>
      <Footer />
    </div>
  );
}

export default Default;
