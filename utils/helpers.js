module.exports = {
    generate_link: (object) => {
        // get keys out of object
        const keys = Object.keys(object);
        const regex = /.+_name/;
        const [nameProperty] = keys.filter(element => element.match(regex));

        // parse *_name property to get the appropriate prefix
        const namePrefix = nameProperty.split('_')[0];
        
        switch (namePrefix) {
            case 'class':
                return '/classes/' + object.id;
            case 'genus':
                return '/genera/' + object.id;
            case 'family':
                return '/families/' + object.id;
            case 'species':
                return '/species/' + object.id;
            default:
                return `/${namePrefix}s/${object.id}`;
        };
    },
    locate_name: (object) => {
        // get keys out of object
        const keys = Object.keys(object);
        const regex = /.+_name/;
        const [nameProperty] = keys.filter(element => element.match(regex));

        // return the value of the relevant property
        return object[nameProperty];
    }
}