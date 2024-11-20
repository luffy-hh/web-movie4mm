import { Avatar } from "antd";
import { render } from "react-dom";

export const aToZColumns = (data) => {
  return [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => index + 1,
    },
    {
      title: `Results`,
      dataIndex: "title",
      key: "title",
      render: (text, record) => (
        <>
          {record?.img && (
            <Avatar src={record?.img} className="inline-block min-w-10" />
          )}
          <span className="inline-block">{record?.title}</span>
        </>
      ),
    },
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "IMDB",
      dataIndex: "imdb",
      key: "imdb",
    },
  ];
};
