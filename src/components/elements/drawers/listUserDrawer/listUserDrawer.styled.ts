import styled from 'styled-components';
import { Drawer } from 'antd';

export const ListUserDrawerStyled = styled(Drawer)`
        .list-user-drawer{ 
            .search{
                input{
                    width: 100%;
                    padding: 5px 10px;
                    border-radius: 5px;         
                }
            }

            .list{
                > *{
                    margin: 10px 0;
                    
                    p{ 
                        padding: 5px 10px;
                        cursor: pointer;
                        transition: all 0.5s ease-out;
                        
                        &:hover{   
                            background-color: lightgray;
                        }
                    }
                }
            }
        }
    `;
