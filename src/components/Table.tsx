import { useCallback, useEffect, useState } from "react";
import FrozenColumnsTable from "./FrozenColumnsTable";
import { FROZEN_COLUMNS } from "../util/constants";
import { TableData } from "../util/TableData";
import "./Table.css";

/**
 * Table Component
 * Manages data fetching, filtering, and sorting for the table. Integrates the FrozenColumnsTable component and includes a search input.
 * @component
 */
const Table = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<TableData[]>([]);
    const [sortConfig, setSortConfig] = useState({
        key: "",
        direction: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    /**
     * Applies sorting to the filtered data based on the current sort configuration.
     */
    if (sortConfig.key) {
        filteredData.sort((a, b) => {
            if (!sortConfig.direction) {
                return +a["SNo"] - +b["SNo"];
            }
            if (a[sortConfig.key] < b[sortConfig.key])
                return sortConfig.direction === "asc" ? -1 : 1;
            if (a[sortConfig.key] > b[sortConfig.key])
                return sortConfig.direction === "asc" ? 1 : -1;
            return 0;
        });
    }

    /**
     * Handles the sorting configuration update based on the column key and toggles the sorting direction.
     * @param {string} key - Column key to sort by.
     */
    const handleSort = useCallback(
        (key: string) => {
            let direction = "asc";
            if (sortConfig.key === key && sortConfig.direction === "asc") {
                direction = "desc";
            } else if (
                sortConfig.key === key &&
                sortConfig.direction === "desc"
            ) {
                direction = "";
            }
            setSortConfig({ key, direction });
        },
        [sortConfig],
    );

    /**
     * Filters the table data based on the search query, matching against specific columns.
     */
    const handleFilter = () => {
        const filteredData = data.filter(
            (item: TableData) =>
                item.SNo.toString().startsWith(searchQuery) ||
                item.PracticeName.toLowerCase().includes(
                    searchQuery.toLowerCase(),
                ) ||
                item.TaskCategoryName.toLowerCase().includes(
                    searchQuery.toLowerCase(),
                ),
        );
        setFilteredData(filteredData);
    };

    // Apply filtering whenever the search query changes
    useEffect(() => {
        handleFilter();
    }, [searchQuery]);

    /**
     * Fetches table data from the API, then updates the data and filteredData states.
     */
    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await fetch("http://localhost:4000").then((res) =>
                res.json(),
            );
            setData(response);
            setFilteredData(response);
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return (
        <>
            {isLoading ? (
                <p aria-busy='true' aria-live='polite'>
                    Loading data...
                </p>
            ) : (
                <>
                    <input
                        className='search-query'
                        onChange={(e) => setSearchQuery(e.target.value)}
                        value={searchQuery}
                        placeholder='Search...'
                        aria-label='Search table data'
                    />
                    {/* Announce filtered data updates */}
                    <div aria-live='polite'>
                        <FrozenColumnsTable
                            data={filteredData}
                            frozenColumns={FROZEN_COLUMNS}
                            sortConfig={sortConfig}
                            handleSort={handleSort}
                        />
                    </div>
                </>
            )}
        </>
    );
};

export default Table;
