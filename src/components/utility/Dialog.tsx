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

  return (<dialog ref={dialog} style={style} className={props.class}> {children} </dialog>)
}