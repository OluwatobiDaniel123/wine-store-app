import { Avatar, Rate, Space, Table, Typography } from "antd";
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

  console.log(dataSources);

  const handleDelete = async (id) => {
    try {
      const response = await fetch("http://localhost:5000/api/deleteProduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: id }),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Error from server:", error);
        return;
      }

      const result = await response.json();
      console.log(result);

      // Remove the deleted product from the UI
      setDataSources(dataSources.filter((dataSource) => dataSource._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title level={4}>Inventory</Typography.Title>
      <Table
        loading={loading}
        columns={[
          {
            title: "Product Image",
            dataIndex: "image",
            render: (link) => {
              return <Avatar src={link} />;
            },
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

          // {
          //   title: "Available",
          //   dataIndex: "badge",
          // },
          {
            title: "Category",
            dataIndex: "color",
          },
          {
            dataIndex: "delete",
            render: (_, record) => {
              return (
                <button
                  className="py-2 px-6 bg-red-500 text-white font-semibold uppercase hover:bg-red-700 duration-300"
                  onClick={() => handleDelete(record._id)}
                >
                  Delete
                </button>
              );
            },
          },
        ]}
        dataSource={dataSources}
        pagination={{
          pageSize: 5,
        }}
      ></Table>
    </Space>
  );
}
export default Inventory;
