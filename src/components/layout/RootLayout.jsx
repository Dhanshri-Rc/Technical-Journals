import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton, { RouteScrollReset } from "../common/ScrollToTop";

import ErrorBoundary from "../common/ErrorBoundary";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      
      <RouteScrollReset />
      <Header />
      <main id="main-content" className="flex-1">
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <ScrollToTopButton />
     
    </div>
  );
}
