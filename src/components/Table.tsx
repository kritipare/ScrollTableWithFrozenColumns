import  { useEffect, useState } from "react";
import FrozenColumnsTable from "./FrozenColumnsTable";
import { FROZEN_COLUMNS } from "../util/contants";

const Table = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch("http://localhost:4000").then((res) =>
                res.json(),
            );
            setData(response);
        }
        fetchData();
    }, []);

    if (data && data.length > 0)
        return (
            <FrozenColumnsTable data={data} frozenColumns={FROZEN_COLUMNS} />
        );
    return null;
};

export default Table;
