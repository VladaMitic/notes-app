const filters = {
    searchText: '',
    sortBy: 'byEditing'
}

//Expose filters
const getFilters = () => filters;

//set filters value
const setFilters = (updates) => {
    if(typeof updates.searchText === 'string') {
        filters.searchText = updates.searchText;
    }

    if(typeof updates.sortBy === 'string') {
        filters.sortBy = updates.sortBy;
    }
}

export { getFilters, setFilters };