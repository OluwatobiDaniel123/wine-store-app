import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getInventory } from "../../API";

function Inventory() {
  const [loading, setLoading] = useState(false);
  const [dataSources, setDataSources] = useState([]);

  useEffect(() => {
    setLoading(true);
    getInventory().then((data) => {
      setDataSources(data);
      setLoading(false);
    });
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "https://wine-store-app-backend.vercel.app/api/deleteProduct",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ _id: id }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Error from server:", error);
        return;
      }

      setDataSources((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Space
      size={10}
      direction="vertical"
      className="p-4 w-full overflow-x-auto"
    >
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Image",
            dataIndex: "image",
            render: (link) => <Avatar src={link} />,
            fixed: "left",
          },
          {
            title: "Title",
            dataIndex: "des",
          },
          {
            title: "Price",
            dataIndex: "price",
            render: (value) => <span>N{value}</span>,
          },
          {
            title: "Stock",
            dataIndex: "_id",
          },
          {
            title: "Category",
            dataIndex: "color",
          },
          {
            title: "Actions",
            dataIndex: "delete",
            render: (_, record) => (
              <button
                className="py-1 px-1 text-xs bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300"
                onClick={() => handleDelete(record._id)}
              >
                Delete
              </button>
            ),
            fixed: "right",
          },
        ]}
        dataSource={dataSources}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </Space>
  );
}

export default Inventory;
