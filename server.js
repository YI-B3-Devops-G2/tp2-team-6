'use strict';

let isStatusUp = true;

let pgErr;
const Pool = require('pg').Pool;
const pool = new Pool({
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('error', (error) => {
    isStatusUp = false;
    pgErr = error.message;
    console.error(pgErr);
});

let redisErr;
const redis = require('redis'); // Port 6379
const client = redis.createClient({ host: process.env.REDIS_HOST });

client.on('error', (error) => {
    isStatusUp = false;
    redisErr = error.message;
    console.error(redisErr);
});
client.on('connect',()=>{
    isStatusUp = true;
    console.info('Successfully connected to redis');
});

const express = require('express');
const app = express();

const port = process.env.API_PORT || 4040;

app.get('/', function (req, res) {
    res.json({message: 'Hello World'})
});

app.get('/status', (req, res) => {
    if (isStatusUp)
    {
        pool.connect(function(err, client, done) {
            if (err)
            {
                isStatusUp = false;
                pgErr = err.message;
                console.error(pgErr);
                res.redirect('/status');
            }
            else
            {
                isStatusUp = true;
                const postgresQuery = 'SELECT date_trunc(\'second\', current_timestamp - pg_postmaster_start_time()) as uptime;';
                const result = pool.query(postgresQuery);
                const uptime = result.rows[0].uptime;
                const uptimeString = () => {
                    let time = '';

                    time += uptime.hours ? `${uptime.hours}h ` : '';
                    time += uptime.minutes ? `${uptime.minutes}m ` : '';
                    time += uptime.seconds ? `${uptime.seconds}s` : '';

                    return time
                };

                res.json({
                    status: 'Status page is up',
                    postgresUptime: uptimeString(),
                    redisConnectedClients: Number(client.server_info.connected_clients)
                });
            }
        });
    }
    else
    {
        res.json({
            status: 'Status page is not working correctly',
            redis_error : redisErr,
            pg_error : pgErr
        })
    }

});



app.listen(port, () => {
    console.log('We are live on ' + port);
});