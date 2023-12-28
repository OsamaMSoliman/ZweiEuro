import { Modal } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';
import useViewportWidth from '../hooks/useViewportWidth';
import { useLocation } from 'react-router-dom';

export default function SizeWarning() {
    const [t] = useTranslation();

    const vpWidth = useViewportWidth();
    const { pathname } = useLocation();
    console.log(pathname, vpWidth);

    const condition = false;

    if (condition) {
        return (
            <Modal show centered static>
                <Modal.Header>
                    <Modal.Title>{t('size-warning.title')}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{t('size-warning.body')}</Modal.Body>
                <Modal.Footer>{t('size-warning.footer')}</Modal.Footer>
            </Modal>
        );
    }

    return null;
};
