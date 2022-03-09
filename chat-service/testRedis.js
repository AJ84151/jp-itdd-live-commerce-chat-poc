// import {
//     createClient
// } from 'redis';

const redis = require('redis');

console.dir(redis);

(async () => {
    const client = redis.createClient({url: 'redis://localhost:6379'});
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect();
    await client.set('test2', 'test');
    await client.disconnect();
})();
