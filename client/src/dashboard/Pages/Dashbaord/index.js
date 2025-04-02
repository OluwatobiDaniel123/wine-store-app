import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleDollarSign,
  Users,
  User,
  LogOut,
  Heart,
  TrendingUp,
  Calendar,
  Home,
  PieChart,
  Settings,
  Mail,
  Menu,
  X,
  ChartBar,
  BarChart,
  ShoppingBag,
  ShoppingCart,
  ShoppingCartIcon,
  ShoppingBasket,
  Upload,
} from "lucide-react";

import {
  PieChart as ReChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
} from "recharts";
import { getCustomers, getInventory, getOrders } from "../../API/index";

const CustomCard = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const CustomCardHeader = ({ children, className = "" }) => (
  <div className={`p-4 border-b border-gray-100 ${className}`}>{children}</div>
);

const CustomCardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold text-gray-900 ${className}`}>
    {children}
  </h3>
);

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative z-50">
      <div
        className={`h-screen bg-gray-900 text-white p-2 flex flex-col transition-all duration-300 fixed left-0 top-0 ${
          isOpen ? "w-72" : "w-14"
        } z-50`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded bg-gray-800 hover:bg-gray-700 mb-4 focus:outline-none self-end"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <nav className="">
          <Link
            to="/admin-dashboard"
            className="flex items-center space-x-3 p-4 rounded hover:bg-gray-700"
          >
            <Home size={24} />
            {isOpen && <span>Dashboard</span>}
          </Link>
          <Link
            to="/customers"
            className="flex items-center space-x-3 p-4 rounded hover:bg-gray-700"
          >
            <Users size={24} />
            {isOpen && <span>Customers</span>}
          </Link>{" "}
          <Link
            to="/upload_products"
            className="flex items-center space-x-3 p-4 rounded hover:bg-gray-700"
          >
            <Upload size={24} />
            {isOpen && <span>Upload products</span>}
          </Link>{" "}
          <Link
            to="/orders"
            className="flex items-center space-x-3 p-4 rounded hover:bg-gray-700"
          >
            <ShoppingCart size={24} />
            {isOpen && <span>Orders</span>}
          </Link>{" "}
          <Link
            to="/inventory"
            className="flex items-center space-x-3 p-4 rounded hover:bg-gray-700"
          >
            <ShoppingBag size={24} />
            {isOpen && <span>Inventory</span>}
          </Link>
          <Link
            to="/settings"
            className="flex items-center space-x-3 p-4 rounded hover:bg-gray-700"
          >
            <Settings size={24} />
            {isOpen && <span>Settings</span>}
          </Link>
          <Link
            to="/admin-login"
            className="flex items-center space-x-3 p-4 rounded hover:bg-red-700"
          >
            <LogOut size={24} />
            {isOpen && <span>Logout</span>}
          </Link>
        </nav>
      </div>

      <div className="p-1 ml-14">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold text-gray-900 hidden md:block ">
            ChrisAphaWine Dashboard
          </h1>
          <div className="text-sm text-gray-500">Last updated: Just now</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-md:grid-cols-2 lg:grid-cols-4 gap-1 mb-6">
          <StatCard
            title="Total Revenue"
            value="$245,678"
            icon={CircleDollarSign}
            description="Total revenue this year"
            trend="+12.3% from last month"
          />
          <StatCard
            title="Customers"
            value="1,234"
            // value={customersData.length}
            icon={Users}
            description="Regular monthly customers"
            trend="+5.8% from last month"
          />
          <StatCard
            title="Orders"
            value="45,678"
            // value={orderData.length}
            icon={ShoppingCart}
            description="Orders this year"
            trend="+15.2% from last month"
          />
          <StatCard
            title="Inventory"
            value="94%"
            // value={inventoryData.length}
            icon={ShoppingBasket}
            description="Inventory completion rate"
            trend="+2.1% from last month"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
          <DonationDistribution />
          <MonthlyTrend />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <RecentDonations />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
}
const StatCard = ({ title, value, icon: Icon, description, trend }) => (
  <CustomCard className="h-full">
    <div className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <Icon className="h-4 w-4 text-gray-500" />
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
      {trend && (
        <div className="flex items-center mt-2">
          <TrendingUp className="h-3 w-3 text-green-500 mr-1" />
          <span className="text-xs text-green-500">{trend}</span>
        </div>
      )}
    </div>
  </CustomCard>
);

const DonationDistribution = () => {
  const data = [
    { name: "Liquors", value: 35 },
    { name: "Vodka", value: 25 },
    { name: "Wines", value: 20 },
    { name: "Whisky", value: 20 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const colorIndex = data ? data.name : 0;
      return (
        <div className="bg-white p-4 shadow-lg rounded-lg border border-gray-200">
          <p
            className="font-semibold"
            style={{ color: COLORS[data ? data.index : 0] }}
          >
            {data.name}
          </p>
          <p className="text-gray-600">{data.value}% of donations</p>
        </div>
      );
    }
    return null;
  };

  return (
    <CustomCard className="h-full">
      <CustomCardHeader>
        <CustomCardTitle>Sales Distribution</CustomCardTitle>
      </CustomCardHeader>
      <div className="p-4 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ReChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={90}
              paddingAngle={1}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[index]}
                  stroke="white"
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />
          </ReChart>
        </ResponsiveContainer>
      </div>
    </CustomCard>
  );
};

const MonthlyTrend = () => {
  const data = [
    { name: "Jan", amount: 150000 },
    { name: "Feb", amount: 18000 },
    { name: "Mar", amount: 240000 },
    { name: "Apr", amount: 21000 },
    { name: "May", amount: 304000 },
    { name: "Jun", amount: 28000 },
  ];

  return (
    <CustomCard className="h-full">
      <CustomCardHeader>
        <CustomCardTitle>Monthly Sales Trend</CustomCardTitle>
      </CustomCardHeader>
      <div className="p-2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </CustomCard>
  );
};

const RecentDonations = () => (
  <CustomCard className="h-full">
    <CustomCardHeader>
      <CustomCardTitle>Recent Sales</CustomCardTitle>
    </CustomCardHeader>
    <div className="p-4">
      <div className="space-y-4">
        {[
          {
            name: "Anonymous",
            amount: " ₦500",
            date: "2 hours ago",
            cause: "Hennessy",
          },
          {
            name: "Sarah Wilson",
            amount: " ₦1,200",
            date: "5 hours ago",
            cause: "Don simon",
          },
          {
            name: "James Brown",
            amount: " ₦750",
            date: "1 day ago",
            cause: "Captain Jack",
          },
          {
            name: "Emily Chen",
            amount: " ₦2,000",
            date: "2 days ago",
            cause: "Whisky",
          },
        ].map((donation, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0"
          >
            <div>
              <div className="font-medium text-gray-900">{donation.name}</div>
              <div className="text-sm text-gray-500">{donation.cause}</div>
            </div>
            <div className="text-right">
              <div className="font-medium text-gray-900">{donation.amount}</div>
              <div className="text-sm text-gray-500">{donation.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </CustomCard>
);

const UpcomingEvents = () => (
  <CustomCard className="h-full">
    <CustomCardHeader>
      <CustomCardTitle>Upcoming Supply Sales</CustomCardTitle>
    </CustomCardHeader>
    <div className="p-4">
      <div className="space-y-4">
        {[
          {
            name: "Annual End Of The Year Event",
            date: "March 15, 2025",
            location: "Grand Hotel",
          },
          {
            name: "Needed Beer In Stocks",
            date: "March 20, 2025",
            location: "City Park",
          },
          {
            name: "Supplying Of Drinks",
            date: "March 25, 2025",
            location: "Garden Hotel",
          },
        ].map((event, index) => (
          <div
            key={index}
            className="flex items-center space-x-4 border-b border-gray-100 pb-2 last:border-0"
          >
            <Calendar className="h-8 w-8 text-blue-500" />
            <div>
              <div className="font-medium text-gray-900">{event.name}</div>
              <div className="text-sm text-gray-500">
                {event.date} • {event.location}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </CustomCard>
);

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);

  const [customersData, setCustomersData] = useState([]);

  useEffect(() => {
    getCustomers().then((users) => {
      setCustomersData(users);
      console.log(users);
    });
  }, []);

  useEffect(() => {
    getOrders().then((res) => {
      setOrderData(res.products);
    });
  }, []);
  console.log(orderData);

  useEffect(() => {
    getInventory().then((data) => {
      setInventoryData(data);
    });
  }, []);
  console.log(inventoryData);

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />
    </div>
  );
};

export default Dashboard;
