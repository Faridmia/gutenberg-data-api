import { render } from "@wordpress/element";
import { usePages } from "./hooks/usePages";
import { useSearch } from "./hooks/useSearch";
import SearchBar from "./components/SearchBar";
import PagesList from "./components/PagesList";

function MyFirstApp() {
    const { searchTerm, setSearchTerm } = useSearch();
    const { pages, hasResolved } = usePages(searchTerm);

    return (
        <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <PagesList hasResolved={hasResolved} pages={pages} />
        </div>
    );
}

window.addEventListener(
    "load",
    function () {
        render(<MyFirstApp />, document.querySelector("#my-first-gutenberg-app"));
    },
    false
);
