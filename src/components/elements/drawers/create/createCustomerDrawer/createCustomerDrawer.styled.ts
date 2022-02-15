import styled from 'styled-components';
import { Drawer } from 'antd';

export const CreateNewCustomerDrawerStyled = styled(Drawer)`
    .create-new-user__container{
        
        .custom-file-upload {
            cursor: pointer;
            padding-bottom: 20px;

            input[type=file] {
                width: 100%;
                height: 35px;
                margin-top: 5px;
            }
        }
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
