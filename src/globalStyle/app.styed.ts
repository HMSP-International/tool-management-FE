import { createGlobalStyle } from 'styled-components';

const app = createGlobalStyle`
    .app{
        display: grid;
        grid-template-columns: 300px 1fr;
    }
`;

export default app;
