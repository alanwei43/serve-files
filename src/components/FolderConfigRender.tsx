"use client";

import { useEffect, useState } from "react";

export function FolderConfigRender() {
  const [config, setConfig] = useState({
    folder: ""
  });
  useEffect(() => {
    fetch("/api/config")
      .then(r => r.json())
      .then((response) => {
        setConfig(response);
      });
  });

  return (<div>
    <label>
      <span>目录：</span>
      <b>{config.folder}</b>
    </label>
  </div>);
}
