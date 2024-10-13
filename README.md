# CRUD-MySQL-DB

An app that has full functionality of create, read, update, and delete. Using MySql relational database.

# Stack
- Node
- Express
- MySql
- Vanilla JS
- HTML

# Setup

- clone to computer using:

```
git clone https://github.com/birukkebede11/CRUD-MySQL-DB.git
```

- run npm install from inside the root directory to install the necessary modules

```
npm install
```

run the server

```
node crudDB.js
```

I suggest to run the sever with nodemon

```
nodemon crudDB.js
```

## Make sure to insert your own credentials for MySql connection

## DKG: Additional Note on posting (sending) data from front-end (form) vs using postman
 1. first you need to import DEMoC: require(dotenv).config()  express, mysql2 and MAMP on, and CORS
 2. Define app = express() and middlewares   
  app.use(express.urlencoded({extended: true,})); //for URL-encoded payloads (form data)
  app.use(express.json());// for JSON payloads from API requests (e.g. Postman)
  app.use(cors());//cross-origin resource sharing --b/n different servers
 3. Create connection body using user credential and connect to the database
 4. Define a GET route for the root path 
    app.get("/", (req, res) => res.send("Up and running..."));
 5. Define a POST route for sending customers info 
    app.post("/insert-customers-info", (req, res) => {
	console.table (req.body)// display req body key:value pair in table
	const { name, address, company } = req.body; // Destructuring the values sent from the frontend
     /******** 
     1. insert table: Declare and define variables for 
         - insertColumn : insert sql statement within back ticks 
         - ColumnValues : in array form 
     2. query to be excuted for each insert statement : connection
        		connection.query(insertAddress, [id, address], (err, results, fields) => {
 			        if (err) console.log(`Error Found: ${err}`);
		            }); 
     ********/
    res.end("Data inserted successfully!");
    console.log("Data inserted successfully!");
    });

    app.listen (2024, ()=>{
        console.log ("listening and running on http://localhost:2024")
    })  // end of app.post curly braces and round bracket
