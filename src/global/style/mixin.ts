import { css } from 'styled-components';

interface IProps {
	fontFamily?: string;
	fontWeight?: string;
	fontSize?: string;
}

export const FontFamily = ({ fontFamily = 'Segoe UI, sans-serif', fontWeight }: IProps) => css`
	font-family: ${fontFamily};
	font-weight: ${fontWeight};
`;
