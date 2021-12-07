import { Modal } from 'antd';
import styled from 'styled-components';

export const ShareModalStyled = styled(Modal)`
    padding: 0;
    width: 650px !important;
    background-color: white;

    .share-modal__btn{
        /* padding-bottom: 50px; */
        height: 50px;
        width: 100%;

        button{
            width: 100%;
            height: 100%;

            cursor: pointer;
            padding: 0 30px;
            
            line-height: 100%;
            font-weight: 500;
            font-size: 18px;
            color: #fff;
            
            border-radius: 3px;
            background-color: #ff00fc;

            &:active{
                background-color: #d600d4;
            }
        }
    }

    .share-modal__shared{
        margin: 20px 0 60px 0;
        display: flex;
        justify-content: center;
        align-items: center;

        font-family: ${props => props.theme.fontFamily.submain};
        font-size: ${props => props.theme.fontSize.small2};

        &__add{
            margin-left: 10px;
            border-bottom: 1px dashed #aeacb0;
            color: #aeacb0;
            cursor: pointer;
            transition: all .2s cubic-bezier(.785,.135,.15,.86) 0s;

            &:hover{
                border-bottom-color: #d600d4;
                color: #d600d4;
            }
        }

        &__img{
            display: flex;
            justify-content: center;
            align-items: center;

            div {
                position: relative;
                margin-right: 5px;

                img {
                    width: 40px;
                    height: 40px;
                    object-fit: cover;
                }

                span {
                    cursor: pointer;

                    position: absolute;
                    top: -22px;
                    right: 16px;

                }
            }
        }

        &__text{
            margin-right: 10px;
        }
    }


    .share-modal__body{
        border-top: 1px solid lightgray;
        background-color: #fafbfc;
        padding: 0 50px;
    }

    .share-modal__option{
        margin-top: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 180px;

        &__private{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            height: 100%;
            width: 265px;
            border: 2px solid #ff00fc;
            border-radius: 5px;
            
            img{
                margin-bottom: 20px;
                border-radius: 100rem;
                height: 63px;
                width: 63px;
                object-fit: cover;    
            }

            div{ 
                font-family: ${props => props.theme.fontFamily.submain};
                font-size: ${props => props.theme.fontSize.small2};
                color: #b2b2b2;
                font-weight: 600;
            }
        }
    }

    .share-modal__header{

        &__title{
            font-size: 25px;
            font-family: ${props => props.theme.fontFamily.submain};
            font-weight: 500;
        }

        &__back{
            font-size:25px;
            font-family: ${props => props.theme.fontFamily.submain};
            font-weight: 500;
            cursor: pointer;
        }

        &__close{
            font-size:25px;
            font-family: ${props => props.theme.fontFamily.submain};
            font-weight: 500;
            cursor: pointer;
            transition: all 0.3s ease-out;

            &:hover{
                transform: rotate(90deg);
            }
        }

        border-radius: 10px 10px 0 0;
        background-color: #fff;
        padding: 30px;

        display: flex;
        justify-content: space-between;
    }

    .ant-modal-close{
        display: none;
    }

    .ant-modal-body{
        padding: 0 0 40px 0px;
        background-color: #fafbfc;
    }

    .ant-modal-content{
        border-radius: 10px 10px 0 0;
    }
`;
