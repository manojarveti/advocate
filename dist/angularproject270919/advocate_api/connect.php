<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Max-Age: 1000");
 header("Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE, PUT");
 header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding");
// db credentials
define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'admin@123');
define('DB_NAME', 'advocate');

// Connect with the database.
function connect()
{
  $connect = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($connect)) {
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($connect, "utf8");

  return $connect;
}

$con = connect();