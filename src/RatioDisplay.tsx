import type { FC } from 'react';
import Box from '@mui/material/Box';
import { CHAR_RATIO } from './constants';
import { type Ratio } from './utils';

const defaultFormatter = Intl.NumberFormat(undefined, {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  useGrouping: false,
});

export type RatioDisplayProps = {
  ratio: Ratio;
  formatter?: Intl.NumberFormat;
};

export const RatioDisplay: FC<RatioDisplayProps> = ({
  ratio: [n, d],
  formatter = defaultFormatter,
}) => (
  <Box
    component="span"
    sx={{
      display: 'inline-flex',
      alignItems: 'center',
      fontVariantNumeric: 'tabular-nums',
    }}
  >
    <Box
      component="span"
      sx={{
        color: (theme) => theme.palette.primary.main,
      }}
    >
      {formatter.format(n)}
    </Box>

    <span>&thinsp;{CHAR_RATIO}&thinsp;</span>

    <Box
      component="span"
      sx={{
        color: (theme) => theme.palette.secondary.main,
      }}
    >
      {formatter.format(d)}
    </Box>
  </Box>
);
