const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require("mongodb");

// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//tOJ5XQzaNKCJYmGH

//middleware
app.use(cors());
app.use(express.json());

//copy form database connect

const uri =
  "mongodb+srv://brandShop:tOJ5XQzaNKCJYmGH@cluster0.3ovngzi.mongodb.net/?retryWrites=true&w=majority";

// const uri =
//   "mongodb+srv://brandShop:tOJ5XQzaNKCJYmGH@cluster0.3ovngzi.mongodb.net/?retryWrites=true&w=majority";

//pore add kora
MongoClient.connect(uri, function (err, client) {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  //   client.close();
});

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)

    //after send form client, this collection have ot create
    const productCollection = client.db("brandDB").collection("product");

    //send data from client and recived hare
    app.post("/product", async (req, res) => {
      const newProduct = req.body;
      console.log(newProduct);
      //after create collection
      const result = await productCollection.insertOne(newProduct);
      res.send(result);
    });

    // for getting form database read
    app.get("/product", async (req, res) => {
      const cursor = productCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    // Send a ping to confirm a successful connection

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
  }
}
run().catch(console.dir);
//----------------------------------copy from db end

app.get("/", (req, res) => {
  res.send("shop server is running");
});
app.listen(port, () => {
  console.log(`brand shop server is running on port: ${port}`);
});
