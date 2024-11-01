import { TableData } from "../util/TableData";
import "./FrozenColumnsTable.css";

interface FrozenColumnsTableProps {
    data: Array<TableData>;
    frozenColumns: number;
}

const headerData = (data: TableData, frozenColumns: number) => {
    return (
        <tr role='row'>
            {Object.keys(data).map((header, index) => (
                <th
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
}: FrozenColumnsTableProps) => {
    return (
        <div>
            <table role='table' className='TableContainer'>
                <thead>{headerData(data[0], frozenColumns)}</thead>
                <tbody>
                    {Object.values(data).map((row) => {
                        return tableData(row, frozenColumns);
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default FrozenColumnsTable;
