import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { useTable, useSortBy, useFilters, useColumnOrder } from 'react-table'
import { motion, AnimatePresence } from 'framer-motion'
import { matchSorter } from 'match-sorter'
import ActionsMenu from './ActionsMenu.jsx'
import axios from 'axios'


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;
      background: white;

      :last-child {
        border-right: 0;
      }
    }
  }
`

function Filtr() {

  return (
    <br    />
  )
}


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
      Filter: Filtr,
    }),
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useColumnOrder,
    useFilters,
    useSortBy
  )

  const spring = React.useMemo(
    () => ({
      type: 'spring',
      damping: 50,
      stiffness: 100,
    }),
    []
  )

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={'cell'} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <motion.th key={column}
                  {...column.getHeaderProps({
                    layoutTransition: spring,
                    style: {
                      minWidth: column.minWidth,
                    },
                  })}
                >
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                  </div>
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </motion.th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          <AnimatePresence>
            {rows.slice(0, 10).map((row, i) => {
              prepareRow(row)
              return (
                <motion.tr key={'row'}
                  {...row.getRowProps({
                    layoutTransition: spring,
                    exit: { opacity: 0, maxHeight: 0 },
                  })}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <motion.td key={'cell'}
                        {...cell.getCellProps({
                          layoutTransition: spring,
                        })}
                      >
                        {cell.render('Cell')}
                      </motion.td>
                    )
                  })}
                </motion.tr>
              )
            })}
          </AnimatePresence>
        </tbody>
      </table>
    </>
  )
}

function filterGreaterThan(rows, id, filterValue) {
  return rows.filter(row => {
    const rowValue = row.values[id]
    return rowValue >= filterValue
  })
}

filterGreaterThan.autoRemove = val => typeof val !== 'number'

const Students = () => {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Kursanci',
        columns: [
          {
            Header: 'Imię',
            accessor: 'name',
            minWidth: 150,
            Filter: DefaultColumnFilter,
          },
          {
            Header: 'Nazwisko',
            accessor: 'surname',
            minWidth: 150,
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
            minWidth: 150,
          },
          {
            Header: 'Płeć',
            accessor: 'gender',
            minWidth: 150,
          },
          {
            Header: 'Zgoda na wysyłanie powiadomień',
            accessor: 'accept',
            minWidth: 150,
          },
          {
            Header: 'Akcje',
            accessor: 'actions',
            minWidth: 150,
            Cell: ({ cell }) => <ActionsMenu />
          },
        ],
      },
    ],
    []
  )

  const [data, setData] = useState([])
 
  useEffect(() => {

    async function getStudents() {

      let people = []
      await axios.get('http://localhost:3000/users',).then(students => {
        people = students.data
        students.data.forEach(async (person, index) => {
          await axios.get('http://localhost:3000/phones/users/'.concat(person._id.toString()))
          .then(phone => {
            people[index].phoneNumber = phone.data[0].phoneNumber
            setData(people)
          })
        })
      })      
    }
      getStudents()
      
  }, [])

  return (
    <Styles>
      <Table columns={columns} data={data} />
    </Styles>
  )
}

export default Students