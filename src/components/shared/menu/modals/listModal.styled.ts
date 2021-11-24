import styled from 'styled-components';
import { Modal } from 'antd';

export const ListModalStyled = styled(Modal)`
    padding: 0;

    .list-modal__header{
        display: flex;
        align-items: center;
        justify-content: space-between;

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

    .list-modal__container{
        height: auto;
        width: 100%;
        padding: 30px;
    }

    .ant-modal-close-x {
        display: none;
    }

    .ant-modal-content{
        border-radius: 10px;
        height: auto;
    }

    .ant-modal-body{
        padding: 0;
        height: auto;
    }
`;
