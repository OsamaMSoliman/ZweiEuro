import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useWarningOnPath, { TBPUpperLimit } from '../hooks/useWarningOnPath';
import { TPath } from '../interfaces/Paths';

const PathBPLowerLimit: Partial<Record<TPath, TBPUpperLimit>> = {
    "/": "sm",
    "/table": "sm",
    // "/grid": "xs", // TODO: make default
    // "/upload":"xs", // TODO: make default
};

export default function SizeWarning() {
    const [t] = useTranslation();
    const isWarning = useWarningOnPath(PathBPLowerLimit);

    return (
        <Modal show={isWarning}
            backdrop="static"
            keyboard={false}
            centered
        >
            <Modal.Header>
                <Modal.Title>{t('size-warning.title')}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{t('size-warning.body')}</Modal.Body>
            <Modal.Footer>{t('size-warning.footer')}</Modal.Footer>
        </Modal>
    );
};
