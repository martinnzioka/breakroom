const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:Elbytechm2a.@localhost:5432/breakroom';

// Test connection status.
const pool = new Pool({
    connectionString: connectionString,
});

async function connectionTest() {

    try {
        const res = await pool.query('SELECT NOW ()')
        console.log(`Database connected` + '\n' + JSON.stringify(res.rows[0]))
    } catch(err) {
        console.log(`Database connection error:` + '\n' + err.stack)
    }

    

}

connectionTest();
module.exports = { pool };