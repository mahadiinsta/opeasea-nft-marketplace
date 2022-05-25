// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2/promise'
const handler = async (req, res) => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL)
  const payload = req.body

  console.log(payload)

  const transactionID = payload[payload.length - 1].transactionID

  // payload.forEach(async (item) => {
  //   // const [rows, fields] = await connection.query(
  //   //   `INSERT INTO Transactions (ItemName, URI, transactionID) VALUES ("${item.name}","${item.uri}","${transactionID}")`
  //   // )
  //   console.log(
  //     `INSERT INTO Transactions (ItemName, URI, transactionID) VALUES ("${item.name}","${item.uri}","${transactionID}")`
  //   )
  // })
  connection.close()
  return res.status(200).json({ test: 'test' })
}
export default handler
