import { useCallback, useMemo, useReducer, type Reducer } from 'react';
import {
  getAFromBWithRatio,
  getBFromAWithRatio,
  simplifyRatio,
  type Ratio,
} from './utils';

export type ReducerState = {
  inputA: string;
  inputB: string;
  numA: number | null;
  numB: number | null;
  ratio: Ratio | null;
  locked: boolean;
}

export const initialState: ReducerState = {
  inputA: String(screen.width),
  inputB: String(screen.height),
  numA: screen.width,
  numB: screen.height,
  ratio: simplifyRatio(screen.width, screen.height),
  locked: false,
};

export type ReducerAction =
  { type: 'setInputA', value: string } |
  { type: 'setInputB', value: string } |
  { type: 'setLocked', value: boolean };

const isValid = (value: number) => (
  !isNaN(value) &&
  isFinite(value) &&
  value > 0
);

export const reducer: Reducer<ReducerState, ReducerAction> = (state, action) => {
  switch (action.type) {
    case 'setLocked': {
      if (
        // If trying to lock, and
        action.value &&
        // Not already locked, and
        !state.locked &&
        // Inputs are invalid.
        state.ratio == null
      ) {
        // Ignore
        return state;
      }

      return {
        ...state,
        locked: action.value,
      }
    }

    case 'setInputA': {
      const inputA = action.value;
      const parsedA = Number(inputA);
      const numA = isValid(parsedA) ? parsedA : null;

      if (state.locked) {
        if (numA) {
          const { ratio } = state;
          if (!ratio) return state;

          const numB = getBFromAWithRatio(numA, ratio);
          const inputB = String(numB);

          return {
            ...state,
            inputA,
            inputB,
            numA,
            numB,
          }
        } else {
          return {
            ...state,
            inputA,
            inputB: '',
            numA,
            numB: null,
          }
        }
      } else {
        const { numB } = state;
        const ratio = numA != null && numB != null ?
          simplifyRatio(numA, numB) :
          null;

        return {
          ...state,
          inputA,
          numA,
          ratio,
        };
      }
    }

    case 'setInputB': {
      const inputB = action.value;
      const parsedB = Number(inputB);
      const numB = isValid(parsedB) ? parsedB : null;

      if (state.locked) {
        if (numB) {
          const { ratio } = state;
          if (!ratio) return state;

          const numA = getAFromBWithRatio(numB, ratio);
          const inputA = String(numA);

          return {
            ...state,
            inputA,
            inputB,
            numA,
            numB,
          }
        } else {
          return {
            ...state,
            inputA: '',
            inputB,
            numA: null,
            numB,
          }
        }
      } else {
        const { numA } = state;
        const ratio = numB != null && numA != null ?
          simplifyRatio(numA, numB) :
          null;

        return {
          ...state,
          inputB,
          numB,
          ratio,
        };
      }
    }

    default: return state;
  }
};

export const useController = () => {
  const [{
    inputA,
    inputB,
    numA,
    numB,
    ratio,
    locked,
  }, dispatch] = useReducer(reducer, initialState);

  const setInputA = useCallback((value: string) => {
    dispatch({
      type: 'setInputA',
      value,
    });
  }, []);

  const setInputB = useCallback((value: string) => {
    dispatch({
      type: 'setInputB',
      value,
    });
  }, []);

  const setLocked = useCallback((value: boolean) => {
    dispatch({
      type: 'setLocked',
      value,
    });
  }, []);

  return useMemo(() => ({
    inputA,
    inputB,
    numA,
    numB,
    ratio,
    locked,
    setInputA,
    setInputB,
    setLocked,
  }), [
    inputA,
    inputB,
    numA,
    numB,
    ratio,
    locked,
    setInputA,
    setInputB,
    setLocked,
  ]);
};
