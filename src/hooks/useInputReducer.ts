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

export function useInputReducer<T, E = HTMLElement>(
  initialValue: T,
): [
  { ref: E | null } & State<T>,
  {
    setRef: React.Dispatch<React.SetStateAction<E | null>>;
    change: (value: T) => void;
    validate: (fn: (value: T) => boolean) => boolean;
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
      validate: (fn) => {
        const valid = fn(state.value);
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
