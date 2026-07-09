import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState, type FC } from 'react';

const gcd = (a: number, b: number): number => {
  a = Math.abs(a);
  b = Math.abs(b);

  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }

  return a;
};

const placesToInteger = (n: number, epsilon = 1e-10): number => {
  let k = 0;
  let x = n;

  while (Math.abs(x - Math.round(x)) > epsilon) {
    x *= 10;
    k++;
  }

  return k;
};

const integerScale = (...nums: number[]): number => {
  const k = Math.max(...nums.map(n => placesToInteger(n)));
  return 10 ** k;
};

const simplifyRatio = (a: number, b: number): [number, number] => {
  const mult = integerScale(a, b);
  const aInt = Math.round(a * mult);
  const bInt = Math.round(b * mult);
  const d = gcd(aInt, bInt);

  return [aInt / d, bInt / d];
};

type ResultsProps = {
  srcA: number;
  srcB: number;
}

const Results: FC<ResultsProps> = ({
  srcA,
  srcB,
}) => {
  const [simpleA, simpleB] = simplifyRatio(srcA, srcB);
  const minAB = Math.min(srcA, srcB);

  const [fixedA, setFixedA] = useState('1440');
  const [fixedB, setFixedB] = useState('1440');

  const calculatedB = parseFloat(fixedA) / srcA * srcB;
  const calculatedA = parseFloat(fixedB) * srcA / srcB;

  return (
    <Stack gap={4} sx={{
      [`& .${inputBaseClasses.readOnly}.${outlinedInputClasses.root}`]: {
        backgroundColor: '#0001',
      },
    }}>
      <Box component="fieldset" sx={{
        border: 'none',
        p: 0,
        pt: 2,
      }}>
        <Typography component="legend">Simplified</Typography>

        <Stack direction="row" gap={1} alignItems="center" width="30ch">
          <TextField
            label="A"
            value={simpleA}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B"
            value={simpleB}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{
        border: 'none',
        p: 0,
        pt: 2,
      }}>
        <Typography component="legend">Simplified (fractional)</Typography>

        <Stack direction="row" gap={1} alignItems="center" width="30ch">
          <TextField
            label="A"
            value={srcA / minAB}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B"
            value={srcB / minAB}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{
        border: 'none',
        p: 0,
        pt: 2,
      }}>
        <Typography component="legend">Find B from A</Typography>

        <Stack direction="row" gap={1} alignItems="center" width="30ch">
          <TextField
            label="A (input)"
            value={fixedA}
            onChange={(e) => setFixedA(e.target.value)}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B (output)"
            value={calculatedB}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{
        border: 'none',
        p: 0,
        pt: 2,
      }}>
        <Typography component="legend">Find A from B</Typography>

        <Stack direction="row" gap={1} alignItems="center" width="30ch">
          <TextField
            label="A (output)"
            value={calculatedA}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B (input)"
            value={fixedB}
            onChange={(e) => setFixedB(e.target.value)}
            fullWidth
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export const App: FC = () => {
  const [srcA, setSrcA] = useState('1920');
  const [srcB, setSrcB] = useState('1080');

  const srcANumber = parseFloat(srcA);
  const srcBNumber = parseFloat(srcB);

  const isValid = (
    !isNaN(srcANumber) &&
    isFinite(srcANumber) &&
    srcANumber > 0 &&
    !isNaN(srcBNumber) &&
    isFinite(srcBNumber) &&
    srcBNumber > 0
  );

  return (
    <Stack gap={4} p={4}>
      <Stack direction="row" gap={1} alignItems="center" width="30ch">
        <TextField
          label="A"
          value={srcA}
          onChange={(e) => setSrcA(e.target.value)}
          fullWidth
        />
        <Typography>:</Typography>
        <TextField
          label="B"
          value={srcB}
          onChange={(e) => setSrcB(e.target.value)}
          fullWidth
        />
      </Stack>

      {isValid ? (
        <Results
          srcA={srcANumber}
          srcB={srcBNumber}
        />
      ) : null}
    </Stack>
  );
};
