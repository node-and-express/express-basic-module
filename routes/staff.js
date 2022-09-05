const express=require('express');
const router=express.Router();

const db=require('../config/mysqlconn');

router.get('/',db.getAll);
router.post('/',db.createStaff);
router.get('/:id',db.getById);
router.put('/:id',db.updateById);
router.delete('/:id',db.deleteById);


module.exports=router;