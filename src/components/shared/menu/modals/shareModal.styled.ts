import { Modal } from 'antd';
import styled from 'styled-components';

export const ShareModalStyled = styled(Modal)`
    padding: 0;
    width: 650px !important;
    background-color: white;

    .share-modal__body{
        background-color: #fafbfc;
    }

    .share-modal__option{
        
    }

    .share-modal__header{

        &__title{
            font-size:25px;
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
        padding: 50px;

        display: flex;
        justify-content: space-between;
    }

    .ant-modal-close{
        display: none;
    }

    .ant-modal-body{
        padding: 0;
    }

    .ant-modal-content{
        border-radius: 10px 10px 0 0;
    }
`;
