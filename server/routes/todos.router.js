// requires express and Router
const router = require("express").Router();
// require pool module
const pool = require("../modules/pool");

// - Server Methods ===>>> DB Interactions
// 	- GET, POST, DELETE, PUT ===>>>
// 	- SELECT, INSERT, DELETE, UPDATE

// // TODO GET/SELECT all data from weekend-to-do-app
// get
router.get("/", (req, res) => {
  // declare queryText
  const queryText = `SELECT * FROM "todos" ORDER BY "id"`;
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

// // TODO POST/INSERT new todo to DB
// post
router.post("/", (req, res) => {
  // declare todo item and initialize with req.body
  let newToDo = req.body;
  // declare queryText and params w/ bling values
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

// TODO PUT/UPDATE isComplete in DB
// TODO this will take an ID param, then update the isComplete
// put
router.put("/:id", (req, res) => {
  // declare isComplete and initialize w/ req.body.isComplete
  let isComplete = req.body.isComplete;
  console.log("Req.Body:", req.body);
  // declare todoId, initialize req.params.id
  let todoId = req.params.id;
  console.log("Req.Params:", todoId);
  // toggle todos, if isComplete === true/false, toggle
  // declare queryText and params
  let queryText;
  let queryParams = [todoId];

  if (isComplete === true) {
    queryText = `UPDATE "todos" SET "isComplete"=false WHERE "id" = $1;`;
  } else {
    queryText = `UPDATE "todos" SET "isComplete"=true WHERE "id" = $1;`;
  }
  // send query
  pool
    .query(queryText, queryParams)
    // then sendStatus
    .then(() => {
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Could not update isComplete:", error);
    });
});

// // TODO Delete todo in DB
// delete
router.delete("/:id", (req, res) => {
  // declare todoId and initialize with req.params.id
  const todoId = req.params.id;

  // declare queryText and params w/ bling values
  const queryText = `DELETE FROM "todos" WHERE "id"=$1;`;
  // declare params
  const queryParams = [todoId];

  // send query
  pool
    .query(queryText, queryParams)

    // then sendStatus
    .then(() => {
      console.log("");
      res.sendStatus(200);
    })
    .catch((error) => {
      console.log("Cannot Delete:", error);
    });
});

module.exports = router;
