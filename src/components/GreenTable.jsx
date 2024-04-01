import 'regenerator-runtime'
import { useMemo ,useState} from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, useAsyncDebounce } from 'react-table'


import { makeTableHeaders } from '../utils/utils'

import '../assets/css/GreenTable.css'


export default function GreenTable(props){
    const {headers, data} = props

    const columns = makeTableHeaders(headers)


    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = useTable ({
        columns : useMemo(() => columns, []),
        data:useMemo(() => data, []),
    }, useFilters, useGlobalFilter, useSortBy)

    const {globalFilter} = state

    const [globalFilterValue, setGlobalFilterValue] = useState(globalFilter)

    const onGlobalFilterChange = useAsyncDebounce((globalFilterValue) => {
        setGlobalFilter(globalFilterValue || undefined)
    }, 1000)

return (
    <>
    <span>
            Search : {' '}
            <input value = {globalFilterValue || ''}
             placeholder = 'Anything...'
            onChange={(event) => {setGlobalFilterValue(event.target.value)
                onGlobalFilterChange(event.target.value)}}
            />
    </span>

    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup, index) =>(
                <tr {...headerGroup.getHeaderGroupProps()} >
                    {
                        headerGroup.headers.map((column) =>(
                            <th {...column.getHeaderProps()}>                                
                                <div {...column.getSortByToggleProps()}>
                                    {column.render('Header')}
                                    {column.isSorted ? (column.isSortedDesc? '  🡣': '  🡩'):'  ᛨ'}
                                </div>
                                <span>
                                    {column.canFilter ? 
                                    <input value = {column.filterValue || ''}
                                    onChange = {(event) => column.setFilter(event.target.value)}
                                    />
                                    : null}
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