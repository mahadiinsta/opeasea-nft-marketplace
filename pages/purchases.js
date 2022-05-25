import { Box } from '@mui/material'
import axios from 'axios'
import Header from '../components/Header'
import TransactionTable from '../components/TransactionTable'

const getData = async () => {
  const data = await axios.get('/api/all-transactions')
  return data.data
}

const Transactions = () => {
  return (
    <div>
      <Header />
      {/* <Typography variant="h4" color="white" align="center" sx={{ mt: 2 }}>
        All Transactions
      </Typography> */}
      <Box sx={{ margin: '1% auto 0  auto', width: '90%' }}>
        <TransactionTable />
      </Box>
    </div>
  )
}

export default Transactions
