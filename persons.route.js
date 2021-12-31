const express = require('express');
const personRoutes = express.Router();
personRoutes.route('/add').post(function(req,res){
    let sql = 'INSERT INTO  Persons  set ?';
    let params={
        name:req.body.name,
        company:req.body.company,
        age:req.body.age
    }
    db.query(sql,params,(err,data)=>{
        if(err){
            res.status(400).send("unable to save to database");}
        else{
            res.status(200).json({'person': 'person in added successfully'});
        }
    })

});

personRoutes.route('/').get(function (req, res) {
    db.query('SELECT * FROM Persons',(err,rows,fields)=>{  
        if(!err)   
            res.json(rows); 
        else  
            console.log(err);  
    }) 
});

module.exports = personRoutes;