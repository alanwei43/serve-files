"use client";
import { OnChangeUpdate } from "@/types";
import { RadioList } from "./RadioList";

export function FilesListOptions(props: { options: FunctionOptions; setOptions: (options: FunctionOptions) => void; }) {
  const { options, setOptions } = props;

  const updateOptions: OnChangeUpdate<typeof options> = (key, value) => {
    setOptions({ ...options, [key]: value })
  };

  return <div>
    <RadioList list={[{ name: "Details", value: "Details" }, { name: "Tiles", value: "Tiles" }]}
      value={options.viewType}
      setValue={val => updateOptions("viewType", val)} />
  </div>;
}

export type FunctionOptions = {
  viewType: "Details" | "Tiles"
  sortType: "Type"
}