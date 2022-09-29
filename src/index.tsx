import OneSDK, { OneSdkContext, SdkMode } from "@frankieone/one-sdk";
import React, { FC, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App: FC = () => {
  useEffect(initialiseOneSdk);
  return <div>Customer UI</div>;
};

function initialiseOneSdk() {
  let oneSdkInstance: OneSdkContext;
  OneSDK({ mode: SdkMode.DUMMY }).then(oneSdk => {
    oneSdkInstance = oneSdk;
    const ocr = oneSdk.component("ocr");
    ocr.start();
    ocr.on("input_required", ocrInputRequiredCallback);
  })
  return () => {
    const ocr = oneSdkInstance.component("ocr");
    ocr.off("input_required", ocrInputRequiredCallback);
  }
}

function ocrInputRequiredCallback(info, error, provideFile) {
  alert(`
    input_required
    ${JSON.stringify(info, null, 2)}
    ${JSON.stringify(error, null, 2)}`
  );
}


createRoot(
  document.getElementById("root")!
).render(<React.StrictMode><App /></React.StrictMode>);