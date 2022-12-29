const express = require('express')
const cors = require('cors')
const JSONBig = require('json-bigint')
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