"use client";
import React, { useEffect } from 'react'

type Props = {}

export default function NotesList({ }: Props) {

  useEffect(() => {
    (async () => {
      const request = await fetch("/note/api", { method: "GET" })
      const response = await request.json();
      console.log("r: ", response);
    })();
  }, []);

  return (<div> </div>);
}