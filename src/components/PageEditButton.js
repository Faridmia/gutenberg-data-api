import { useState } from "react"; // Import useState
import { useDispatch } from "@wordpress/data";
import { Button, Modal, TextControl } from "@wordpress/components";
import EditPageForm from "./EditPageForm";

export default function PageEditButton( { pageId } ) {
    const [ isOpen, setOpen ] = useState( false );
    const openModal = () => setOpen( true );
    const closeModal = () => setOpen( false );
    return (
        <>
            <Button onClick={ openModal } variant="primary">
                Edit
            </Button>
            { isOpen && (
                <Modal onRequestClose={ closeModal } title="Edit page">
                    <EditPageForm
                        pageId={ pageId }
                        onCancel={ closeModal }
                        onSaveFinished={ closeModal }
                    />
                </Modal>
            ) }
        </>
    );
}
 