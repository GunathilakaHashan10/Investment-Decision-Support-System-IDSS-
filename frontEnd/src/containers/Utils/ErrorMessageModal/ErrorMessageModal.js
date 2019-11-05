import React from 'react';
import modalStyles from './ErrorMessageModal.css';

const ErrorMessageModal = (props) => {
    return (
        <div id={modalStyles.modal}>
            <div id={modalStyles.modal_container}>
                <h2 id={modalStyles.error_message}>{`${props.error}. Please try again`}</h2>
                <div id={modalStyles.button_container}>
                    <button
                        onClick={props.closeModal}
                    >
                    OK
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ErrorMessageModal;