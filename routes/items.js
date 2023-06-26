const mongoose = require('mongoose');
const Item = require('../models/item');

const router = require('express').Router();

//get all items
router.get('/', async (req, res) => {
    const items = await Item.find();
    res.status(200).json(items);
});

// get one item
router.get('/:id', async (req, res) => {
});

// create one item
router.post('/', async(req, res) => {
    //test if item exists, if true, update quantity
    const item = await Item.findOne({ barcode: req.body.barcode });
    if (item) {
        try {
        item.quantity += req.body.quantity;
        item.save()
            .then(() => res.json({ message: 'Item count updated' }))
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
        return;
    }

    try {
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            barcode: req.body.barcode,
            quantity: req.body.quantity
        });
        const newItem = await item.save();
        res.status(201).json({ message: 'Item added', newItem});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

});

// update one item
router.put('/:id', async (req, res) => {

});

// delete one item
router.delete('/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        item.deleteOne();
        res.json({ message: 'Item deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//get time taken for request
function logger(req, res, next) {
    res.on('finish', () => {
        console.log(req.method, req.originalUrl, res.statusCode, res.get('Content-Length'), 'bytes');
    }
    );
    next();
}


module.exports = router;