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

export const cleanData = (content) =>{

    // find all numerical rows
    let numerical_rows = []
    for (const [key, value] of Object.entries(content[0])){
        if (typeof value === "number"){
            numerical_rows.push(key)
        }
    }

    // check each numerical row if it has at least one floating value in it
    for (let i = numerical_rows.length-1; i > -1; i--){
        let assumeInteger = true
        for (let j = 0; j < content.length; j++){
             if (content[j][numerical_rows[i]] % 1 !==0){
                j = content.length
                assumeInteger = false
                break
            }
        }
        // if no floating values found, do not format
        if (assumeInteger) {
            const x = numerical_rows.splice(i,1)
        }
    }

    const data = content.map((row) => { 
        const new_row = {}
        for (const [key, value] of Object.entries(row)) {
            if (numerical_rows.includes(key)) {
                new_row[key] =value.toFixed(2)
            }
            else{
                new_row[key] = value
            }
          }
        return new_row        
    });
    return data
}