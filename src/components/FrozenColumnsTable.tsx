import React from "react";
import { SortConfig, TableData } from "../util/TableData";
import "./FrozenColumnsTable.css";

interface FrozenColumnsTableProps {
    data: Array<TableData>;
    frozenColumns: number;
    sortConfig: SortConfig;
    handleSort: (key: string) => void;
}

/**
 * Renders the header row for the table, including sortable columns.
 * @param {TableData} data - Example row data used to generate column headers.
 * @param {number} frozenColumns - Number of columns to freeze in place.
 * @param {SortConfig} sortConfig - Current sorting configuration, including key and direction.
 * @param {Function} handleSort - Function to handle sorting, triggered on header click.
 * @returns {JSX.Element} The table header row with sortable columns.
 */
const headerData = (
    data: TableData,
    frozenColumns: number,
    sortConfig: SortConfig,
    handleSort: (key: string) => void,
): JSX.Element => {
    return (
        <tr role='row'>
            {Object.keys(data).map((header, index) => (
                <th
                    key={header}
                    onClick={() => handleSort(header)}
                    role='columnheader'
                    tabIndex={0}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                            handleSort(header);
                        }
                    }}
                    aria-sort={
                        sortConfig.key === header
                            ? sortConfig.direction === "asc"
                                ? "ascending"
                                : "descending"
                            : "none"
                    }
                    aria-label={`${header} column, ${
                        sortConfig.key === header
                            ? sortConfig.direction === "asc"
                                ? "sorted ascending"
                                : "sorted descending"
                            : "not sorted"
                    }`}
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
                            (sortConfig.direction === "asc" ? "↑" : "↓")}
                    </span>
                </th>
            ))}
        </tr>
    );
};

/**
 * Renders a single row of table data.
 * @param {TableData} row - Object representing a row of table data.
 * @param {number} frozenColumns - Number of columns to freeze in place.
 * @returns {JSX.Element | null} The table data row, or null if no data is provided.
 */
const tableData = (
    row: TableData,
    frozenColumns: number,
): JSX.Element | null => {
    if (!row) return null;
    return (
        <tr role='row'>
            {Object.values(row).map((cellData, index) => (
                <td
                    key={index}
                    className={index < frozenColumns ? "FixedColumn" : ""}
                    style={{
                        minWidth: 150,
                        left:
                            index < frozenColumns ? `${index * 150}px` : "auto",
                    }}
                    role='cell'>
                    {cellData}
                </td>
            ))}
        </tr>
    );
};

/**
 * FrozenColumnsTable Component
 * A table component with a configurable number of frozen columns and sortable headers.
 * @param {FrozenColumnsTableProps} props - Props for the table component.
 * @param {Array<TableData>} props.data - Array of data objects for the table rows.
 * @param {number} props.frozenColumns - Number of columns to freeze in place.
 * @param {SortConfig} props.sortConfig - Current sorting configuration, including key and direction.
 * @param {Function} props.handleSort - Function to handle sorting, triggered on header click or key press.
 * @returns {JSX.Element} The main table component with frozen columns and sorting.
 */
const FrozenColumnsTable = ({
    data,
    frozenColumns,
    sortConfig,
    handleSort,
}: FrozenColumnsTableProps): JSX.Element => {
    return (
        <div role='region' aria-label='Frozen columns data table'>
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
                        data.map((row, index) => (
                            <React.Fragment key={index}>
                                {tableData(row, frozenColumns)}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr role='row'>
                            <td
                                role='cell'
                                colSpan={Object.keys(data[0] || {}).length}>
                                No data found!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default React.memo(FrozenColumnsTable);
