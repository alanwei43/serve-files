import React, { useEffect, useRef } from "react";

export function Dialog(props: {
  show: boolean
  children: React.ReactNode
  style?: React.CSSProperties,
  class?: string
}) {
  const { show, children, style } = props;
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!dialog.current) {
      return;
    }
    show ? dialog.current.showModal() : dialog.current.close();
  }, [show]);

  return (<dialog ref={dialog} style={{
    ...style || {},
    outline: "none",
    borderRadius: "10px",
    border: "1px solid #ddd",
    boxShadow: "#eee 0px 0px 8px 8px"
  }} className={props.class} > {children} </dialog >)
}