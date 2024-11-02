import { useCallback, useEffect, useState } from "react";
import FrozenColumnsTable from "./FrozenColumnsTable";
import { FROZEN_COLUMNS } from "../util/contants";
import { TableData } from "../util/TableData";
import "./Table.css";

const Table = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState<TableData[]>([]);
    const [sortConfig, setSortConfig] = useState({
        key: "",
        direction: "",
    });

    // Apply sorting
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

    useEffect(() => {
        handleFilter();
    }, [searchQuery]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:4000").then((res) =>
                res.json(),
            );
            setData(response);
            setFilteredData(response);
        }
        fetchData();
    }, []);

    if (data && data.length > 0)
        return (
            <>
                <input
                    className='search-query'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                    placeholder='Search...'
                />
                <FrozenColumnsTable
                    data={filteredData}
                    frozenColumns={FROZEN_COLUMNS}
                    sortConfig={sortConfig}
                    handleSort={handleSort}
                />
            </>
        );
    return null;
};

export default Table;
