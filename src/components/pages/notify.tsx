import React, { useEffect } from "react";
import "../styles/Notify.css";

interface notifyprops {
  setNotify: (active: boolean) => void;
  message: string
}


const Notify = ({ setNotify, message }: notifyprops) => {
  useEffect(() => {
    setTimeout(() => setNotify(false), 3000);
  });
  return <div className="notify" data-testid='notify-component'>{message}</div>;
};

export default Notify;
