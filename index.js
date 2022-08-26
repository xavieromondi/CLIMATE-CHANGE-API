

const express = require('express')
const app = express()
const cheerio = require('cheerio')
const axios = require('axios')

const articles =[]

app.get('/',(req,res) =>{

    res.json('welcome to the home page ...')
})

app.get('/news',(req,res) =>{
    axios.get('https://www.theguardian.com/environment/climate-crisis')
    .then((response) =>{
        html = response.data
        const $ = cherrios.load(html)
        $('a:contains("climate")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')
            articles.push({
                title,
                url
            })
        })
        res.json(articles)  
        
    }).catch((err) => console.log(err))
   
})

app.listen(8000)