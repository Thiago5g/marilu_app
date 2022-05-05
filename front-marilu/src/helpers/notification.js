import { store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

export const Notification = (content, type = 'success', time = 2000) => {
    const parseType = {success: 'Sucesso', default: '', warning: 'Atenção', info: 'Informação', danger: 'Erro' }
    store.addNotification({
        title: parseType[type],
        message: content,
        type: type,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2000,
          onScreen: true,
          showIcon: true,
        },
      })
}