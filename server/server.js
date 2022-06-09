const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password123@',
    database: 'todotaskmanager'
})

app.use(cors());
app.use(bodyParser.json())

app.get('/list', (req, res) => {
    const TASK_QUERY = "select * from todotaskmanager.tasks"
    connection.query(TASK_QUERY, (error, resonse)=>{
        if(error){console.log(error)}
        else res.send(resonse)
    })
})

app.post('/add', (req, res) => {
    const ADD_QUERY = `insert into todotaskmanager.tasks (task) values ('${req.body.task}')`
    connection.query(ADD_QUERY, (error)=>{
        if(error){console.log(error)}
        else res.send('you can add tasks')
    })
})

app.delete('/delete/:taskid', (req, res) => {
    const DELATE_QUERY = `DELETE FROM todotaskmanager.tasks where (taskid=${req.params.taskid})`
    connection.query(DELATE_QUERY, (error)=>{
        if(error){console.log(error)}
    })
})

app.listen(4000, () => {
    console.log('running on port 4000')
})