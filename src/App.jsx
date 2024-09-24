import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  Navigate,
} from "react-router-dom";
import { Frame, Navigation, Page } from "@shopify/polaris";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Settings from "./components/Settings";

function App() {
  return (
    <Router>
      <Frame>
        <Page>
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Navigation */}
            <Navigation
              location="/"
              style={{
                paddingLeft: "10px",
                display: "flex",
                flexDirection: "column",
                height: "100vh",
              }}
            >
              <div style={{ display: "contents" }}>
                <Link
                  to="/dashboard"
                  style={{ textDecoration: "none", padding: "10px 0" }}
                >
                  Dashboard
                </Link>
                <Link
                  to="/products"
                  style={{ textDecoration: "none", padding: "10px 0" }}
                >
                  Products
                </Link>
              </div>
              <div style={{ marginTop: "auto" }}>
                <Link
                  to="/settings"
                  style={{ textDecoration: "none", padding: "10px 0" }}
                >
                  Settings
                </Link>
              </div>
            </Navigation>

            {/* Content */}
            <div style={{ marginLeft: "20px", flex: 1 }}>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/products" element={<Products />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </Page>
      </Frame>
    </Router>
  );
}

export default App;
