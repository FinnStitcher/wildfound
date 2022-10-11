// making a route that will automatically figure out what order each species belongs to and put the id in

const router = require('express').Router();

const {Species, Class, Order, Family, Genus} = require('../models');

// so i'm thinking what we need to do is run two methods
// first class.findone and include all the species at the bottom of the chain
// and make an array of those species ids
// then species.update with the class id in the body, going through that array of species ids

router.put('/', async (req, res) => {
    const {class_id} = req.body;

    const response = await Class.findOne({
        where: {
            id: class_id
        },
        include: {
            model: Order,
            include: {
                model: Family,
                include: {
                    model: Genus,
                    include: {
                        model: Species,
                        attributes: ['id', 'species_name']
                    }
                }
            }
        }
    });

    const plainData = response.get({plain: true});
    
    // stripping back the layers of taxonomy
    const speciesIds = [];

    plainData.orders.forEach(order => {
        order.families.forEach(family => {
            family.genera.forEach(genus => {
                genus.species.forEach(element => {
                    speciesIds.push(element.id);
                })
            })
        })
    });

    // NOW we can update the table
    const response2 = await Species.update({class_id}, {
        where: {
            id: [...speciesIds]
        }
    });

    res.json(response2);
})

module.exports = router;