import React, { useState, useEffect } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { matchSorter } from 'match-sorter'
import ActionsMenu from './ActionsMenu.jsx'
import axios from 'axios'

import { useTable, useSortBy, useFilters, useColumnOrder, useBlockLayout } from 'react-table'


function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length
  
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Przeszukaj ${count} rekordów...`}
      />
    )
  }
  
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = React.useMemo(() => {
      const options = new Set()
      preFilteredRows.forEach(row => {
        options.add(row.values[id])
      })
      return [...options.values()]
    }, [id, preFilteredRows])
  
    return (
      <select
        value={filterValue}
        onBlur={e => {
          setFilter(e.target.value || undefined)
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    )
  }
  
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [row => row.values[id]] })
  }
  
  fuzzyTextFilterFn.autoRemove = val => !val

function Table({ columns, data }) {

    const defaultColumn = React.useMemo(
        () => ({
          Filter: DefaultColumnFilter,
        }),
        []
      )

  // Use the state and functions returned from useTable to build your UI
  const {
      getTableProps,
      headerGroups,
      rows,
      prepareRow
    } = useTable(
        {
            columns,
            data,
            defaultColumn,
        },
        useColumnOrder,
        useFilters,
        useSortBy,
        useBlockLayout
        )


  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map(headerGroup => (
          <TableRow key={'row'} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <TableCell key={'cell'} {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <TableRow key={'row'} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <TableCell key={'cell'} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                )
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </MaUTable>
  )
}

function Students() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Kursanci',
        columns: [
            {
                Header: 'Imię',
                accessor: 'name',
                minWidth: 250,
                Filter: DefaultColumnFilter,
              },
              {
                Header: 'Nazwisko',
                accessor: 'surname',
                minWidth: 250,
                filter: 'fuzzyText',
                Filter: DefaultColumnFilter,
              },
              {
                Header: 'Grupa zajęciowa',
                accessor: 'group',
                minWidth: 150,
                Filter: SelectColumnFilter,
                filter: 'includes',
              },
              {
                Header: 'Numer telefonu',
                accessor: 'phoneNumber',
                minWidth: 250,
              },
              {
                Header: 'Płeć',
                accessor: 'gender',
                minWidth: 150,
                disableFilters: true,
              },
              {
                Header: 'Zgoda na wysyłanie powiadomień',
                accessor: 'accept',
                minWidth: 150,
                disableFilters: true,
              },
              {
                Header: 'Akcje',
                accessor: 'actions',
                minWidth: 150,
                disableFilters: true,
                Cell: (props) => <ActionsMenu id={data[props.row.index]}/>
              },
        ],
      },
    ],
    
  )

 const [data, setData] = useState([])
 
 useEffect(() => {

   async function getStudents() {

     let people = []
     await axios.get('http://localhost:3000/users').then(students => {
       people = students.data
           setData(people)
     })      
   }
     getStudents()
     
 }, [])

  return (
    <div>
      <CssBaseline />
      <Table columns={columns} data={data} />
    </div>
  )
}

export default Students