import styled from 'styled-components';
import { Modal } from 'antd';

export const ProjectModalStyled = styled(Modal)`
    padding: 0;

    .project-modal__footer{
        display: flex;
        justify-content: flex-end;
        padding: 30px;

        &__button{
            button{
                padding: 12px 24px;
                background-color: lightblue;
                border-radius: 5px;
                cursor: pointer;
                color: #fff;
                font-size: ${props => props.theme.fontSize.small1};
                font-weight: 500;

                transition: all 0.3s ease-in-out;

                &:hover{
                    background-color: #6db9d1;
                }
            }
        }
    }

    .project-modal__body{
        padding: 0 30px;
        .project-modal__body__input{
            min-height: 150px;
            margin-top: 30px;
            display: flex;
            flex-direction: column;

            input{ 
                padding: 10px 20px;
                outline: none;
                border: 1px solid lightgray;
                border-radius: 5px;
            }

            label{
                padding: 5px 0;
                font-size: 16px;
                font-weight: 500;
            }
        }
    }


    .project-modal__header{
        background-color: #fff;
        border-bottom: 1px solid lightgray;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 30px;

        &__title{
            font-weight: 600;
            font-size: ${props => props.theme.fontSize.normal2};
        }

        &__close{
            font-weight: 500;
            font-size: ${props => props.theme.fontSize.normal3};
            cursor: pointer;

            transition: transform 0.3s ease-in-out;

            &:hover{
                transform: rotate(90deg);
            }
        }
    }

    .project-modal__container{
        background-color: #fafbfc;
        height: auto;
        width: 100%;
    }

    .ant-modal-close-x {
        display: none;
    }

    .ant-modal-content{
        border-radius: 10px;
        height: auto;
        overflow: hidden;
    }

    .ant-modal-body{
        padding: 0;
        height: auto;
    }
`;
