const express = require('express')
const Stripe = require('stripe')

 
const app = express()

const stripe = new Stripe("sk_test_51IQM8KDwdATUt06ELWN7YNtFMjP9KOBMoPMCDBlRcIKt2nVqEQhqEAi3NxfgHZVaDlPfDPfzyihCova59UYfdPnV004Tvls5le")


app.use(express.json())


app.post('/api/checkout', async (req, res) =>{
    const { id, amount, description, receipt_email} = req.body
    const payment =  await stripe.paymentIntents.create({
        amount,
        currency: "MXN",
        description,
        payment_method: id,
        confirm: true,
        receipt_email,
    
    })
    console.log(payment)
    res.send({message: 'Pago Realizado'})
})

app.listen(3001, ()=>{
    console.log('Server on port', 3001)
})