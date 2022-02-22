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
                position: relative;
                .name {
                    padding: 10px;
                    border: 1px solid lightgray;
                    cursor: pointer;
                    height: 40px;
                    border-radius: 6px;
                }
                .menu{
                    height: fit-content;
                    top: 0%;
                    overflow: hidden;
                    position: absolute;
                    z-index: 1000;
                    width: 110%;
                    left: 103%;
                    transition: all 0.3s ease-out;

                    animation: growDown 300ms ease-in-out forwards;
                    transform-origin: top center;
                    @keyframes growDown {
                        0% {
                            transform: scaleY(0)
                        }
                        80% {
                            transform: scaleY(1.1)
                        }
                        100% {
                            transform: scaleY(1)
                        }
                    }
                    
                    ul {
                        width: 100%;
                        margin: 0px;
                        display: grid;
                        gap: 3px;

                        transition: all 0.3s ease-out;
                        li {
                            height: 40px;
                            background-color: lightgray;
                            list-style-type: none;
                            padding: 5px 10px;
                            border-radius: 5px;
                            
                            display: flex;
                            align-items: center;
                            
                            white-space: nowrap;
                            width: 100%;
                            overflow: hidden;
                            text-overflow: ellipsis;

                            cursor: pointer;
                            transition: all 0.3s ease-out;
                        }

                        li.menu__li-invited {
                            background-color: lightgreen;
                            transition: all 0.3s ease-out;
                        }
                    }
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
