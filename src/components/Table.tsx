import { useEffect, useState } from "react";
import FrozenColumnsTable from "./FrozenColumnsTable";
import { FROZEN_COLUMNS } from "../util/contants";
import { TableData } from "../util/TableData";
import "./Table.css";

const Table = () => {
    const [data, setData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState([]);

    const onFilterData = () => {
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
        onFilterData();
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
                />
            </>
        );
    return null;
};

export default Table;
