import { keyframes, styled } from "@mui/material";

const spin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`;


export const Spinner = styled('div')(() => ({
  svg : {
    transformOrigin: '50% 50%',
    width: '1rem',
    height: '1rem',
    animation: `${spin} 1s linear infinite`,
    marginRight: '.5rem',
  }
}));