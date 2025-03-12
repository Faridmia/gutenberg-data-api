import { useDispatch } from '@wordpress/data';
import { Button, Modal, TextControl } from '@wordpress/components';
import { useState } from '@wordpress/element';
import PageForm from './PageForm';
function CreatePageButton() {
    const [isOpen, setOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setOpen(true)} variant="primary">
                Create a New Page
            </Button>
            {isOpen && (
                <Modal onRequestClose={() => setOpen(false)} title="Create a New Page">
                    <PageForm onCancel={() => setOpen(false)} onSaveFinished={() => setOpen(false)} />
                </Modal>
            )}
        </>
    );
}

export default CreatePageButton;