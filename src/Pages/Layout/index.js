import React from "react";
import Header from "../../Components/Navbar";
import Footer from "../../Components/Footer";

function Layout({ children }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
