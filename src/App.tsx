import OneSDK, { SdkMode } from "@frankieone/one-sdk";
import b64 from "base-64";
import moment from "moment";
import React, { FC } from "react";

const App: FC = () => {
  const base = b64.encode("");
  const time = moment();
  const onesdk = OneSDK({ mode: SdkMode.DUMMY });
  return <div></div>;
};
export default App;
