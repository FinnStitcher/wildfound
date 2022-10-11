const router = require('express').Router();

const {Species, Class, Order, Family, Genus} = require('../models');

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