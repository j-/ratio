import { simplifyRatio } from './utils';

export type State = {
  srcA: string;
  srcB: string;
  fixedA: string;
  fixedB: string;
  simpleA: number | null;
  simpleB: number | null;
  fracA: number | null;
  fracB: number | null;
  calculatedB: number | null;
  calculatedA: number | null;
};

export type Action =
  | { type: 'SET_SRC_A'; value: string }
  | { type: 'SET_SRC_B'; value: string }
  | { type: 'SET_FIXED_A'; value: string }
  | { type: 'SET_FIXED_B'; value: string };

const parsePositive = (s: string): number | null => {
  const n = parseFloat(s);
  return isFinite(n) && n > 0 ? n : null;
};

const deriveOutputs = (
  srcA: string,
  srcB: string,
  fixedA: string,
  fixedB: string,
): Pick<State, 'simpleA' | 'simpleB' | 'fracA' | 'fracB' | 'calculatedB' | 'calculatedA'> => {
  const srcANum = parsePositive(srcA);
  const srcBNum = parsePositive(srcB);
  const fixedANum = parsePositive(fixedA);
  const fixedBNum = parsePositive(fixedB);

  if (srcANum === null || srcBNum === null) {
    return { simpleA: null, simpleB: null, fracA: null, fracB: null, calculatedB: null, calculatedA: null };
  }

  const [simpleA, simpleB] = simplifyRatio(srcANum, srcBNum);
  const minAB = Math.min(srcANum, srcBNum);

  return {
    simpleA,
    simpleB,
    fracA: srcANum / minAB,
    fracB: srcBNum / minAB,
    calculatedB: fixedANum !== null ? fixedANum / srcANum * srcBNum : null,
    calculatedA: fixedBNum !== null ? fixedBNum * srcANum / srcBNum : null,
  };
};

export const initialState: State = {
  srcA: '1920',
  srcB: '1080',
  fixedA: '1440',
  fixedB: '1440',
  ...deriveOutputs('1920', '1080', '1440', '1440'),
};

export const actions = {
  setSrcA: (value: string): Action => ({ type: 'SET_SRC_A', value }),
  setSrcB: (value: string): Action => ({ type: 'SET_SRC_B', value }),
  setFixedA: (value: string): Action => ({ type: 'SET_FIXED_A', value }),
  setFixedB: (value: string): Action => ({ type: 'SET_FIXED_B', value }),
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_SRC_A': {
      const srcA = action.value;
      return { ...state, srcA, ...deriveOutputs(srcA, state.srcB, state.fixedA, state.fixedB) };
    }
    case 'SET_SRC_B': {
      const srcB = action.value;
      return { ...state, srcB, ...deriveOutputs(state.srcA, srcB, state.fixedA, state.fixedB) };
    }
    case 'SET_FIXED_A': {
      const fixedA = action.value;
      return { ...state, fixedA, ...deriveOutputs(state.srcA, state.srcB, fixedA, state.fixedB) };
    }
    case 'SET_FIXED_B': {
      const fixedB = action.value;
      return { ...state, fixedB, ...deriveOutputs(state.srcA, state.srcB, state.fixedA, fixedB) };
    }
  }
};
