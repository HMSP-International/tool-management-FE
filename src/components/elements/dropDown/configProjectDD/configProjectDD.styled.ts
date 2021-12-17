import styled from 'styled-components';
import { Dropdown, Menu } from 'antd';

export const DropDownStyled = styled(Dropdown)`
    padding: 8px 10px 4px 10px;  
    cursor: pointer;
    background-color: lightblue;
    color: white;
    border-radius: 10px;
`;

export const MenuStyled = styled(Menu)`
    cursor: pointer;
    background-color: lightblue;
    color: white;
    border-radius: 5px;
    padding: 0;
    overflow: hidden;

    .menu-item{
        background-color: lightblue;
        padding: 0;

        button{
            background-color: lightblue;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            width: 100%;
            padding: 10px 20px;

            &:hover {
                background-color: white;
                color: lightblue;
            }
        }
    }
`;
