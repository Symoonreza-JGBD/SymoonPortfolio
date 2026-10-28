import { Link, Route, Routes } from "react-router";
import { Header, Footer, RouteEffects } from "./components/Layout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Resume from "./components/Resume.jsx";

function NotFound() {
  return (
    <main id="main" className="container not-found" tabIndex="-1">
      <p className="eyebrow mono">404 / ROUTE NOT FOUND</p>
      <h1>This check found a missing page.</h1>
      <p>
        The link may be incorrect. The quality dashboard is still right here.
      </p>
      <Link className="button button-primary" to="/">
        Back to dashboard
      </Link>
    </main>
  );
}

export default function App() {
  return (
    <>
      <RouteEffects />
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
