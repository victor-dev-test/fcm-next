import React from "react";
import { ToastContainer } from "react-toastify";
import { useFCM } from "../hooks/useFCM";

function PushNotificationLayout({ children }) {
  useFCM()
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
}

export default PushNotificationLayout;
