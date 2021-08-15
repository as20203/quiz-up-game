import { useState, ChangeEvent, Dispatch } from 'react';

type UseForm<T> = [
  T,
  (
    event: ChangeEvent<
      | HTMLTextAreaElement
      | HTMLInputElement
      | {
          name?: string;
          value: unknown;
        }
    >
  ) => void,
  Dispatch<React.SetStateAction<T>>
];
const useForm = <T>(formValues: T): UseForm<T> => {
  const [state, setState] = useState(formValues);
  const handleChange = (
    event: ChangeEvent<
      | HTMLTextAreaElement
      | HTMLInputElement
      | {
          name?: string;
          value: unknown;
        }
    >
  ) => {
    event.persist();
    const [eventName] = [event.target.name];
    if (eventName) {
      setState(state => ({ ...state, [eventName]: event.target.value }));
    }
  };

  return [state, handleChange, setState];
};

export { useForm };
