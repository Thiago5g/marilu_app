import styled from 'styled-components'
import backgroundImage from './assets/fundo2 - marilu.png'

export const LoginContainer = styled.div`
  background-image: url('${backgroundImage}');
  background-size: cover;
  background-repeat: no-repeat;
  opacity: .5;
  height: 100vh;
  `;

export const LoginCard = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  width: 550px;
  transform: translate(-50%,-50%);

  .input-group{
        input, span{
            color: #fff !important;
            border-color: #fff !important;
            ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
            color: #fff;
            }

            :-ms-input-placeholder { /* Internet Explorer 10-11 */
            color: #fff;
            }

            ::-ms-input-placeholder { /* Microsoft Edge */
            color: #fff;
            }
        }
    }

    .btn-forgot-password{
        color: #fff;
    }

    /* .bg-primary{
        opacity: .8;
    } */

`;

export const B = styled.b`
  font-weight: 600;
`
