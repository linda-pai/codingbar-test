import React from "react";
import { Table, Input } from "antd";
import jsonData from "./test.json";
import { useLocation } from "react-router-dom";

const { Search } = Input;

const SearchPage = () => {
  const search = useLocation().search;
  const pageSize = new URLSearchParams(search).get("pageSize");

  console.log("pageSize", pageSize);

  const [publicData, setPublicData] = React.useState(jsonData.public);
  const [organData, setOrganData] = React.useState(jsonData.organ);

  const [publicPagination, setPublicPagination] = React.useState({
    current: 1,
    pageSize: pageSize || 10,
  });
  const [organPagination, setOrganPagination] = React.useState({
    current: 1,
    pageSize: pageSize || 10,
  });

  const columns = [
    {
      title: "編號",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      width: 90,
    },
    {
      title: "行政區",
      dataIndex: "dist",
      key: "dist",
      sorter: (a, b) => a.dist?.localeCompare(b.dist),
      width: 110,
    },
    {
      title: "停車場名稱",
      dataIndex: "parkingLotName",
      key: "parkingLotName",
      sorter: (a, b) => a.parkingLotName?.localeCompare(b.parkingLotName),
      width: 240,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      sorter: (a, b) => a.address?.localeCompare(b.address),
      width: 240,
    },
    {
      title: "設置格數",
      dataIndex: "gridNum",
      key: "gridNum",
      sorter: (a, b) => a.gridNum - b.gridNum,
      width: 120,
    },
  ];

  const onSearch = (value) => {
    setPublicData(
      jsonData.public.filter(
        (item) =>
          item.dist?.includes(value) ||
          item.parkingLotName?.includes(value) ||
          item.address?.includes(value)
      )
    );

    setOrganData(
      jsonData.organ.filter(
        (item) =>
          item.dist?.includes(value) ||
          item.parkingLotName?.includes(value) ||
          item.address?.includes(value)
      )
    );
  };

  return (
    <div className="container">
      <div className="item-wrapper">
        <Search
          placeholder="搜尋欄位:行政區、停車場名稱與地址"
          allowClear
          enterButton="Go"
          size="large"
          onSearch={onSearch}
        />
      </div>
      <div className="item-wrapper">
        <Table
          dataSource={publicData}
          columns={columns}
          pagination={{
            ...publicPagination,
            showPageSizeOptions: false,
            position: ["bottomCenter"],
          }}
          onChange={(pagination) => setPublicPagination(pagination)}
        />
        <div className="pagination">
          共{Math.ceil(publicData.length / publicPagination.pageSize)}頁
        </div>
      </div>
      <div className="item-wrapper">
        <Table
          dataSource={organData}
          columns={columns}
          pagination={{
            ...organPagination,
            showPageSizeOptions: false,
            position: ["bottomCenter"],
          }}
          onChange={(pagination) => setOrganPagination(pagination)}
        />
        <div className="pagination">
          共{Math.ceil(organData.length / organPagination.pageSize)}頁
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
