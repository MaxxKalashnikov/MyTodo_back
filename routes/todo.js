//file for routing
const express = require('express');
const { query } = require('../helpers/database');

const todoRouter = express.Router();

todoRouter.get('/', async (request, response) => {
    console.log(query)
    try{
        const result = await query('select * from task') //query for db
        const rows = result.rows ? result.rows : [];//handling more than one rows from db
        response.status(200).json(rows)
    }catch(error){
        response.statusMessage = error;
        response.status(500).json({error: error})
    }
    });

todoRouter.post('/new', async(request, response) => {
    try{
        const result = await query('insert into task (description) values ($1) returning *', [request.body.description])//query for bd
        response.status(200).json({id:result.rows[0].id})
    }catch(error){
        response.statusMessage = error;
        response.status(500).json({error: error})
    }
})

todoRouter.delete('/delete/:id', async(request, response) =>{
    const id = Number(request.params.id);
    try{
        const result = await query('delete from task where id = $1', [id])//query fro db
        response.status(200).json({id: id})
    }catch(error){
        response.statusMessage = error;
        response.status(500).json({error: error})
    }
})

module.exports ={todoRouter};