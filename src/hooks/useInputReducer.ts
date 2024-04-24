import { useReducer, useState } from 'react';

type State<T> = {
  value: T;
  invalid: boolean;
};

type ReducerType = 'SET_REF' | 'CHANGE_VALUE' | 'VALIDATE';
const reducer = <T>(
  prev: State<T>,
  action: {
    type: ReducerType;
    value: T;
    invalid?: boolean;
  },
) => {
  switch (action.type) {
    case 'CHANGE_VALUE': {
      return {
        ...prev,
        value: action.value,
      };
    }
    case 'VALIDATE': {
      return {
        ...prev,
        invalid: action.invalid || false,
      };
    }
    default: {
      return prev;
    }
  }
};

export enum VALIDATION_TYPE {
  NOT_EMPTY_STRING,
}
const VALIDATE = {
  [VALIDATION_TYPE.NOT_EMPTY_STRING]: <T>(v: T) => v !== '',
};

export function useInputReducer<T, E extends HTMLElement>(
  initialValue: T,
  validation?: {
    type?: VALIDATION_TYPE;
    func?: (value: T) => boolean;
  },
): [
  { ref: E | null } & State<T>,
  {
    setRef: React.Dispatch<React.SetStateAction<E | null>>;
    change: (value: T) => void;
    validate: () => boolean;
  },
] {
  const [ref, setRef] = useState<E | null>(null);
  const [state, dispatch] = useReducer(reducer<T>, {
    value: initialValue,
    invalid: false,
  });

  return [
    {
      ref,
      ...state,
    },
    {
      setRef,
      change: (value) =>
        dispatch({
          type: 'CHANGE_VALUE',
          value,
        }),
      validate: () => {
        let valid = true;
        if (validation?.type !== undefined)
          valid = VALIDATE[validation?.type](state.value);
        if (validation?.func !== undefined)
          valid = validation.func(state.value);

        dispatch({
          type: 'VALIDATE',
          value: state.value,
          invalid: !valid,
        });
        return valid;
      },
    },
  ];
}
