import OneSDK, { SdkMode } from "@frankieone/one-sdk";
import moment from "moment";
import React, { FC } from "react";

const App: FC = () => {
  const time = moment();
  const onesdk = OneSDK({ mode: SdkMode.DUMMY });
  return <div></div>;
};
export default App;
