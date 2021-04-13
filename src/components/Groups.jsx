import { DataGrid } from '@material-ui/data-grid'
import * as React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import ActionsMenu from './ActionsMenu.jsx'

const columns = [
  { field: 'groupName', headerName: 'Nazwa grupy', width: 140 },
  { field: 'level', headerName: 'Stopień zaawan.', width: 180},
  { field: 'danceType', headerName: 'Rodzaj tańca', width: 140 },
  { field: 'numberOfParticipant', headerName: 'Liczba uczestników', width: 180 },
  { field: 'instructor', headerName: 'Instruktor/-rzy', width: 140},
  { field: 'comment', headerName: 'Komentarz', width: 140 },
  { field: 'action', headerName: 'Akcja', width: 100,
        renderCell: () => (
            <ActionsMenu/>
        ),
    },
]

const Groups = () => {
    let [rows, setRows] = useState([])
    let groups = []

    useEffect(() => {
        axios.get('http://localhost:8010/proxy/groups')
            .then(response => {
                groups = response.data
                console.log(groups) 
                let rowsData = []
                
                for(let i = 0; i < groups.length; i++) {      
                    let names = ''
                    if(groups[i].teachers.length !== 0) {
                        for(let j = 0; j < groups[i].teachers.length; j++) {
                            names += groups[i].teachers[j].name + ' ' + 
                            groups[i].teachers[j].surname
                        }
                    }
                    rowsData.push({ id: i, groupName: groups[i].danceType + '-' + 
                    groups[i].advanceLevel, level: groups[i].advanceLevel, 
                    danceType: groups[i].danceType, numberOfParticipiant: groups[i].maxAmount, 
                    instructor: names, comment:'cool group', action: '...'})           
                }     

                setRows(rowsData)

            }).catch(error => {
            console.log('error', error)
            })        
    }, [])
     
  return (
    <div>
      <h1>Grupy</h1>
      <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
      </div>
    </div>
  )
}

export default Groups