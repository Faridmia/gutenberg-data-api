import { SearchControl, Spinner, Button, Modal, TextControl } from "@wordpress/components";
import { useState, render, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { decodeEntities } from "@wordpress/html-entities";
import './index.scss';


function MyFirstApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const { pages, hasResolved } = useSelect(
        (select) => {
            const query = searchTerm ? { search: searchTerm } : {};
            return {
                pages: select(coreDataStore).getEntityRecords('postType', 'page', query),
                hasResolved: select(coreDataStore).hasFinishedResolution('getEntityRecords', ['postType', 'page', query]),
            };
        },
        [searchTerm]
    );

    return (
        <div>
            <SearchControl onChange={setSearchTerm} value={searchTerm} />
            <PagesList hasResolved={hasResolved} pages={pages} />
        </div>
    );
}

function PageEditButton({ pageId }) {
    const [isOpen, setOpen] = useState(false);

    const openModal = () => {
        setOpen(true);
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Button onClick={openModal} variant="primary">
                Edit
            </Button>
            {isOpen && (
                <Modal onRequestClose={closeModal} title="Edit Page">
                    <EditPageForm pageId={pageId} onCancel={closeModal} onSaveFinished={closeModal} />
                </Modal>
            )}
        </>
    );
}

function PagesList({ hasResolved, pages }) {
    if (!hasResolved) return <Spinner />;
    if (!pages?.length) return <div>No results</div>;

    return (
        <table className="wp-list-table widefat fixed striped table-view-list">
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {pages.map((page) => (
                    <tr key={page.id}>
                        <td>{decodeEntities(page.title.rendered)}</td>
                        <td><PageEditButton pageId={page.id} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

function EditPageForm({ pageId, onCancel, onSaveFinished }) {
    const { page, lastError, isSaving, hasEdits } = useSelect(
        (select) => ({
            page: select(coreDataStore).getEntityRecord('postType', 'page', pageId),
            lastError: select(coreDataStore).getLastEntitySaveError('postType', 'page', pageId),
            isSaving: select(coreDataStore).isSavingEntityRecord('postType', 'page', pageId),
            hasEdits: select(coreDataStore).hasEditsForEntityRecord('postType', 'page', pageId),
        }),
        [pageId]
    );

    const { saveEditedEntityRecord, editEntityRecord } = useDispatch(coreDataStore);

    // Local state for the input value
    const [inputValue, setInputValue] = useState(page?.title?.rendered || '');

    // Update local state when the page data is loaded
    useEffect(() => {
        if (page) {
            setInputValue(page.title.rendered);
        }
    }, [page]);

    const handleSave = async () => {
        const savedRecord = await saveEditedEntityRecord('postType', 'page', pageId);
        if (savedRecord) {
            onSaveFinished();
        }
    };

    const handleChange = (newValue) => {
        // Update local state
        setInputValue(newValue);
        // Update the entity record in the store
        editEntityRecord('postType', 'page', pageId, { title: newValue });
    };

    if (!page) {
        return <Spinner />; // Show loading spinner while data is being fetched
    }

    return (
        <div className="my-gutenberg-form">
            <TextControl
                label="Page title:"
                value={inputValue} // Use local state for the input value
                onChange={handleChange} // Update both local state and entity record
            />
            {lastError && <div className="form-error">Error: {lastError.message}</div>}
            <div className="form-buttons">
                <Button onClick={handleSave} variant="primary" disabled={!hasEdits || isSaving}>
                    {isSaving ? (
                        <>
                            <Spinner />
                            Saving
                        </>
                    ) : 'Save'}
                </Button>
                <Button onClick={onCancel} variant="tertiary" disabled={isSaving}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}


window.addEventListener(
    'load',
    function () {
        render(
            <MyFirstApp />,
            document.querySelector('#my-first-gutenberg-app')
        );
    },
    false
);
