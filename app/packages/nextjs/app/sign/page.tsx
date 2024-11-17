"use client";

import { useState } from "react";
import { execHaloCmdWeb } from "@arx-research/libhalo/api/web";
import { HaloCommandObject } from "@arx-research/libhalo/types";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const msg = searchParams.msg as string;
  const [statusText, setStatusText] = useState("Click on the button");

  async function btnClick() {
    const command: HaloCommandObject = {
      name: "sign",
      keyNo: 1,
      message: msg,
    };

    try {
      // --- request NFC command execution ---
      const res = await execHaloCmdWeb(command, { method: "webnfc" });
      // the command has succeeded, display the result to the user
      setStatusText(JSON.stringify(res, null, 4));
      window.close();
    } catch (e) {
      // the command has failed, display error to the user
      setStatusText("Error: " + String(e));
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <pre style={{ fontSize: 12, textAlign: "left" }}>{statusText}</pre>
        <button onClick={btnClick} className="btn btn-primary">
          Sign message 010203 using key #1
        </button>
      </header>
    </div>
  );
}