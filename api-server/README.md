# mongoose-transactions

# Overview
A simple and small project to understand the concept of <a href="https://mongoosejs.com/docs/transactions.html" target="_blank">transactions</a> in mongodb

It is a simple express server which allows users to create account with username and add balance into it. It also has the functionality to make transaction of some amount from one user to another user which is using the concept of transaction in mongoose.

**Note**: The purpose of this project is to just understand and practice the concept of transactions and replica set in mongodb/mognoose. So it does not have any security mechanisms or any other features. Feel free to contribute.

To use the transaction in mongodb we have to create the <a href="https://www.mongodb.com/docs/manual/replication/" target="_blank">replica set</a> of our database.


# Creating replica set

1) First stop all mongod instances on your system if there are any running.
2) Start each instance as a member of the replica set. You can do this by running multiple mongod instances on different ports. For example : 

`mongod --port 27017 --dbpath <your_data_directory_path>/data/db1 --replSet rs0`

`mongod --port 27018 --dbpath <your_data_directory_path>/data/db2 --replSet rs0`

make sure that you create db1 and db2 folders in your data directory.

3) You can try connect to one of these instances using mongosh to check. For example : 

`mongosh --port 27017`

4) After successfull connection you can use the below command to initiate the replica set. You can create the replica set configuration object and pass it to **rs.initiate()**. For example : 

```
rsconf = {
  _id: "rs0",
  members: [
    { _id: 0, host: "localhost:27017" },
    { _id: 1, host: "localhost:27018" },
  ]
}
rs.initiate(rsconf)
```

# Start express server
1) create a **.env** file at root level and put the below line in that. (For local database)

   `MONGO_URI=mongodb://localhost:27017,localhost:27018/?replicaSet=rs0`

2) install the dependencies and start the server

   ```
   npm install
   npm run start
   ```
