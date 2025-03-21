import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function SideMenu() {
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState("/");

  useEffect(() => {
    const pathName = location.pathname;
    setSelectedKeys(pathName);
  }, [location.pathname]);

  const navigate = useNavigate();
  return (
    <Menu
      style={{ width: "30%", height: "100vh" }}
      onClick={(item) => {
        //item.key
        navigate(item.key);
      }}
      selectedKeys={[selectedKeys]}
      items={[
        {
          label: "Dashboard",
          icon: <AppstoreOutlined />,
          key: "/dashboard",
        },
        {
          label: "Inventory",
          key: "/inventory",
          icon: <ShopOutlined />,
        },

        {
          label: "Upload",
          key: "/upload_product",
          icon: <ShopOutlined />,
        },
        {
          label: "Orders",
          key: "/orders",
          icon: <ShoppingCartOutlined />,
        },
        {
          label: "Customers",
          key: "/customers",
          icon: <UserOutlined />,
        },
      ]}
    ></Menu>
  );
}
export default SideMenu;
