"use client"

import { Dialog } from "../utility/Dialog";
import "./style.css";
import React, { useState } from 'react';

export function FloatQuickFunctions(props: { appConfig: React.ReactNode }) {
  const [expandFnAreas, setExpandFnAreas] = useState(false);

  return (
    <div className="float-quick">
      {expandFnAreas && <>
        <div className="my-2"> <AppConfig configInfo={props.appConfig} /> </div>
        <div className="my-2"> <UploadIcon /> </div>
      </>}
      <span className="btn btn-sm btn-info" onClick={() => setExpandFnAreas(!expandFnAreas)}>
        <i className={`fa-solid ${expandFnAreas ? "fa-angles-up" : "fa-angles-down"}`}></i>
      </span>
    </div>
  );
}

function AppConfig(props: { configInfo: React.ReactNode }) {
  const [showConfig, setShowConfig] = useState(false);

  return (<>
    <span className="btn btn-sm btn-primary" onClick={() => setShowConfig(true)}>
      <i className="fa-solid fa-circle-info"></i>
    </span>
    <Dialog show={showConfig} class="container-xxl">
      {props.configInfo}
      <div className="my-2 text-center">
        <span className="btn btn-warning text-white" onClick={() => setShowConfig(false)}>关闭</span>
      </div>
    </Dialog>
  </>);
}

function UploadIcon() {
  return (<>
    <span className="btn btn-sm btn-primary">
      <label htmlFor="file-upload">
        <i className="fa-solid fa-upload"></i>
      </label>
    </span>
  </>);
}