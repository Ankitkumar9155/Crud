const mysql = require('mysql2');
//const { errorMonitor } = require('mysql2/typings/mysql/lib/Connection');
let instance=null;
const con=mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "new"
});



con.connect((err)=>{
    if(err){
        console.log(err.message);
    }
    /*
    const query = "INSERT INTO new_table (name,date_added) VALUES ('Ankit','06/1/22')";
    con.query(query, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
    */

    
})


class DbService {
  static getDbServiceInstance() {
      return instance ? instance : new DbService();
  }

  async getAllData() {
      try {
          const response = await new Promise((resolve, reject) => {
              const query = "SELECT * FROM new_table;";

              con.query(query, (err, results) => {
                  if (err) reject(new Error(err.message));
                  resolve(results);
              });
          });
           //console.log(response);
          return response;
      } catch (error) {
          console.log(error);
      }
  }


  async insertNewName(name) {
    try{
      const dateAdded = new Date();
      const insertId = await new Promise((resolve,reject)=>{
        const query="INSERT INTO new_table(name,date_added) VALUES (?,?);";
        con.query(query,[name,dateAdded],(err,result)=>{
          if(err) reject(new Error(err.message));
          resolve(result.insertId);
        });
        //console.log(insertId);
        return {
          //id : insertId,
          name : name,
          dateAdded : dateAdded
        };
      });
    }catch(err){
      console.log(err);
    }

  }

  async deleteRowById(id){
    try {
      id = parseInt(id, 10); 
      const response = await new Promise((resolve, reject) => {
          const query = "DELETE FROM new_table WHERE id = ?";

          con.query(query, [id] , (err, result) => {
              if (err) reject(new Error(err.message));
              console.log(result);
              console.log(id);
              console.log(err);
              resolve(result.affectedRows);
          })
      });

      return response === 1 ? true : false;
  } catch (error) {
      console.log(error);
      return false;
  }
}


async updateNameById(id, name) {
  try {
      id = parseInt(id, 10); 
      const response = await new Promise((resolve, reject) => {
          const query = "UPDATE new_table SET name = ? WHERE id = ?";

          con.query(query, [name, id] , (err, result) => {
              if (err) reject(new Error(err.message));
              resolve(result.affectedRows);
          })
      });

      return response === 1 ? true : false;
  } catch (error) {
      console.log(error);
      return false;
  }
}


async searchByName(name) {
  try {
      const response = await new Promise((resolve, reject) => {
          const query = "SELECT * FROM new_table WHERE name = ?;";

          con.query(query, [name], (err, results) => {
              if (err) reject(new Error(err.message));
              resolve(results);
              //console.log(results);
          })
      });

      return response;
  } catch (error) {
      console.log(error);
  }
}



}

module.exports =DbService;






/*
class DbService {
  static getDbServiceInstance(){
    return instance ? instance :new DbService();
  }

  async getAllData(){
    try{
      const response = await new Promise((resolve,reject)=>{
        const query ="SELECT * FROM new_table;";
        con.query(query,(err,results)=>{
          if(err) reject(new errorMonitor(err.message));
          resolve(results);
        })
      });
      console.log(response);
      //console.log("hello");
    } catch(error){
      console.log(error);
    }
  }
}


*/