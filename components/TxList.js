import { Box, Divider, Link } from '@mui/material'

export default function TxList({ txs }) {
  if (txs.length === 0) return null

  return (
    <>
      {txs.map((item) => (
        <div key={item} className="alert alert-info mt-5">
          <div className="flex-1">
            <label>{item.hash}</label>
            <Divider />
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              {item.hash != null && (
                <Link href="/">
                  <a>Go back home</a>
                </Link>
              )}
            </Box>
          </div>
        </div>
      ))}
    </>
  )
}
