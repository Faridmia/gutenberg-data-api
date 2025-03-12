import { SearchControl, Spinner, Button, Modal, TextControl } from "@wordpress/components";
import { useState, render, useEffect } from "@wordpress/element";
import { useSelect, useDispatch } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";
import { decodeEntities } from "@wordpress/html-entities";

import './index.scss';

function MyFirstApp() {
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);

    return (
        <div>
            <div className="list-controls">
                <SearchControl onChange={setSearchTerm} value={searchTerm} />
                <Button onClick={openCreateModal} variant="primary">Create New Page</Button>
            </div>
            <PagesList hasResolved={hasResolved} pages={pages} />
            {isCreateModalOpen && (
                <Modal onRequestClose={closeCreateModal} title="Create New Page">
                    <CreatePageForm onCancel={closeCreateModal} onSaveFinished={closeCreateModal} />
                </Modal>
            )}
        </div>
    );
}


function PageEditButton({ pageId }) {
    const [isOpen, setOpen] = useState(false);

    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

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

function CreatePageForm({ onCancel, onSaveFinished }) {
    const [title, setTitle] = useState('');
    const { lastError, isSaving } = useSelect(
        (select) => ({
            lastError: select(coreDataStore).getLastEntitySaveError('postType', 'page'),
            isSaving: select(coreDataStore).isSavingEntityRecord('postType', 'page'),
        }),
        []
    );

    const { saveEntityRecord } = useDispatch(coreDataStore);
    const handleSave = async () => {
        const savedRecord = await saveEntityRecord('postType', 'page', { title, status: 'publish' });
        if (savedRecord) {
            onSaveFinished();
        }
    };

    return (
        <PageForm
            title={title}
            onChangeTitle={setTitle}
            hasEdits={!!title}
            onSave={handleSave}
            lastError={lastError}
            onCancel={onCancel}
            isSaving={isSaving}
        />
    );
}



function PageForm({ title, onChangeTitle, hasEdits, lastError, isSaving, onCancel, onSave }) {
    return (
        <div className="my-gutenberg-form">
            <TextControl
                label="Page title:"
                value={title}
                onChange={onChangeTitle}
            />
            {lastError && <div className="form-error">Error: {lastError.message}</div>}
            <div className="form-buttons">
                <Button
                    onClick={onSave}
                    variant="primary"
                    disabled={!hasEdits || isSaving}
                >
                    {isSaving ? (
                        <>
                            <Spinner />
                            Saving
                        </>
                    ) : 'Save'}
                </Button>
                <Button
                    onClick={onCancel}
                    variant="tertiary"
                    disabled={isSaving}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

function EditPageForm({ pageId, onCancel, onSaveFinished }) {
    const { page, lastError, isSaving, hasEdits } = useSelect(
        (select) => ({
            page: select(coreDataStore).getEditedEntityRecord('postType', 'page', pageId),
            lastError: select(coreDataStore).getLastEntitySaveError('postType', 'page', pageId), // এখানে `last` এর পরে `Error` যোগ করা হয়েছে
            isSaving: select(coreDataStore).isSavingEntityRecord('postType', 'page', pageId),
            hasEdits: select(coreDataStore).hasEditsForEntityRecord('postType', 'page', pageId),
        }),
        [pageId]
    );

    const { saveEditedEntityRecord, editEntityRecord } = useDispatch(coreDataStore);
    const handleSave = async () => {
        const savedRecord = await saveEditedEntityRecord('postType', 'page', pageId);
        if (savedRecord) {
            onSaveFinished();
        }
    };

    const [localTitle, setLocalTitle] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (page) {
            setLocalTitle(page.title.rendered);
            setIsLoading(false);
        } else {
            setIsLoading(true);
        }
    }, [page]);

    const handleChange = (title) => {
        setLocalTitle(title);
        editEntityRecord('postType', 'page', pageId, { title });
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="my-gutenberg-form">
            <TextControl
                label="Page title:"
                value={localTitle}
                onChange={handleChange}
            />
            {lastError && <div className="form-error">Error: {lastError.message}</div>}
            <div className="form-buttons">
                <Button
                    onClick={handleSave}
                    variant="primary"
                    disabled={!hasEdits || isSaving}
                >
                    {isSaving ? (
                        <>
                            <Spinner />
                            Saving
                        </>
                    ) : 'Save'}
                </Button>
                <Button
                    onClick={onCancel}
                    variant="tertiary"
                    disabled={isSaving}
                >
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