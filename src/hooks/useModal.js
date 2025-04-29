import {useCallback, useEffect, useRef} from "react";
import { Modal } from 'bootstrap';

function useModal(options = {}) {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);

    useEffect(() => {
        if(modalRef.current && !modalInstance.current) {
            modalInstance.current = new Modal(modalRef.current, options)
        }

        return () => {
            if(modalInstance.current) {
                modalInstance.current.dispose();
                modalInstance.current = null;
            }
        };
    },[options]);

    const showModal = useCallback(() => {
        if(modalInstance.current) {
            modalInstance.current.show();
        }
    }, []);

    const hideModal = useCallback(() => {
        if(modalInstance.current) {
            modalInstance.current.hide();
        }
    }, []);

    return {modalRef, showModal, hideModal};
} export default useModal;