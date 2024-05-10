export const ColumnFilter = ({column}) =>{
    const {filterValue, setFilter} = column
    return (
        <span>
            <input value = {filterValue || ''}
                onChange = {(event) => setFilter(event.target.value)}
            />
        </span>
    )
}