'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Users', [{
      username  : "irsan",
      password  : "something",
      name      : "irsan",
      email     : "irsan@tyahoo.com",
      bio       : "something fun",
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      username  : "iqbal",
      password  : "something",
      name      : "iqbal",
      email     : "iqbal@tyahoo.com",
      bio       : "something fun",
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      username  : "irwin",
      password  : "something",
      name      : "irwin",
      email     : "irwin@tyahoo.com",
      bio       : "something fun",
      createdAt : new Date(),
      updatedAt : new Date()
    },{
      username  : "ibdra",
      password  : "something",
      name      : "ibdra",
      email     : "ibdra@tyahoo.com",
      bio       : "something fun",
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
