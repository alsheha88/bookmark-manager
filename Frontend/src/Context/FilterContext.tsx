import { createContext, useContext, useState } from "react";

type Filter = {
    selectedTag: string | null;
    handleTagSelect: (tag:string | null) => void;
    handleSort: (value:string | null) => void;
    handleSearch: (value:string | null) => void;
    sort: string | null;
    search: string | null;
    

}

const FilterContext = createContext<Filter| null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }){
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [sort, setSortOption] = useState<string | null>(null);
    const [search, setSearch] = useState<string | null>(null);

    const handleTagSelect = (tag: string | null) => {
		setSelectedTag(selectedTag === tag ? null : tag);
	};
    function handleSort(value:string | null) {
		setSortOption(value)
	}
    function handleSearch(value: string | null){
        setSearch(value)
    }

    return <FilterContext.Provider value={{selectedTag, handleTagSelect, handleSort, sort, search, handleSearch}} >
        {children}
    </FilterContext.Provider>
}

export function useFilterContext() {
  const context = useContext(FilterContext)
  if (!context) throw new Error('useFilterContext must be used within FilterProvider')
  return context
}