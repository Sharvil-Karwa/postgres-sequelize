module.exports = (sequelize, Sequelize) => {
  const Tutorial = sequelize.define("tutorial", {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    published: {
      type: Sequelize.BOOLEAN,
    },
  });
  return Tutorial;
};

// The above code means that the Tutorial model will have the following attributes:
// title: a string
// description: a string
// published: a boolean
