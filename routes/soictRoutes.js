import express from 'express';
import { addCseSubs, checkCseDuplicate, deleteTable, searchCseSubs, updateTable, viewCseSubs } from '../controllers/cseController.js';
import { addItSubs, checkItDuplicate, searchItSubs, viewItSubs } from '../controllers/itController.js';
import { addEceSubs, checkEceDuplicate, searchEceSubs, viewEceSubs } from '../controllers/eceController.js';

const router = express.Router();

router.get('/viewsubjects/cse', viewCseSubs);
router.get('/searchsubject/cse', searchCseSubs);
router.get('/checkduplicate/cse', checkCseDuplicate);
router.post('/addsubject/cse', addCseSubs);
router.put('/updatetable/cse', updateTable);
router.put('/deletetable/cse', deleteTable);

router.get('/viewsubjects/it', viewItSubs);
router.get('/searchsubject/it', searchItSubs);
router.post('/addsubject/it', addItSubs);
router.get('/checkduplicate/it', checkItDuplicate);

router.get('/viewsubjects/ece', viewEceSubs);
router.get('/searchsubject/ece', searchEceSubs);
router.get('/checkduplicate/ece', checkEceDuplicate);
router.post('/addsubject/ece', addEceSubs);

export default router;