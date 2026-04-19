import mysql from "mysql2/promise";
import fs from "fs";

export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: "nhom11.mysql.database.azure.com",
      port: 3306,
      user: "admintechshop",
      password: "@Junkypnn82",
      database: "techshop",
      ssl: {
        ca: fs.readFileSync("./cacert/DigiCertGlobalRootG2.crt.pem")
      }
    });

    console.log("Azure MySQL connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to Azure MySQL:", error);
    process.exit(1);
  }
};
