"use client"
import React, { ReactEventHandler, useState } from 'react'

type Props = {}

export default function CreateNote({ }: Props) {
  const [note, setNote] = useState("");

  const onSubmit: ReactEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const request = await fetch("/note/api", {
      method: "POST",
      body: JSON.stringify({
        content: note
      })
    });
    if (request.status === 200) {
      setNote("");
    }
  };

  return (
    <div className="tw-my-2">
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="note-content">笔记内容: </label>
          <textarea id="note-content" className="form-control" value={note} onChange={e => setNote(e.target.value)}></textarea>
        </div>

        <div className="tw-my-2">
          <input type="submit" value={"提交"} className="btn btn-primary btn-sm" />
        </div>
      </form>
    </div>
  )
}