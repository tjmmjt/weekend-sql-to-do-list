// requires express and Router
const router = require("express").Router();
// require pool module
const pool = require("../modules/pool");

// - Server Methods ===>>> DB Interactions
// 	- GET, POST, DELETE, PUT ===>>>
// 	- SELECT, INSERT, DELETE, UPDATE

// // TODO SELECT all data from weekend-to-do-app
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

// TODO INSERT new todo to DB
// post
router.post("/", (req, res) => {
  // declare todo item and initialize with req.body
  let newToDo = req.body;
  // declare queryText w/ bling values
  const queryText = `
    INSERT INTO "todos" ("text", "isComplete")
    VALUES ($1, $2);
    `;
  // declare params
  const queryParams = [newToDo.text, newToDo.isComplete];

  // send query with queryText and Params
  pool
    .query(queryText, queryParams)
    //then sendStatus
    .then((result) => {
      console.log("Successfully added To-Do");
      res.sendStatus(201);
    }) // catch error
    .catch((error) => {
      console.log("Could not add To-Do", error);
    });
});

// put

// delete

module.exports = router;
