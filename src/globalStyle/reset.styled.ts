import { createGlobalStyle } from 'styled-components';

const ResetStyled = createGlobalStyle`
*,
*::after,
*::before {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
	font-size: 10px;
	font-family: Roboto, Arial, Helvetica, sans-serif;
}


}
`;

// @font-face{
//     font-family: "UTM Bebas";
//     src: url("/static/fonts/UTMBebas/UTM Bebas.ttf") format("truetype");
//     font-weight: 400;
//     font-style: normal;
// }

export default ResetStyled;
