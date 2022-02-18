import express from 'express';
import bodyParser from 'body-parser';
import { Client } from '@elastic/elasticsearch';
import morgan from 'morgan';
import axios from 'axios';
import obj from './data.js'


const app = express();

const client = new Client({ node: 'http://localhost:9200' })


app.use(bodyParser.json({extended: true}))
app.use(morgan('dev'))


app.get('/' , (req , res) => {
    res.json({
        message: 'server is up'
    })
})



app.post('/index' , async (req , res) => {
    try{


        // delete
    // await client.indices.delete({ index: 'images'})

    // create bulk index
   const body =  obj.flatMap(doc => [{index: { _index: 'images' } , doc])
   await client.bulk({ refresh: true, body  })
   // count all docs
   const { body: count } = await client.count({ index: 'images' })


       
    
    res.status(201).json({count: count || -1})
    }
    catch (err) {
        console.error(err)
        res.status(500).send()
    }
})


app.get('/search' , async (req , res , search) => {
    try{

        const { q } = req.query

        // for fulltext query search
        // const { body } = await client.search({
        //     index: 'images',
        //     q
        //   })

        // for specific search
        // const { body } = await client.search({
        //     index: 'images',
        //    body:{
        //     query:{
        //         match: { id: 1}
        //     }
        //    }
        //   })


          res.json(body)
    } catch(err) {
        console.error(err);
        res.status(500).send()
    }
})


app.listen(4000 , err => {
    if (err){
        console.error(err)
    }
    else {
        console.log('server up and running')
    }
})