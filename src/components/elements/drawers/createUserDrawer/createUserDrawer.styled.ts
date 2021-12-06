import styled from 'styled-components';
import { Drawer } from 'antd';

export const CreateNewUserDrawerStyled = styled(Drawer)`
    .create-new-user__container{
    }

    .btn-submit{
        margin-top: 40px;

        button{ 
            transition: all 1s ease-out;
            cursor: pointer;
        }

        .canNotSubmit{
            width: 100%;
            padding: 5px 0;
            border-radius: 5px;
            pointer-events: none;

        }
        
        .canSubmit { 
            width: 100%;
            padding: 5px 0;
            border-radius: 5px;
            
            background-color: lightblue;
            color: white;
            
            &:hover{
                background-color: blue;
            }
        }
    }
`;