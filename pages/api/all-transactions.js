// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import mysql from 'mysql2/promise'
const handler = async (req, res) => {
  const connection = await mysql.createConnection(process.env.DATABASE_URL)
  const [rows, fields] = await connection.execute('SELECT * FROM Transactions')
  connection.close()
  res.status(200).json(rows)
}
export default handler
