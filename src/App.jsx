import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Frame, Navigation, Page } from "@shopify/polaris";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Settings from "./components/Settings";
import { HomeIcon, OrderIcon, ProductIcon } from "@shopify/polaris-icons";

function App() {
  return (
    <Router basename="/fe-test">
      {" "}
      {/* Thêm basename để hỗ trợ đúng trên GitHub Pages */}
      <Frame>
        <Page fullWidth>
          <div style={{ display: "flex", height: "100vh" }}>
            {/* Navigation */}
            <CustomNavigation />

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

function CustomNavigation() {
  const location = useLocation(); // Lấy đường dẫn hiện tại từ react-router-dom

  return (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            url: "/dashboard", // Cần phải giữ đường dẫn theo basename
            label: "Dashboard",
            icon: HomeIcon,
            selected: location.pathname === "/dashboard", // Kiểm tra nếu đường dẫn là /dashboard thì đánh dấu selected
          },
          {
            url: "/products",
            label: "Product",
            icon: OrderIcon,
            selected: location.pathname === "/products", // Kiểm tra nếu đường dẫn là /products thì đánh dấu selected
          },
          {
            url: "/settings",
            label: "Setting",
            icon: ProductIcon,
            selected: location.pathname === "/settings", // Kiểm tra nếu đường dẫn là /settings thì đánh dấu selected
          },
        ]}
      />
    </Navigation>
  );
}

export default App;
