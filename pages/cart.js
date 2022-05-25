import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
} from '@mui/material'
import Router from 'next/router'
import { useContext } from 'react'
import AppContext from '../components/AppContext'
import Header from '../components/Header'
const Admin = () => {
  const { purchased, setPurchased } = useContext(AppContext)
  const total = 0

  const handleClose = () => {
    setOpen(false)
  }
  const handleSell = (id) => {
    const tempArray = []
    purchased.map((item) => item.id !== id && tempArray.push(item))
    setPurchased(tempArray)
  }
  const handleCheckout = () => {
    Router.push('/checkout')
  }
  if (purchased.length > 0) {
    purchased.map((item) => {
      total = total + item.id / 1000
      console.log(total)
    })
  }
  return (
    <div>
      <Header />
      <Typography
        sx={{ color: 'white', textAlign: 'center', marginTop: '30px' }}
        variant="h4"
      >
        Purchased Items
      </Typography>
      <br />
      <Box sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
        {purchased.map((item) => (
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia
              component="img"
              height="140"
              image={item.image}
              alt="name"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.description}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="outlined"
                color="primary"
                onClick={() => handleSell(item.id)}
              >
                Sell
              </Button>
              <Button size="small" variant="outlined">
                Share
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
      <br />
      <Divider />
      <Box sx={{ width: '100%' }}>
        {purchased.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box>
              <Typography variant="h6" color="white">
                Pay Total: {total}
              </Typography>
              <br />
              <Button variant="outlined" onClick={handleCheckout}>
                Check Out
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </div>
  )
}

export default Admin
