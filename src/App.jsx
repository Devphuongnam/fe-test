import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
  HashRouter,
} from "react-router-dom";
import { Frame, Navigation, Page } from "@shopify/polaris";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Settings from "./components/Settings";
import { HomeIcon, OrderIcon, ProductIcon } from "@shopify/polaris-icons";

function App() {
  return (
    <Router>
      <Frame>
        <Page fullWidth>
          <div style={{ display: "flex", height: "100vh" }}>
            <CustomNavigation />

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

function CustomNavigation() {
  const location = useLocation();

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            url: "dashboard",
            label: "Dashboard",
            icon: HomeIcon,
            selected: location.pathname === "/dashboard",
          },
          {
            url: "products",
            label: "Products",
            icon: OrderIcon,
            selected: location.pathname === "/products",
          },
          {
            url: "settings",
            label: "Settings",
            icon: ProductIcon,
            selected: location.pathname === "/settings",
          },
        ]}
      />
    </Navigation>
  );
}

export default App;
