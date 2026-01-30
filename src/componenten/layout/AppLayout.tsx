import { Outlet, Link } from "react-router-dom";
import { CSSProperties } from "react";
import logo from "../../assets/ASRR_light.png";

export default function AppLayout() {
  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <img src={logo} alt="ASRR Logo" style={styles.logo} />
        </div>
      </header>

      <div style={styles.body}>
        <aside style={styles.sidebar}>
          <nav style={styles.nav}>
            <Link to="/" style={styles.link}>
              Home
            </Link>
            <Link to="/contact" style={styles.link}>
              Contact
            </Link>
          </nav>
        </aside>

        <main style={styles.main}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

const styles: Record<string, CSSProperties> = {
  app: {
    minHeight: "100vh",
    backgroundColor: "#0b1220",
    color: "#e5e7eb",
  },
  header: {
    padding: "12px 20px",
    borderBottom: "1px solid #1f2933",
    height: "80px",
    display: "flex",
    alignItems: "center",
  },
  headerContent: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    height: "50px",
    width: "auto",
  },
  body: {
    display: "flex",
    height: "calc(100vh - 80px)",
  },
  sidebar: {
    width: "150px",
    padding: "16px",
    borderRight: "1px solid #1f2933",
  },
  nav: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  main: {
    flex: 1,
    padding: "24px",
  },
  link: {
    color: "#e5e7eb",
    textDecoration: "none",
    fontSize: "16px",
    padding: "8px 12px",
    borderRadius: "4px",
  },
};
