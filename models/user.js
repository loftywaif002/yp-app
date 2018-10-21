var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

// create a sequelize instance with our local postgres database information.
var sequelize = new Sequelize('postgres://postgres@localhost:5432/yp-database');

// setup User model and its fields.
var User = sequelize.define('users', {
    firstname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    website: {
        type: Sequelize.STRING,
        allowNull: true
    },
    service_areas: {
        type: Sequelize.STRING,
        allowNull: true
    },
    business_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
   salt: {
        type: Sequelize.STRING,
        allowNull: true
   },
    zipcode: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync();
        user.salt = salt;
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
    instanceMethods: {
      validPassword: function(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }    
});

// create all the defined tables in the specified database.
sequelize.sync()
    .then(() => console.log('users table has been successfully created, if one doesn\'t exist'))
    .catch(error => console.log('Theres an error while sync', error));

// export User model for use in other files.
module.exports = User;
