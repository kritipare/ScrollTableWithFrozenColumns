export interface TableData {
    [key: string]: number | string;
    SNo: string;
    PracticeName: string;
    TaskCategoryName: string;
}

export interface SortConfig {
    key: string;
    direction: string;
}
