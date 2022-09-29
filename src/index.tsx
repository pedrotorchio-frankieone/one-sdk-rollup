import OneSDK, { SdkMode } from "@frankieone/one-sdk";
import React, { FC, useEffect } from "react";
import { createRoot } from "react-dom/client";

const App: FC = () => {
  useEffect(() => void useOneSDK());
  return <div>Customer UI</div>;
};

async function useOneSDK() {
  const oneSdk = await OneSDK({ mode: SdkMode.DUMMY });
  const ocr = oneSdk.component("ocr");
  ocr.start();
  ocr.on("input_required", ocrInputRequiredCallback);
  ocr.off("input_required", ocrInputRequiredCallback)
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