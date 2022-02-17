import styled from 'styled-components';
import { Modal, Menu } from 'antd';
const { SubMenu } = Menu;
export const ManageProjectForCustomerStyled = styled(Modal)`
    margin-bottom: 100px;
    .ant-modal-body{
        padding: 50px 20px;
    }

    .modal__manageProject__container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        &__image {
            border-radius: 100rem;
            border: solid .1px lightgray;
        }

        &__displayname {
            margin-top: 20px;
        }

        &__email {
            margin-top: 20px;
        }

        &__currentProject {
            width: 100%;
            margin-top: 40px;
            justify-self: start;

            .delete-project{
                display: flex;
            }
        }
    }
`;

export const MenuStyled = styled(Menu)`
    
`;

export const SubMenuStyled = styled(SubMenu)`
    
`;

export const MenuItemStyled = styled(Menu.Item)`
    .delete-project{
        display: flex;
        justify-content: space-between;
    }
`;
