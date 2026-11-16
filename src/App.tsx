import type { FC } from 'react';
import Lock from '@mui/icons-material/Lock';
import LockOpen from '@mui/icons-material/LockOpen';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { RatioDisplay } from './RatioDisplay';
import { CHAR_RATIO } from './constants';
import { useController } from './controller';
import {
  getAFromBWithRatio,
  getBFromAWithRatio,
  getProportionWithRatio,
} from './utils';

const percentage = new Intl.NumberFormat(undefined, {
  style: 'percent',
});

export const App: FC = () => {
  const {
    inputA,
    inputB,
    locked,
    setInputA,
    setInputB,
    setLocked,
    ratio,
    gcd,
  } = useController();

  return (
    <Stack spacing={4} sx={{ p: 4 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center', width: '30ch' }}>
        <TextField
          label="A"
          type="number"
          value={inputA}
          onChange={(e) => setInputA(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              sx: {
                color: (theme) => theme.palette.primary.main,
              },
            },
          }}
        />
        <Typography variant="h5">
          {CHAR_RATIO}
        </Typography>
        <TextField
          label="B"
          type="number"
          value={inputB}
          onChange={(e) => setInputB(e.target.value)}
          fullWidth
          slotProps={{
            input: {
              sx: {
                color: (theme) => theme.palette.secondary.main,
              },
            },
          }}
        />
      </Stack>

      <Stack direction="row">
        <Box component="output" sx={{
          p: 1,
          display: 'grid',
          placeItems: 'center',
        }}>
          {ratio ? (
            <RatioDisplay ratio={ratio} />
          ) : (
            <span>N/A</span>
          )}
        </Box>

        <Checkbox
          checked={locked}
          onChange={(_, checked) => setLocked(checked)}
          icon={<LockOpen />}
          checkedIcon={<Lock />}
          disabled={ratio == null}
        />
      </Stack>

      {ratio ? (
        <ul>
          <li>
            <RatioDisplay ratio={[1, getBFromAWithRatio(1, ratio)]} />
          </li>
          <li>
            <RatioDisplay ratio={[getAFromBWithRatio(1, ratio), 1]} />
          </li>
          {/* <li>
            <RatioDisplay ratio={getProportionWithRatio(ratio)} />
          </li> */}
          <li>
            <RatioDisplay ratio={getProportionWithRatio(ratio)} formatter={percentage} />
          </li>
          {gcd == null ? null : (
            <li>GCD = {gcd}</li>
          )}
        </ul>
      ) : null}
    </Stack>
  );
};
