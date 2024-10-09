import React, { useEffect } from "react";
import Container from "../../components/Container";
import CustomButton from "../../components/Buttons/CustomButton";
import { useNavigate } from "react-router-dom";
import { fuelInputs } from "../../constants/FormInputs";
import CustomForm from "../../components/Forms/CustomForm";
import PagesTitle from "../../components/PagesTitle";
import { useDispatch, useSelector } from "react-redux";
import { selectDriverSelectInputs } from "../../app/UserSlice/UserSlice";
import { selectCarSelectInputs } from "../../app/CarSlice/CarSlice";

import {
  createFuel,
  selectCreateFuelMsg,
  selectCreateFuelStatus,
} from "../../app/FuelSlice/FuelSlice";
import Notification from "../../components/Notification";
import Loader from "../../components/Loader/Loader";
import { toast } from "react-toastify";
import { dateFormatChange } from "../../utilities/UtilFunctions.jsx";
import { Form } from "antd";

const FuelCreate = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const driversSelectBox = useSelector(selectDriverSelectInputs);
  const carsSelectBox = useSelector(selectCarSelectInputs);
  const fuelCreateStatus = useSelector(selectCreateFuelStatus);
  const fuelCreateMsg = useSelector(selectCreateFuelMsg);

  const inputs = fuelInputs(driversSelectBox, carsSelectBox);
  const onFinish = async (values) => {
    // const final = await base64Changer(values, ["photo"]);
    values.fill_date = dateFormatChange(values.fill_date);
    dispatch(createFuel({ api: "createFuel", pData: values }));
  };
  // console.log(fuelCreateMsg);
  useEffect(() => {
    if (fuelCreateStatus === "success") {
      toast.success(fuelCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
      form.resetFields();
    }

    if (fuelCreateStatus === "fail") {
      toast.error(fuelCreateMsg, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
        theme: "light",
      });
    }
  }, [fuelCreateStatus]);
  return (
    <Container>
      <Notification />
      <Loader spin={fuelCreateStatus === "loading"} />
      <PagesTitle title={"Add New Fuel"} />
      <div className="p-8">
        <CustomForm data={inputs} onFinish={onFinish} />
      </div>
    </Container>
  );
};

export default FuelCreate;
