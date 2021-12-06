import { createGlobalStyle } from 'styled-components';

const app = createGlobalStyle`
    .app{
        display: grid;
        grid-template-columns: auto 1fr;
        
        overflow: hidden;
    }
`;

export default app;
