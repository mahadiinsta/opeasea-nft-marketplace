import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { useEffect, useState } from 'react'

const TransactionTable = () => {
  const [tableData, setTableData] = useState({})
  useEffect(async () => {
    const data = await axios.get('/api/all-transactions')
    setTableData(data.data)
  }, [])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Item Name</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              Buying Date
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              Transaction ID
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.length > 0 &&
            tableData.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.ItemName}
                </TableCell>
                <TableCell align="right">{row.reg_date}</TableCell>
                <TableCell align="right">{row.transactionID}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default TransactionTable
