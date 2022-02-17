import styled from 'styled-components';
import { Modal } from 'antd';

export const DeleteCustomerModalStyled = styled(Modal)`


    .delete-user-modal__container{
        padding-top: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        > * {
            margin: 20px 0;
        }

        .delete-user-modal__{
            &question{
                font-size: ${props => props.theme.fontSize.normal1};
                text-transform: uppercase;
                font-weight: 600;
                color: red;


            }

            &name{
                font-size: ${props => props.theme.fontSize.normal3};
                font-weight: 500;
                
            }

            &btn{
                width: 100%;

                button{
                    width: 100%;
                    padding: 5px 10px;
                    border-radius: 5px;
                    font-size: ${props => props.theme.fontSize.small1};
                    background-color: red;
                    color: white;
                    cursor: pointer;
                }
            }
        }
    }
`;
