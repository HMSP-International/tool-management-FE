import { Modal } from 'antd';
import styled from 'styled-components';

export const WorkSpaceModalStyled = styled(Modal)`
    padding: 0;
    width: 650px !important;

    .modal__work-space-modal__btn-group{
        display: grid;
        gap: 3%;
        grid-template-columns: 1fr 1fr 1fr;
    }

    .modal__work-space-modal__button{
        height: 50px;
        width: 100%;

        button{
            width: 100%;
            height: 100%;

            cursor: pointer;
            padding: 0 20px;
            
            line-height: 100%;
            font-weight: 500;
            font-size: 16px;
            color: #fff;
            
            border-radius: 3px;
            background-color: lightblue;

            &:active{
                background-color: #6db9d1; 
            }
        }
    }

    .modal__work-space-modal__input{
        /* display: flex;
        flex-direction: column; */
        margin: 80px 0;
        height: 150px;

        input {
            transition: all .2s cubic-bezier(.785,.135,.15,.86) 0s;
            width: 100%;
            flex-grow: 1;
            display: block;
            border: 0;
            color: rgba(34,34,34,.6);
            font-size: 16px;
            padding: 16px 20px 12px 0;
            outline: none;
            background: transparent;
            border-bottom: 1px solid rgba(34,34,34,.6);
        }

        label{
            display: inline-block;
            font-family: ${props => props.theme.fontFamily.submain};
            font-size: 14px;
            font-weight: 500;
            margin-top: 25px;
        }
    }

    .modal__work-space-modal__title{
        text-align: center;
        font-family: ${props => props.theme.fontFamily.submain};
        font-size: 25px;
        font-weight: 600;
    }

    .modal__work-space-modal__logo{
        margin: 50px 0 0 0;
        img{
            width:100%;
            object-fit: cover;
        }
    }

    .ant-modal-close-x{
        span{
            padding: 20px 10px 0 0;
        }

        svg{ 
            font-size: 25px;
            transition: all 0.3s ease-out;

            &:hover{
                transform: rotate(90deg);
            }
        }
    }
    
    .ant-modal-content{
        width: 650px;
        border-radius: 10px 10px 0 0 ;
    }
`;
