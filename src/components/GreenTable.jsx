import { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table'

import { makeTableHeaders } from '../utils/utils'

import '../assets/css/GreenTable.css'


export default function GreenTable(props){
    const {headers, data} = props

    const columns = makeTableHeaders(headers)


    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = useTable ({
        columns : useMemo(() => columns, []),
        data:useMemo(() => data, []),
    }, useGlobalFilter, useSortBy)

    const {globalFilter} = state

return (
    <>
    <span>
            Search : {' '}
            <input value = {globalFilter || ''}
             placeholder = 'Anything...'
            onChange={event => setGlobalFilter(event.target.value)}
            />
    </span>

    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) =>(
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {
                        headerGroup.headers.map((column) =>(
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>{column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc? '  🡣': '  🡩'):'  ᛨ'}
                                </span>
                            
                            </th>
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
    </>   
)
}