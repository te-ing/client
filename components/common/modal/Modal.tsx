import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import * as S from './Modal.style';
import type { ModalPropsType } from './Modal.type';

const Modal: React.FC<ModalPropsType> = ({isShowing, hide, children}) => {
    if(isShowing) {
        return ReactDOM.createPortal(
            <Fragment>
                <S.BodyBlackoutStyle onClick={hide}/>
                {children}
            </Fragment>,
            document.querySelector('#portal-section')
        )
    } else return null;
}

export default Modal;