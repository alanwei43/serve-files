export type RadioItem<TValue extends string> = { name: string, value: TValue, title?: string };

export function RadioList<TValue extends string>(props: {
  list: Array<RadioItem<TValue>>;
  value: TValue;
  setValue: (val: TValue) => void;
}) {
  const name = Math.random() + "";
  const { list, value, setValue } = props;
  const renderList: Array<RadioItem<TValue>> = list;

  return (<>
    {renderList.map(item => (<label key={item.value + ""} title={item.title}>
      <input type="radio"
        name={name}
        value={item.value}
        checked={item.value === value}
        onChange={e => setValue(e.target.value as TValue)} /> {item.name} &nbsp;
    </label>))}
  </>);
}
