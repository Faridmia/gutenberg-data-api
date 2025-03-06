import { useSelect } from "@wordpress/data";
import { store as coreDataStore } from "@wordpress/core-data";

export function usePages(searchTerm) {
    return useSelect((select) => {
        const query = searchTerm ? { search: searchTerm } : {};
        const selectorArgs = ["postType", "page", query];

        return {
            pages: select(coreDataStore).getEntityRecords(...selectorArgs),
            hasResolved: select(coreDataStore).hasFinishedResolution(
                "getEntityRecords",
                selectorArgs
            ),
        };
    }, [searchTerm]);
}
