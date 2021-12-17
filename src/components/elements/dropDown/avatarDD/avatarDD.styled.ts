import styled from 'styled-components';
import { Menu } from 'antd';

export const MenuStyled = styled(Menu)`
    cursor: pointer;
    background-color: white;
    color: white;
    border-radius: 5px;
    padding: 0;
    overflow: hidden;

    .menu-item{
        background-color: white;
        padding: 0;

        button{
            background-color: white;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            width: 100%;
            padding: 10px 20px;

            display: flex;
            justify-content: space-between;
            align-items: center;

            svg {
                color: lightblue !important;
                margin-right: 10px;
            }

            h4{
                color: lightblue;

                a{
                    color: lightblue; 
                }
            }

            &:hover {
                background-color: lightblue;
                color: white;

                h4{ 
                    color: white;

                    a {
                        color: white;
                    }
                }

                svg {
                    color: white !important;
                }
            }
        }
    }
`;
