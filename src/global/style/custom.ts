import { createGlobalStyle } from 'styled-components';

const CustomStyled = createGlobalStyle`
    .border-error{
        border: 1px solid red !important;
    }

    .text-error{
        color: red !important;
    }
`;

export default CustomStyled;
