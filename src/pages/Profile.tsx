import React from "react";
import PersonalData from "../components/PersonalData/PersonalData.tsx";
import Payment from "../components/ Payment/ Payment.tsx";
import styles from "./Profile.module.scss";
import OrderHistory from "../components/OrderHistory/OrderHistory.tsx";

const Profile: React.FC = () => {
  return (
    <div className={styles.profileWrapper}>
      <PersonalData />
      <Payment />
      <OrderHistory />
    </div>
  );
};

export default Profile;
