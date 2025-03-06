import { SearchControl } from "@wordpress/components";

export default function SearchBar({ searchTerm, setSearchTerm }) {
    return <SearchControl onChange={setSearchTerm} value={searchTerm} />;
}
