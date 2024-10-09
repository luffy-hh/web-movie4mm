import React, { lazy, Suspense } from "react";
import { Menu } from "antd";
import CustomButton from "../components/Buttons/CustomButton";
import { FaAngleDown, FaEye, FaTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { dateFormatChange } from "../utilities/UtilFunctions";
const Avatar = lazy(() => import("antd/lib/avatar"));
const Dropdown = lazy(() => import("antd/lib/dropdown"));
const Switch = lazy(() => import("antd/lib/switch"));
// const Menu = lazy(()=> import('antd/lib/menu'))
const Loader = lazy(() => import("../components/Loader/Loader"));
export const carsColumns = (nav, setOpen, setCarId, setCarStatus) => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <Suspense fallback={<Loader spin={true} />}>
          <Avatar src={text} className="w-20 h-20" />
        </Suspense>
      ),
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Car No",
      dataIndex: "car_no",
      key: "car_no",
    },
    {
      title: "Model",
      dataIndex: "model",
      key: "model",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Fuel Type",
      dataIndex: "fuel_type",
      key: "fuel_type",
    },
    {
      title: "License Expire",
      dataIndex: "licenceexpiredate",
      key: "licenceexpiredate",
      render: (text) => dateFormatChange(text),
      align: "right",
    },
    {
      title: "Using",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        // console.log(text);
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Switch
              defaultChecked={text == 1}
              onChange={(e) => {
                // console.log(e);
                setCarStatus(e ? 1 : 0);
                setCarId(record.id);
              }}
            />
          </Suspense>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <div
                onClick={() => nav(`${record.id}`, { state: { ...record } })}
                className=" flex gap-2 items-center"
              >
                <FaEye /> <span className=" inline-block">View</span>
              </div>
            ),
          },
          {
            key: "edit",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() =>
                  nav(`${record.id}/edit`, { state: { ...record } })
                }
              >
                <FaRegEdit /> <span className=" inline-block">Edit</span>
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => {
                  setOpen(true);
                  setCarId(record.id);
                }}
              >
                <FaTrashCan /> <span className=" inline-block">Delete</span>
              </div>
            ),
          },
        ];
        // console.log(record);
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Actions{" "}
                <span>
                  <FaAngleDown />
                </span>
              </a>
            </Dropdown>
          </Suspense>
        );
      },
    },
  ];
};

export const maxDrivingDriver = () => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Photo",
      dataIndex: "dphoto",
      key: "dphoto",
      // align: "left",
      render: (text) => {
        return (
          <img src={text} alt="Driver" className="w-20 h-20 rounded-full" />
        );
      },
    },
    {
      title: "Name",
      dataIndex: "dname",
      key: "dname",
    },
    {
      title: "Way Count",
      dataIndex: "dfreq",
      key: "dfreq",
      align: "right",
    },
  ];
};

export const todayWays = () => {
  return [
    { title: "ကားနံပါတ်", dataIndex: "car_no", key: "car_id" },
    {
      title: "ယာဥ်မောင်းအမည်",
      dataIndex: "dname",
      key: "driver_id",
    },
    {
      title: "အသုံးပြုသူ",
      dataIndex: "usageName",
      key: "usageName",
    },
    {
      title: "အကြောင်းအရာ",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "ထွက်ခွာချိန်",
      dataIndex: "start_time",
      key: "start_time",
      align: "right",
    },
    {
      title: "ပြီးဆုံးချိန်",
      dataIndex: "end_time",
      key: "end_time",
      align: "right",
    },
  ];
};

export const carHistory = () => {
  return [
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dateFormatChange(text),
    },
    {
      title: "Driver Name",
      dataIndex: "dname",
      key: "dname",
    },
    {
      title: "Driving Kilo",
      key: "driving_kilo",
      render: (text, record) => {
        return record.end_kilo == null
          ? ""
          : record.end_kilo - record.start_kilo;
      },
      align: "right",
    },
  ];
};

export const carFuelColumns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => dateFormatChange(text),
    // align: "right",
  },
  {
    title: "Driver Name",
    dataIndex: "dname",
    key: "dname",
    // align: "right",
  },
  {
    title: "Driving Kilo",
    dataIndex: "kilo",
    key: "kilo",
    align: "right",
  },
  {
    title: "Amount",
    dataIndex: "price",
    key: "price",
    align: "right",
    render: (text) => {
      return <span>{Number(text).toLocaleString()}</span>;
    },
  },
];

export const carMaintenanceColumns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => dateFormatChange(text),
    // align: "right",
  },
  {
    title: "Driver Name",
    dataIndex: "dname",
    key: "dname",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    render: (text) => Number(text).toLocaleString(),
  },
];

export const driversColumns = (
  nav,
  setDriverId,
  setDriverStatus,
  setIsDriver,
  setIsLeave,
  setIsOff,
  setOpen
) => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Photo",
      dataIndex: "dphoto",
      key: "dphoto",
      render: (text, record) => (
        <img
          className="w-20 h-20 rounded-full"
          src={text}
          alt={`${record.dname}'s photo`}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "dname",
      key: "dname",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "License Expire",
      dataIndex: "licenceexpiredate",
      key: "licenceexpiredate",
      render: (text) => dateFormatChange(text),
      align: "right",
    },
    // {
    //   title: "Active/Inactive",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (text, record) => {
    //     // console.log(text);
    //     return (
    //         <Suspense fallback={<Loader spin={true}/>}>
    //           <Switch
    //               defaultChecked={text == "1"}
    //               onChange={(e) => {
    //                 setDriverId(record.id);
    //                 setDriverStatus(e ? 1 : 0);
    //               }}
    //           />
    //         </Suspense>

    //     );
    //   },
    // },
    {
      title: "Driver Status",
      dataIndex: "is_driver",
      key: "is_driver",
      render: (text, record) => {
        // console.log(text);
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Switch
              defaultChecked={text == "1"}
              onChange={(e) => {
                setDriverId(record.id);
                setIsDriver(e ? 1 : 0);
              }}
            />
          </Suspense>
        );
      },
    },
    {
      title: "Leave",
      dataIndex: "is_leave",
      key: "is_leave",
      render: (text, record) => {
        // console.log(text);
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Switch
              defaultChecked={text == "1"}
              onChange={(e) => {
                setDriverId(record.id);
                setIsLeave(e ? 1 : 0);
              }}
            />
          </Suspense>
        );
      },
    },
    {
      title: "Day Off",
      dataIndex: "is_off",
      key: "is_off",
      render: (text, record) => {
        // console.log(text);
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Switch
              defaultChecked={text == "1"}
              onChange={(e) => {
                setDriverId(record.id);
                setIsOff(e ? 1 : 0);
              }}
            />
          </Suspense>
        );
      },
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => nav(`${record.id}`, { state: { ...record } })}
              >
                <FaEye /> <span className="inline-block">View</span>
              </div>
            ),
          },
          {
            key: "edit",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() =>
                  nav(`${record.id}/edit`, { state: { ...record } })
                }
              >
                <FaRegEdit /> <span className="inline-block">Edit</span>
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => {
                  setDriverId(record.id);
                  setDriverStatus(0);
                  setOpen(true);
                }}
              >
                <FaTrashCan /> <span className="inline-block">Delete</span>
              </div>
            ),
          },
        ];
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Actions
                <span>
                  <FaAngleDown />
                </span>
              </a>
            </Dropdown>
          </Suspense>
        );
      },
    },
  ];
};

export const driverHistoryColumns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => dateFormatChange(text),
    // align: "right",
  },
  { title: "Car No", dataIndex: "car_no", key: "car_no" },
  {
    title: "Driving Kilo",
    key: "driving_kilo",
    render: (text, record) => {
      return record.end_kilo == null
        ? ""
        : Math.floor(record.end_kilo - record.start_kilo);
    },
    align: "right",
  },
];

export const driverFuelColumns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => dateFormatChange(text),
    // align: "right",
  },
  {
    title: "Car No",
    dataIndex: "car_no",
    key: "car_no",
  },
  {
    title: "Driving Kilo",
    key: "kilo",
    dataIndex: "kilo",
    align: "right",
    render: (text) => Number(text).toLocaleString(),
  },
  {
    title: "Amount",
    key: "price",
    dataIndex: "price",
    align: "right",
    render: (text) => Number(text).toLocaleString(),
  },
];

export const driverMaintenanceColumns = [
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    render: (text) => dateFormatChange(text),
    // align: "right",
  },
  {
    title: "Car No",
    dataIndex: "car_no",
    key: "car_no",
  },
  {
    title: "Reason",
    dataIndex: "reason",
    key: "reason",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    align: "right",
    render: (text) => Number(text).toLocaleString(),
  },
];

export const drivingHistory = (nav, setOpen, setDrivingId) => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Car No",
      dataIndex: "car_no",
      key: "car_no",
    },
    {
      title: "Name",
      dataIndex: "dname",
      key: "dname",
    },
    {
      title: "Instructor",
      dataIndex: "usageName",
      key: "usageName",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Start Time",
      dataIndex: "start_time",
      key: "start_time",
    },
    {
      title: "End Time",
      dataIndex: "end_time",
      key: "end_time",
    },
    {
      title: "Start Kilo",
      dataIndex: "start_kilo",
      key: "start_kilo",
      align: "right",
    },
    {
      title: "End Kilo",
      dataIndex: "end_kilo",
      key: "end_kilo",
      align: "right",
    },
    {
      title: "Used Kilo",
      dataIndex: "kilo",
      key: "kilo",
      render: (text, record) => {
        return record.end_kilo == null
          ? ""
          : record.end_kilo - record.start_kilo;
      },
      align: "right",
    },
    {
      title: "Date",
      key: "created_at",
      dataIndex: "created_at",
      render: (text) => dateFormatChange(text),
      align: "right",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => nav(`${record.id}`, { state: { ...record } })}
              >
                <FaEye /> <span className="inline-block">View</span>
              </div>
            ),
          },
          {
            key: "edit",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() =>
                  nav(`${record.id}/edit`, { state: { ...record } })
                }
              >
                <FaRegEdit /> <span className="inline-block">Edit</span>
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => {
                  setOpen(true);
                  setDrivingId(record.id);
                }}
              >
                <FaTrashCan /> <span className="inline-block">Delete</span>
              </div>
            ),
          },
        ];
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Actions{" "}
                <span>
                  <FaAngleDown />
                </span>
              </a>
            </Dropdown>
          </Suspense>
        );
      },
    },
  ];
};

export const reportColumns = (isExporting) => {
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Car No",
      dataIndex: "car_no",
      key: "car_no",
    },
    {
      title: "Start Kilo",
      dataIndex: "startKilo",
      key: "startKilo",
      render: (text) => Number(text).toLocaleString(),
      align: "right",
    },
    {
      title: "End Kilo",
      dataIndex: "endKilo",
      key: "endKilo",
      align: "right",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "Using Kilo",
      dataIndex: "usingKilo",
      key: "usingKilo",
      align: "right",
    },
    {
      title: "Liters",
      dataIndex: "liters",
      key: "liters",
      render: (text) => <span>{parseFloat(text).toFixed(3)}</span>,
      align: "right",
    },
    {
      title: "Gallons",
      dataIndex: "gallons",
      key: "gallons",
      render: (text) => <span>{parseFloat(text).toFixed(2)}</span>,
      align: "right",
    },
    {
      title: "Fuel Amount",
      dataIndex: "amount",
      key: "amount",
      render: (text) => <span>{Number(text).toLocaleString()}</span>,
      align: "right",
    },
    {
      title: "Total kilos per liter",
      dataIndex: "total_kilos_per_liter",
      key: "total_kilos_per_liter",
      align: "right",
    },
    {
      title: "Total kilos per gallon",
      dataIndex: "total_kilos_per_gallon",
      key: "total_kilos_per_gallon",
      align: "right",
    },
  ];
  // If exporting, return the columns with titles
  if (isExporting) {
    columns.push({
      title: "မှတ်ချက်",
      dataIndex: "remark",
      key: "remark",
      align: "right",
    });
  }
  return columns;
};

export const fuelColumns = (nav, setOpen, setFuelId) => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Car No",
      dataIndex: "car_no",
      key: "car_no",
    },
    { title: "Driver", dataIndex: "dname", key: "dname" },
    {
      title: "Kilos",
      dataIndex: "kilo",
      key: "kilo",
      align: "right",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "right",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "Liters",
      dataIndex: "liters",
      key: "liters",
      render: (text) => <span>{text ? parseFloat(text).toFixed(3) : 0}</span>,
      align: "right",
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dateFormatChange(text),
      align: "right",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => nav(`${record.id}`, { state: { ...record } })}
              >
                <FaEye /> <span className="inline-block">View</span>
              </div>
            ),
          },
          {
            key: "edit",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() =>
                  nav(`${record.id}/edit`, { state: { ...record } })
                }
              >
                <FaRegEdit /> <span className="inline-block">Edit</span>
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => {
                  setOpen(true);
                  setFuelId(record.id);
                }}
              >
                <FaTrashCan /> <span className="inline-block">Delete</span>
              </div>
            ),
          },
        ];
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Actions
                <span>
                  <FaAngleDown />
                </span>
              </a>
            </Dropdown>
          </Suspense>
        );
      },
    },
  ];
};

export const fuelReportColumns = () => {
  return [
    {
      title: "Branch",
      dataIndex: "branch",
      key: "branch",
    },
    {
      title: "Car No",
      dataIndex: "car_no",
      key: "id",
    },
    {
      title: "Start Kilo",
      dataIndex: "start_kilo",
      key: "start_kilo",
      align: "right",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "End Kilo",
      dataIndex: "end_kilo",
      key: "end_kilo",
      align: "right",
      render: (text) => <span>{text ? Number(text).toLocaleString() : 0}</span>,
    },
    {
      title: "Using Kilo",
      key: "using_kilo",
      dataIndex: "using_kilo",
      align: "right",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "Liters",
      key: "liters",
      dataIndex: "liters",
      align: "right",
      render: (text) => <span>{parseFloat(text).toFixed(3)}</span>,
    },
    {
      title: "Gallons",
      key: "gallons",
      dataIndex: "gallons",
      align: "right",
      render: (text) => <span>{parseFloat(text).toFixed(2)}</span>,
    },
    {
      title: "Amount",
      key: "amount",
      align: "right",
      dataIndex: "amount",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "Daily Average Amount",
      key: "avg_amount",
      dataIndex: "avg_amount",
      align: "right",
      render: (text) => (
        <span>{Number(parseFloat(text).toFixed(0)).toLocaleString()}</span>
      ),
    },
  ];
};

export const fuelReportListColumns = () => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "right",
    },
    {
      title: "Start Kilo",
      dataIndex: "start_kilo",
      key: "start_kilo",
      align: "right",
    },
    {
      title: "End Kilo",
      dataIndex: "end_kilo",
      key: "end_kilo",
      align: "right",
    },
    {
      title: "Using Kilo",
      key: "using_kilo",
      align: "right",
      dataIndex: "using_kilo",
    },
    {
      title: "Liters",
      key: "liter",
      align: "right",
      dataIndex: "liter",
      render: (text) => <span>{parseFloat(text).toFixed(3)}</span>,
    },
    {
      title: "Amount",
      key: "amount",
      align: "right",
      dataIndex: "amount",
      render: (text) => text,
    },
    {
      title: "Kilos per liter",
      key: "kilo_per_liter",
      align: "right",
      dataIndex: "kilo_per_liter",
      render: (text) => <span>{parseFloat(text).toFixed(3)}</span>,
    },
    {
      title: "Kilos per gallon",
      key: "kilo_per_gallon",
      align: "right",
      dataIndex: "kilo_per_gallon",
      render: (text) => <span>{parseFloat(text).toFixed(3)}</span>,
    },
  ];
};

export const maintenanceColumns = (nav, setOpen, setMaintenanceId) => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Date",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dateFormatChange(text),
    },
    {
      title: "Car No",
      dataIndex: "car_no",
      key: "car_no",
    },
    {
      title: "Driver Name",
      dataIndex: "dname",
      key: "dname",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (text) => Number(text).toLocaleString(),
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const menuItems = [
          {
            key: "view",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => nav(`${record.id}`, { state: { ...record } })}
              >
                <FaEye /> <span className="inline-block">View</span>
              </div>
            ),
          },
          {
            key: "edit",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() =>
                  nav(`${record.id}/edit`, { state: { ...record } })
                }
              >
                <FaRegEdit /> <span className="inline-block">Edit</span>
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => {
                  setOpen(true);
                  setMaintenanceId(record.id);
                }}
              >
                <FaTrashCan /> <span className="inline-block">Delete</span>
              </div>
            ),
          },
        ];
        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Actions
                <span>
                  <FaAngleDown />
                </span>
              </a>
            </Dropdown>
          </Suspense>
        );
      },
    },
  ];
};

export const userColumns = (nav, setOpen, setUserId) => {
  return [
    {
      title: "No",
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Login ID",
      dataIndex: "loginId",
      key: "loginId",
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (text) => dateFormatChange(text),
      align: "right",
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (text) => dateFormatChange(text),
      align: "right",
    },
    {
      title: "Actions",
      key: "action",
      render: (text, record) => {
        const menuItems = [
          {
            key: "edit",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() =>
                  nav(`${record.id}/edit`, { state: { ...record } })
                }
              >
                <FaRegEdit /> <span className="inline-block">Edit</span>
              </div>
            ),
          },
          {
            key: "delete",
            label: (
              <div
                className=" flex gap-2 items-center"
                onClick={() => {
                  setOpen(true);
                  setUserId(record.id);
                }}
              >
                <FaTrashCan /> <span className="inline-block">Delete</span>
              </div>
            ),
          },
        ];

        return (
          <Suspense fallback={<Loader spin={true} />}>
            <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
              <a
                className="ant-dropdown-link flex items-center"
                onClick={(e) => e.preventDefault()}
              >
                Actions{" "}
                <span>
                  <FaAngleDown />
                </span>
              </a>
            </Dropdown>
          </Suspense>
        );
      },
    },
  ];
};
