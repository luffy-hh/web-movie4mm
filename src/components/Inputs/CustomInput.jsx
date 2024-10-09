import { DatePicker, Input } from "antd";
import dayjs from "dayjs";
import PropTypes from "prop-types";
const CustomInput = ({
  placeholder,
  className,
  type = "text",
  clearable = false,
  onChange,
  value,
  defaultValue,
  multiple = false,
  id = "",
  required = false,
  onKeyPress,
}) => {
  if (type === "date") {
    return (
      <DatePicker
        defaultValue={defaultValue ? dayjs(defaultValue) : null}
        allowClear={clearable}
        placeholder={placeholder}
        className={className}
        format="DD/MM/YYYY"
        value={value}
        onChange={onChange}
      />
    );
  }
  if (type === "file") {
    return (
      <Input
        allowClear={clearable}
        placeholder={placeholder}
        className={className}
        type={type}
        id={id}
        multiple={multiple}
        onChange={(e) => onChange(e)}
      />
    );
  }
  return (
    <Input
      allowClear={clearable}
      placeholder={placeholder}
      className={className}
      type={type}
      onChange={onChange}
      value={value}
      required={required}
      onKeyDown={onKeyPress}
    />
  );
};
CustomInput.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  clearable: PropTypes.bool,
  onChange: PropTypes.func,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  multiple: PropTypes.bool,
  id: PropTypes.string,
  required: PropTypes.bool,
  onKeyPress: PropTypes.func,
};

export default CustomInput;

// const renderMenuItems = (items) => {
//   return items.map((item) => {
//     if (item?.children) {
//       return (
//         <SubMenu
//           key={item.key}
//           title={item.label}
//           mode={item.mode}
//           popupClassName={item.className}
//         >
//           {item.children.map((childGroup, index) =>
//             childGroup?.children ? (
//               <Menu.ItemGroup key={index}>
//                 {childGroup.children.map((child) => (
//                   <Item key={child.key}>{child.label}</Item>
//                 ))}
//               </Menu.ItemGroup>
//             ) : (
//               <Item key={childGroup.key}>{childGroup.label}</Item>
//             )
//           )}
//         </SubMenu>
//       );
//     }
//     return <Item key={item.key}>{item.label}</Item>;
//   });
// };

// import React from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Button, Upload } from 'antd';
// const fileList = [
//   {
//     uid: '0',
//     name: 'xxx.png',
//     status: 'uploading',
//     percent: 33,
//   },
//   {
//     uid: '-1',
//     name: 'yyy.png',
//     status: 'done',
//     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//     thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
//   },
//   {
//     uid: '-2',
//     name: 'zzz.png',
//     status: 'error',
//   },
// ];
// const App = () => (
//   <Upload
//     action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
//     listType="picture"
//     defaultFileList={fileList}
//   >
//     <Button type="primary" icon={<UploadOutlined />}>
//       Upload
//     </Button>
//   </Upload>
// );
// export default App;
