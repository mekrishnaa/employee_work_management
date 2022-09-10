import React from 'react';
import ReactDom from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onHide}></div>
};

const ModalOverlay = props => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
};

const portalElement = document.getElementById('overlays');

const Modal = props => {
   return <React.Fragment>
        {/* <Backdrop />
        <ModalOverlay /> */}
        {ReactDom.createPortal(<Backdrop onHide={props.onHideModal}/>,portalElement)}
        {ReactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>,portalElement)}
    </React.Fragment>
}
export default Modal;