import React from "react";
import { SortConfig, TableData } from "../util/TableData";
import "./FrozenColumnsTable.css";

interface FrozenColumnsTableProps {
    data: Array<TableData>;
    frozenColumns: number;
    sortConfig: SortConfig;
    handleSort: (key: string) => void;
}

const headerData = (
    data: TableData,
    frozenColumns: number,
    sortConfig: SortConfig,
    handleSort: (key: string) => void,
) => {
    return (
        <tr role='row'>
            {Object.keys(data).map((header, index) => (
                <th
                    onClick={() => handleSort(header)}
                    role='columnheader'
                    className={
                        index < frozenColumns ? "FixedColumn header" : "header"
                    }
                    style={{
                        minWidth: 150,
                        left: index < frozenColumns ? `${index * 150}px` : "",
                        zIndex: index < frozenColumns ? 2 : 1,
                    }}>
                    {header}
                    <span className='sort-icon'>
                        {sortConfig.key === header &&
                            (sortConfig.direction === "asc"
                                ? "↑"
                                : sortConfig.direction === "desc"
                                ? "↓"
                                : "")}
                    </span>
                </th>
            ))}
        </tr>
    );
};

const tableData = (row: TableData, frozenColumns: number) => {
    if (!row) return null;
    return (
        <tr role='row'>
            {Object.values(row).map((tableData, index) => (
                <td
                    className={index < frozenColumns ? "FixedColumn" : ""}
                    style={{
                        minWidth: 150,
                        left:
                            index < frozenColumns ? `${index * 150}px` : "auto",
                    }}>
                    {tableData}
                </td>
            ))}
        </tr>
    );
};

const FrozenColumnsTable = ({
    data,
    frozenColumns,
    sortConfig,
    handleSort,
}: FrozenColumnsTableProps) => {
    return (
        <div>
            <table role='table' className='TableContainer'>
                <thead>
                    {data.length
                        ? headerData(
                              data[0],
                              frozenColumns,
                              sortConfig,
                              handleSort,
                          )
                        : null}
                </thead>
                <tbody>
                    {data.length ? (
                        Object.values(data).map((row) => {
                            return tableData(row, frozenColumns);
                        })
                    ) : (
                        <tr role='row'>
                            <td>NO data found!</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(FrozenColumnsTable);
