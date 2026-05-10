
const express = require('express')
const router = express.Router()

require('dotenv').config()

const INSTAGRAM_ACCOUNT_ID = process.env.THREAD_API_KEY
const ACCESS_TOKEN = process.env.THREAD_API_SECRET

app.get('/reels',async(req,res) => {
    try {
    const url = `https://graph.facebook.com/v16.0/${INSTAGRAM_ACCOUNT_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&access_token=${ACCESS_TOKEN}`;
    const response = await axios.get(url)
    } catch (error) {
        
    }
})