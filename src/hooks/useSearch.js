import { useState } from '@wordpress/element';

export function useSearch() {
    const [searchTerm, setSearchTerm] = useState('');

    return { searchTerm, setSearchTerm };
}
