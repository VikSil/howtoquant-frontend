import { ColumnFilter } from "../components/ColumnFilter"


export const makeTableHeaders = (columns)=>{
    const headers = []

    for (let i = 0; i<columns.length; i++){
        let col = columns[i].replace("_", " ").toUpperCase()
        const header = {"Header": col, "accessor": columns[i], "Filter":ColumnFilter}
        headers.push(header)
    }
    return headers

}