/**
 * REQUIREMENT.
 * Create a .env file for 'pcypher' in the root directory of your project. 
 * Add environment-specific variables on new lines in the form of NAME=VALUE. 
 * For example:
    # environment sample content

    SECRET_KEY=InputRandomKeyHere
    KEY_LENGTH=16

*/


const { pool } = require('../database/database');
const { hasher } = require('pcypher');

exports.createUser = (req, res, next) => {

    (async() => {
        try {
            //Hashing
            const plaintTextPassword = req.body.user_password;
            const password = await hasher(plaintTextPassword);
            //console.log(password);

            let data = {
                firstName: req.body.first_name,
                lastName: req.body.last_name,
                email: req.body.email,
                userPassword: password,
                gender: req.body.gender,
                jobRole: req.body.job_role,
                department: req.body.department,
                userAddress: req.body.user_address,
                createdOn: Date(Date.now()).toString()
            };
        
            //console.log(data)
        
            const text = `INSERT INTO employeeDetails(firstName, lastName, email, userPassword, gender, jobRole, department, userAddress, createdOn) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)`
            const values = Object.values(data); //Convert Object to Array
        
        
            pool.query(text , values).then(
                () => {
                    res.status(201).json({
                        message: 'Congratulation you have created a new user'
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        message: {
                            name: error.name,
                            code: error.code,
                            detail: error.detail
                        }
                    })
                }
            )

        } catch{
            console.error(error);
        }
    })();
         
}
