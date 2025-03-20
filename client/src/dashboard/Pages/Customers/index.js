import { Avatar, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getCustomers } from "../../API";
import { Link } from "react-router-dom";

function Customers() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setLoading(true);
    getCustomers().then((users) => {
      setDataSource(users);
      setLoading(false);
    });
  }, []);

  return (
    <Space
      size={20}
      direction="vertical"
      className="p-4 w-full overflow-x-auto"
    >
      <div className="flex justify-between items-center">
        <Typography.Title level={4}>Customers</Typography.Title>
        <Link to="/dashboard" className="text-blue-500">
          Back
        </Link>
      </div>

      <Table
        loading={loading}
        columns={[
          {
            title: "Photo",
            dataIndex: "image",
            render: (link) => <Avatar src={link} />,
            fixed: "left",
          },
          {
            title: "Name",
            dataIndex: "clientName",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Phone",
            dataIndex: "phone",
          },
          {
            title: "Address",
            dataIndex: "address",
          },
          {
            title: "City",
            dataIndex: "city",
          },
          {
            title: "Country",
            dataIndex: "country",
          },
        ]}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
    </Space>
  );
}

export default Customers;
