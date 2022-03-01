import styled from 'styled-components';
import { Modal } from 'antd';

export const AddCustomerToProjectModalStyled = styled(Modal)`
    padding: 0;

    .modal-add-customer-to-project{
        .input-email{
            input { 
                padding: 5px 10px;
                border-radius: 5px;
                border: 1px solid lightgray;
            }

            button { 
                margin-left: 20px;
                padding: 5px 10px;
                cursor: pointer;
                border-radius: 5px;
                transition: all 0.1s ease-in-out;

                &:hover{
                    background-color: lightblue;
                    color: white;
                }
            }
        }

        .group-email{
            display: flex;
            flex-direction: column;

            &__item {
                padding: 10px 0px;

                display: flex;
                .email{
                    padding-left: 20px;
                    flex-grow: 1;
                }

                .delete {
                    cursor: pointer;
                    color: red;
                }
            }
        }
    }
`;
