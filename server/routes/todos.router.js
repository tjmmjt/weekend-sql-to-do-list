// requires express and Router
const router = require("express").Router();
// require pool module
const pool = require("../modules/pool");

// - Server Methods ===>>> DB Interactions
// 	- GET, POST, DELETE, PUT ===>>>
// 	- SELECT, INSERT, DELETE, UPDATE

// TODO SELECT all data from weekend-to-do-app
// GET
router.get("/", (req, res) => {
  // declare queryText
  const queryText = `SELECT * FROM "todos"`;
  // send query to DB
  pool
    .query(queryText)
    // then send results in rows
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    }) // catch error
    .catch((error) => {
      console.log(
        "looks like you'll just have to remember what to do!:",
        error
      );
    });
});

// post

// put

// delete

module.exports = router;
