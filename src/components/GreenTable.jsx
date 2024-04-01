import { useMemo } from 'react'
import { useTable } from 'react-table'

import { makeTableHeaders } from '../utils/utils'

import '../assets/css/GreenTable.css'

export default function GreenTable(props){
    const {headers, data} = props

    const columns = makeTableHeaders(headers)

    const COLUMNS = useMemo(() => columns, [])
    const DATA = useMemo(() => data, [])

    const tableInstance = useTable ({
        columns : COLUMNS,
        data:DATA,
    })

    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = tableInstance

return (

    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) =>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) =>(
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))
                    }
                    
                </tr>
            ))}

        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map((row) =>{
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()}>
                            {
                                row.cells.map((cell) =>{
                                    return <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                })                                
                            }                           
                        </tr>
                    )
                })
            }
        </tbody>
    </table>       
)
}