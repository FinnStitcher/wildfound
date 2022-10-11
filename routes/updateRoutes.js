const router = require('express').Router();

const { Species, Order, Family, Genus } = require('../models');

// going to revise this to add orders
router.put('/', async (req, res) => {
    for (let order_id = 37; order_id <= 76; order_id++) {
	const response = await Order.findOne({
        where: {
            id: order_id
        },
		include: {
			model: Family,
			include: {
				model: Genus,
				include: {
					model: Species
				}
			}
		}
	});

	const plainData = response.get({ plain: true });

	// stripping back the layers of taxonomy
	const speciesIds = [];

    plainData.families.forEach(family => {
            family.genera.forEach(genus => {
                genus.species.forEach(species => {
                    speciesIds.push(species.id)
                })
            })
        });

	// NOW we can update the table
	const response2 = await Species.update(
		{ order_id },
		{
			where: {
				id: [...speciesIds]
			}
		}
	);

    if (response2) {
        console.log('done with order ' + order_id)
    }
    }

    console.log('all done');
});

module.exports = router;
