import Box from '@mui/material/Box';
import { inputBaseClasses } from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useReducer, type FC } from 'react';
import { actions, initialState, reducer } from './reducer';

const display = (n: number | null): string => n !== null ? String(n) : '';

export const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    srcA,
    srcB,
    fixedA,
    fixedB,
    simpleA,
    simpleB,
    fracA,
    fracB,
    calculatedB,
    calculatedA,
  } = state;

  return (
    <Stack spacing={4} sx={(theme) => ({
      p: 4,
      [`& .${inputBaseClasses.readOnly}`]: {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        cursor: 'default',
      },
    })}>
      <Typography component="h1" variant="h4">Ratio calculator</Typography>

      <Box component="fieldset" sx={{ border: 'none', p: 0, pt: 2 }}>
        <Typography component="legend">Source</Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            width: '30ch',
          }}
        >
          <TextField
            label="A"
            value={srcA}
            onChange={(e) => dispatch(actions.setSrcA(e.target.value))}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B"
            value={srcB}
            onChange={(e) => dispatch(actions.setSrcB(e.target.value))}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{ border: 'none', p: 0, pt: 2 }}>
        <Typography component="legend">Simplified</Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            width: '30ch',
          }}
        >
          <TextField
            label="A"
            value={display(simpleA)}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B"
            value={display(simpleB)}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{ border: 'none', p: 0, pt: 2 }}>
        <Typography component="legend">Simplified (fractional)</Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            width: '30ch',
          }}
        >
          <TextField
            label="A"
            value={display(fracA)}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B"
            value={display(fracB)}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{ border: 'none', p: 0, pt: 2 }}>
        <Typography component="legend">Find B from A</Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            width: '30ch',
          }}
        >
          <TextField
            label="A (input)"
            value={fixedA}
            onChange={(e) => dispatch(actions.setFixedA(e.target.value))}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B (output)"
            value={display(calculatedB)}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
        </Stack>
      </Box>

      <Box component="fieldset" sx={{ border: 'none', p: 0, pt: 2 }}>
        <Typography component="legend">Find A from B</Typography>

        <Stack
          direction="row"
          spacing={1}
          sx={{
            alignItems: 'center',
            width: '30ch',
          }}
        >
          <TextField
            label="A (output)"
            value={display(calculatedA)}
            slotProps={{ input: { readOnly: true } }}
            fullWidth
          />
          <Typography>:</Typography>
          <TextField
            label="B (input)"
            value={fixedB}
            onChange={(e) => dispatch(actions.setFixedB(e.target.value))}
            fullWidth
          />
        </Stack>
      </Box>
    </Stack>
  );
};
