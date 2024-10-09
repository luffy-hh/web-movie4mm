import { Table } from "ant-table-extensions";
import { Button } from "antd";
import * as XLSX from "xlsx";

const CustomTable = ({
  rowKey = "id",
  className,
  columns,
  data = [],
  rowClassName,
  footer = undefined,
  pagination,
  onChange,
  loading,
  summary,
  exportableProps,
  expandable = {},
  onRow = () => {},
  extraButton = false,
  extraColumns = [],
}) => {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const indexData = (data) => {
    return data.map((item, index) => {
      return { no: index + 1, ...item };
    });
  };
  const exportIndex = (data) => {
    const indexedData = data.map((item, index) => {
      const { id, ...rest } = item;
      return { id: index + 1, ...rest };
    });
    if (summary && summary.props && summary.props.children) {
      const summaryRow = {};
      summary.props.children.forEach((cell, index) => {
        const columnKey = columns[index]?.dataIndex || `column${index}`;
        summaryRow[columnKey] = cell.props.children;
      });
      indexedData.push(summaryRow);
    }

    return indexedData;
  };

  // const handleExport = () => {
  //   const indexedData = exportIndex(data);

  //   console.log(indexedData);
  //   // Map columns to CSV headers
  //   const csvHeaders = columns.map((col) => ({
  //     label: col.title,
  //     value: col.dataIndex || col.key,
  //   }));
  //   // Convert data to CSV
  //   const json2csvParser = new Parser({ fields: csvHeaders });
  //   const csvContent = json2csvParser.parse(indexedData);

  //   // Add UTF-8 BOM to the CSV content
  //   const bom = "\uFEFF";
  //   const csvWithBom = bom + csvContent;

  //   // Create a Blob with the CSV content and BOM
  //   const blob = new Blob([csvWithBom], { type: "text/csv;charset=utf-8;" });

  //   // Create a link element to download the Blob as a file
  //   const link = document.createElement("a");
  //   const url = URL.createObjectURL(blob);
  //   link.href = url;
  //   link.setAttribute("download", `${exportableProps.fileName}.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   // Use the default export function from ant-table-extensions
  //   // exportableProps.onExport(indexedData);
  // };
  const handleExport = () => {
    const checkedColumns = extraColumns.length > 0 ? extraColumns : columns;
    // Process data according to render functions
    const processedData = data.map((item) => {
      const processedItem = {};
      checkedColumns.forEach((col) => {
        if (col.render && col.title !== "No") {
          // Apply the render function and convert the result to a string if necessary
          const renderedValue = col.render(item[col.dataIndex], item);
          processedItem[col.dataIndex] =
            typeof renderedValue === "object"
              ? renderedValue.props.children
              : renderedValue;
        } else {
          processedItem[col.dataIndex] = item[col.dataIndex];
        }
      });
      // console.log(processedItem);
      return processedItem;
    });
    const indexedData = exportIndex(processedData);
    // Filter data to include only columns with labels
    const filteredData = indexedData.map((item) => {
      const filteredItem = {};
      checkedColumns.forEach((col) => {
        if (col.dataIndex in item) {
          filteredItem[col.dataIndex] = item[col.dataIndex];
        }
      });

      return filteredItem;
    });

    // Create a new workbook and a worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet([]);

    // Add headers
    const headers =
      extraColumns.length > 0
        ? extraColumns.map((col) => col.title)
        : columns.map((col) => col.title);
    XLSX.utils.sheet_add_aoa(ws, [headers], { origin: "A1" });

    // Add data
    XLSX.utils.sheet_add_json(ws, filteredData, {
      origin: "A2",
      skipHeader: true,
    });
    // Apply bold formatting to the header row
    const headerRange = XLSX.utils.decode_range(
      "A1:" + XLSX.utils.encode_col(headers.length - 1) + "1"
    );
    for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
      const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
      if (!ws[cellAddress]) continue;
      ws[cellAddress] = {
        ...ws[cellAddress],
        s: {
          ...ws[cellAddress].s,
          font: { bold: true },
        },
      };
    }

    // Apply alignment to each cell based on column alignment
    const dataRange = XLSX.utils.decode_range(ws["!ref"]);
    for (let R = dataRange.s.r; R <= dataRange.e.r; ++R) {
      for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        const col = columns[C];
        if (col && col.align) {
          ws[cellAddress] = {
            ...ws[cellAddress],
            s: {
              ...ws[cellAddress].s,
              alignment: { horizontal: "left" },
            },
          };
        }
      }
    }
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Generate a file and trigger a download
    XLSX.writeFile(wb, `${exportableProps.fileName}.xlsx`);
  };
  // Add align: 'right' to each column
  const alignedColumns = columns.map((col) => ({
    ...col,
    align: col?.align ? col.align : "left",
  }));

  return (
    <>
      {exportableProps && extraButton && (
        <div className='w-full flex'>
          <Button {...exportableProps.btnProps} onClick={handleExport}>
            {exportableProps.children}
          </Button>
        </div>
      )}
      <Table
        className={classNames("max-w-[100%] table-scroll", className)}
        columns={alignedColumns}
        dataSource={indexData(data)}
        rowClassName={rowClassName}
        bordered
        pagination={
          pagination
            ? {
                ...pagination,
                position: ["bottomCenter"],
                showSizeChanger: false,
              }
            : false
        }
        rowKey={rowKey}
        expandable={expandable}
        // exportableProps={extraButton ? false : { ...exportableProps }}
        footer={footer && footer}
        onChange={onChange}
        loading={loading}
        onRow={onRow}
        summary={() => summary}
      />
    </>
  );
};
// // Apply bold formatting to the header row
// const headerRange = XLSX.utils.decode_range(
//   "A1:" + XLSX.utils.encode_col(headers.length - 1) + "1"
// );
// for (let C = headerRange.s.c; C <= headerRange.e.c; ++C) {
//   const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
//   if (!ws[cellAddress]) continue;
//   if (!ws[cellAddress].s) ws[cellAddress].s = {};
//   ws[cellAddress].s.font = { bold: true };
// }

// // Apply alignment to each cell based on column alignment
// const dataRange = XLSX.utils.decode_range(ws["!ref"]);
// for (let R = dataRange.s.r; R <= dataRange.e.r; ++R) {
//   for (let C = dataRange.s.c; C <= dataRange.e.c; ++C) {
//     const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
//     if (!ws[cellAddress]) continue;
//     if (!ws[cellAddress].s) ws[cellAddress].s = {};
//     const col = columns[C];
//     if (col && col.align) {
//       ws[cellAddress].s.alignment = { horizontal: col.align };
//     }
//   }
// }
// export const ExportButton = ({ exportableProps, data, columns, summary }) => {
//   const handleExport = async () => {
//     const indexedData = data.map((item, index) => ({
//       ...item,
//       no: index + 1,
//     }));

//     if (summary) {
//       const summaryRow = {};
//       columns.forEach((col) => {
//         summaryRow[col.dataIndex] = summary[col.dataIndex] || {};
//       });
//       indexedData.push(summaryRow);
//     }
//     exportableProps.onExport(indexedData);
//     // try {
//     //   const csv = await json2csv.json2csvAsync(indexedData);
//     //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
//     //   const link = document.createElement("a");
//     //   link.href = URL.createObjectURL(blob);
//     //   link.download = `${exportableProps.fileName}.csv`;
//     //   link.click();
//     // } catch (error) {
//     //   console.error("Error exporting data to CSV:", error);
//     // }
//   };

//   return (
//     <Button
//       className={exportableProps.btnProps.className}
//       icon={exportableProps.btnProps.icon}
//       onClick={handleExport}
//     >
//       {exportableProps.children}
//     </Button>
//   );
// };
export default CustomTable;
