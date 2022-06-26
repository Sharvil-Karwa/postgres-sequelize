const db = require("../models");
const Tut = db.tut;
const Op = db.Sequelize.Op;
// Op means that Sequelize will use the sequelize.Op class. Sequelize Op class is a class that contains a set of methods that can be used to build query conditions.

var create = function (req, res) {
  if (!req.body.title || !req.body.description) {
    res.status(400).send("Title and description are required.");
    return;
  }
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published,
  };
  Tut.create(tutorial)
    .then((tutorial) => {
      res.send(tutorial);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

var findAll = function (req, res) {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
  // the above code means that if the title query parameter is present, then condition will be an object with the title attribute set to a value that contains the title query parameter.
  // If the title query parameter is not present, then condition will be null.
  // [Op.like] means that Sequelize will use the sequelize.Op.like method to build the condition.
  Tut.findAll({ where: condition })
    .then((tutorials) => {
      res.send(tutorials);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

var findOne = function (req, res) {
  const id = req.params.id;
  Tut.findByPk(id)
    .then((tutorial) => {
      if (!tutorial) {
        res.status(404).send({
          message: "Tutorial not found with id " + id,
        });
        return;
      }
      res.send(tutorial);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

var update = function (req, res) {
  const id = req.params.id;
  Tut.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id,
      });
    });
};

var delete1 = function (req, res) {
  const id = req.params.id;
  Tut.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Tutorial with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};

var deleteAll = function (req, res) {
  Tut.destroy({
    where: {},
    truncate: false,
    // truncate false means that Sequelize will not delete all rows in the table.
    // Instead, it will only delete the rows that match the where condition.
  })
    .then(() => {
      res.send({
        message: "All tutorials were deleted successfully!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete tutorials",
      });
    });
};

var findPublished = function (req, res) {
  Tut.findAll({ where: { published: true } })
    .then((tutorials) => {
      res.send(tutorials);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

module.exports = {
  create,
  findAll,
  findOne,
  update,
  delete1,
  deleteAll,
  findPublished,
};
