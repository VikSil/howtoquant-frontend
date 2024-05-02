// Table solution from here:
// https://www.youtube.com/playlist?list=PLC3y8-rFHvwgWTSrDiwmUsl4ZvipOw9Cz

import 'regenerator-runtime'
import { useMemo ,useState} from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters, useAsyncDebounce, usePagination } from 'react-table'

import { cleanData, makeTableHeaders } from '../utils/utils'

import GreenButton from './GreenButton';

import '../assets/css/GreenTable.css'


export default function GreenTable(props){
    const {headers, content} = props

    const columns = makeTableHeaders(headers)
    const data = cleanData(content)


    const {getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        state,
        setGlobalFilter,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,

    }= useTable ({
        columns : useMemo(() => columns, []),
        data : useMemo(() => data, []),
    }, useFilters, useGlobalFilter,useSortBy,usePagination)

    const {globalFilter, pageIndex, pageSize} = state

    const [globalFilterValue, setGlobalFilterValue] = useState(globalFilter)

    const onGlobalFilterChange = useAsyncDebounce((globalFilterValue) => {
        setGlobalFilter(globalFilterValue || undefined)
    }, 1000)

    const [gotoPageNumber, setGotoPageNumber] = useState(pageIndex)
    const [gotoInputValue, setGotoInputValue] = useState(gotoPageNumber+1)

    const toggleDropdown = () =>{
        document.getElementById("pagesize-dropdown").classList.toggle("show")
    }

    // Close the rows-per-page dropdown if the user clicks outside of it
    window.onclick = function(event) {
        if (event.target.id !== 'dropdwnbtn') {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            var i;
            for (i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
                }
            }
        }
    }

return (
    <>
        {<>
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
                                        <input className = "col-search-field" value = {column.filterValue || ''}
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
                    page.map((row) =>{
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
        </>}

        {(canPreviousPage ||canNextPage) ? <><footer className='mt-2 d-flex justify-content-between'>   
                <span>
                    Page {' '}
                    <input id = "goto-input" type = 'number' value={gotoInputValue} 
                    onChange = {(event) => {                    
                        if (event.target.value) 
                            {setGotoInputValue(event.target.value)
                            setGotoPageNumber(Number(event.target.value)-1)}
                        else {setGotoPageNumber(1)} 
                        }}/>
                    <GreenButton text = {"Go"} clickFunction = {() =>gotoPage(gotoPageNumber)}/>
                </span>

                <div>                
                    <GreenButton text = {"<<"} isDisabled = {!canPreviousPage} clickFunction = {() =>gotoPage(0)}/>
                    <GreenButton text = {"<"} isDisabled = {!canPreviousPage} clickFunction = {() =>previousPage()}/>
                    <span>
                        <strong className='ms-2'>
                        page {' '}                    
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>
                        {' '}
                    </span>

                    <GreenButton text = {">"} isDisabled = {!canNextPage} clickFunction = {() =>nextPage()}/>
                    <GreenButton text = {">>"} isDisabled = {!canNextPage} clickFunction = {() =>gotoPage(pageCount-1)}/>
                </div>
                
                <span className = "d-flex flex-column" id = "rows-per-page-span">
                    <div>
                        Rows per page {' '} 
                        <GreenButton text = {pageSize + " 🡣"}  clickFunction = {() => toggleDropdown()} id= {"dropdwnbtn"}/>
                    </div>
                    <div>
                        <div id="pagesize-dropdown" className="dropdown-content">
                            {
                                [1,2,3].map((pageSize) =>(
                                    <a key = {pageSize} onClick = {(event) => {setPageSize(Number(event.target.textContent)); toggleDropdown()}}>
                                        {pageSize}
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                </span>
            </footer>
        </> 
        : null}
    </>  
)
}