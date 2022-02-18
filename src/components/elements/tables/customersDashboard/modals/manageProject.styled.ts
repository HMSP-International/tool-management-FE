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
            margin-top: 20px;
            width: 100%;
            justify-self: start;
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 20px;

            &__item {
                /* position: relative; */
                .name {
                    padding: 10px;
                    border: 1px solid lightgray;
                    cursor: pointer;
                    position: absolute;
                }
                .menu{
                    /* position: absolute; */
                    z-index: 1000;
                    bottom: -10px;
                }
            }
        }

        &__dropdown {
            width: 100%;
            justify-self: start;
            height: 40px;

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
