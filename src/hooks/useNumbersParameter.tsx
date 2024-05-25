import { useCallback, useState } from "react";

export const useNumberParameter = (
  initialValue: number
): [
  string,
  number,
  React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>,
] => {
  const [input, setInput] = useState(initialValue.toString());
  const [param, setParam] = useState(initialValue);
  const onChangeParam = useCallback<
    React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  >(({ target: { value } }) => {
    if (/^\d*$/.test(value)) {
      setInput(value);
      if (value) {
        setParam(Number(value));
      }
    }
  }, []);

  return [input, param, onChangeParam];
};
