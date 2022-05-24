import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

const useForm = <T>(
  initialData?: T
): [T, Dispatch<SetStateAction<T>>, (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void] => {
  const [values, setValues] = useState(initialData);
  const handler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      console.log(name, value);
      setValues({ ...values, [name]: value });
    },
    [values, setValues]
  );

  return [values, setValues, handler];
};

export default useForm;
