var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : '',
  database        : 'staff-expressjs'
});


const selectQuery='select * from staff';
const getAll=(req,res)=>{
    pool.query(selectQuery, function (error, results, fields) {
            if (error) throw error;
            res.status(200).json(results);
        });
};

const createStaff=(req,res)=>{
    let data = {name: req.body.name, company: req.body.company, location:req.body.location};  
    let sqlQuery = "INSERT INTO staff SET ?";

    pool.query(sqlQuery,data,(error, results, fields) =>{
            if (error) throw error;
            res.status(200).json({id:results.insertId});
        });
};

const getById=(req,res)=>{ 
    let sqlQuery = "SELECT * FROM staff WHERE id = " + req.params.id;

    pool.query(sqlQuery,(error, results, fields) =>{
            if (error) throw error;
            res.status(200).json(results);
        });
};

const updateById=(req,res)=>{ 
    let sqlQuery = "UPDATE staff SET name='" + req.body.name + "' WHERE id=" + req.params.id;

    pool.query(sqlQuery,(error, results, fields) =>{
            if (error) throw error;
            res.status(200).json(results);
        });
};

const deleteById=(req,res)=>{ 
    let sqlQuery = "DELETE FROM staff WHERE id=" + req.params.id;
    pool.query(sqlQuery,(error, results, fields) =>{
            if (error) throw error;
            res.status(200).json(results);
        });
};

module.exports={
    getAll,
    createStaff,
    getById,
    updateById,
    deleteById
};