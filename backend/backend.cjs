const express = require('express')
const cors = require('cors')
const JSONBig = require('json-bigint')
const db = require('./databaseConfig.cjs')
require('dotenv').config()
const {Client, Environment} = require('square')
PORT = 4000

const app = express()
app.listen(PORT, () => console.log(`Customer Loyalty Backend now running on port: ${PORT}`))

app.use(cors({
    origin: 'http://localhost:5173'
}))




const client = new Client({
    environment: Environment.Production,
    accessToken: process.env.SQUARE_ACCESS_TOKEN
    
})



////////////////////Square API
app.get('/searchCustomer', async (req, res) => {
    const searchTerm = req.query.searchTerm
    console.log(searchTerm)
    try {
        const response = await client.customersApi.searchCustomers({
            query: {
                filter: {
                  phoneNumber: {
                    fuzzy: searchTerm
                  }
                }
              }
            });
        console.log(response.result)
        const responseString = JSONBig.stringify(response.result)
        res.send(responseString)
    } catch(error) {
        console.log(error)
    }
})


app.put('/square/createCustomer', async (req, res) => {
    const first_name = req.query.first_name
    const last_name = req.query.last_name
    const phone_number = req.query.phone_number
    const email = req.query.email
    try {
        const response = await client.customersApi.createCustomer({
          givenName: last_name,
          familyName: first_name,
          emailAddress: email,
          phoneNumber: phone_number
        });
      
        console.log(response.result)
        res.send(JSONBig.stringify(response.result));
      } catch(error) {
        console.log(error);
      }
})



////////////////////Database
//////////Customer Table
app.get('/db/loyalty/customerexists', async (req, res) => {
    const customer_id = req.query.customer_id
    db.query(`SELECT EXISTS(SELECT 1 FROM Customers WHERE customer_id = ${customer_id}`)
})



// app.put('/db/loyalty/join', async (req, res) => {
//     const customer_id = req.query.customer_id;
//     const first_name = req.query.first_name
//     const last_name = req.query.last_name
//     const phone_number = req.query.phone_number
//     const email = req.query.email
// })