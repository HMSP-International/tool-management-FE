import { Modal } from 'antd';
import styled from 'styled-components';

export const ModalStyled = styled(Modal)`
    padding: 0;
    max-width: 1700px;
    height: 90vh;

    .task-detail__container{
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-columns: 1.5fr 1fr;
        grid-template-rows: 50px 1fr;

        .task-detail__assign{
            padding: 10px 20px;
            overflow-y: scroll;
            display: flex;
            flex-direction: column;

            &::-webkit-scrollbar {
                height: 10px;
                width: 10px;
                cursor: pointer;
            }

            &::-webkit-scrollbar-thumb {
                background: linear-gradient(to right, #232526, #414345);
                cursor: pointer;
                transition: all 0.3s ease-out;

                &:hover {
                    background: linear-gradient(to right, #414345, #232526);
                }

                &:active {
                    background: linear-gradient(to right, #232526, #414345);
                }
            }

            &__timestamp{
                margin: 20px;

                > *{
                    padding: 5px 0;
                    font-size: ${props => props.theme.fontSize.mini};
                }
            }

            .task-detail__group-btn{
                display: flex;
                flex: 1;
            }

            &__detail{
                .table{
                    margin-top: 20px;
                    display: flex;
                    flex-direction: column;
                    border: 1px solid lightgray;
                    border-radius: 5px;
                }

                .title{
                    margin: 50px 0px 10px 0;
                    padding: 5px 4px 5px 7px;
                    background-color: white;
                    font-size: ${props => props.theme.fontSize.small2};
                    font-weight: 500;
                    border-radius: 5px;
                    display: inline-block;
                    width: auto;
                    min-width: 70px;
                    color: back;
                    box-shadow: 0px 0px 5px 1px lightblue;
                }
            }

            &__list-selection{
                select{
                    background-color: lightblue;
                    font-size: ${props => props.theme.fontSize.small2};
                    font-weight: 500;
                    border-radius: 5px;
                    cursor: pointer;
                    border: none;
                    outline: none;
                    padding: 5px 4px 5px 7px;
                    /* appearance: none; */
                    width: auto;
                    min-width: 70px;
                    color: white;
                    transition: all 0.3s ease-out;

                    option{
                        border: none;
                        outline: none;
                        overflow: hidden;
                    }

                    &:hover{
                        background-color: #6db9d1;
                        option{
                            background-color: #6db9d1;
                        }
                    }
                }
            }

            &__btn {
                flex-grow: 1;

                display: flex;
                justify-content: flex-end;
                align-items: flex-end;

                button {
                    cursor: pointer;
                    padding: 5px 10px;
                    border-radius: 45% 46% 40% 48% / 28% 24% 64% 63%;
                    background: linear-gradient(to right, #EECDA3, #F4E2D8);
                }
            }

            &__btn-delete {
                flex-grow: 1;

                display: flex;
                justify-content: flex-end;
                align-items: flex-end;

                button {
                    cursor: pointer;
                    padding: 5px 10px;
                    border-radius: 45% 46% 40% 48% / 28% 24% 64% 63%;
                    background: linear-gradient(to right, red, red);
                }
            }
        }

        .task-detail__description{
            border-right: 2px solid gray;

            overflow-y: scroll;

            &::-webkit-scrollbar {
                height: 10px;
                width: 10px;
                cursor: pointer;
            }

            &::-webkit-scrollbar-thumb {
                background: linear-gradient(to right, #232526, #414345);
                cursor: pointer;
                transition: all 0.3s ease-out;

                &:hover {
                    background: linear-gradient(to right, #414345, #232526);
                }

                &:active {
                    background: linear-gradient(to right, #232526, #414345);
                }
            }

            .des-task{
                color: #172b4d;
                font-size: ${props => props.theme.fontSize.small2};
                font-weight: 500;
                padding: 10px 0;
                min-height: 200px;
                height: auto;

                button{
                    margin-left: 20px;
                    padding: 5px 10px;
                    color: #172b4d;
                    font-size: ${props => props.theme.fontSize.small2};
                    border-radius: 5px;
                    cursor: pointer;
                }

                &__des-list{
                    margin: 10px 0 10px 50px;
                    li{
                        padding: 3px 5px;
                    }
                }

                &__content{
                    background-color: lightblue;
                    color: white;
                    padding: 4px 10px;
                    border-radius: 5px;
                    max-width: 140px;
                    cursor: pointer;
                    transition: all 0.3s ease-out;

                    &:hover{
                        background-color: #6db9d1;
                    }
                }

                input{ 
                    width: 70%;
                    border: none;
                    outline: none;
                    padding: 10px 0 5px 0;
                    font-size: ${props => props.theme.fontSize.small3};
                    border-bottom: 1px solid lightgray;
                }

                .html-tags {
                    margin-top: 20px;
                }
            }
        }

        .task-detail__header{
            grid-column: 1 / span 2;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            &__tag{
                background-color: lightgray;
                padding: 3px 5px;
                border-radius: 5px;
                font-weight: 500;
            }

            &__close{
                font-size: 20px;
                font-weight: bold;
                cursor: pointer;

                transition: all 0.3s ease-out;

                &:hover{
                    transform: rotate(90deg);
                }
            }
        }
    }

    .ant-modal-content{
        height: 100%;
        width: 100%;
        border-radius: 20px;
    }

    .ant-modal-close-x{
        display: none;
    }

    .ant-modal-body{
        height: 100%;
        width: 100%;
        padding: 10px 20px;
    }
`;
