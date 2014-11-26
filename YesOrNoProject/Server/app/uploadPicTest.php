<?php
$allowedExts = array("gif", "jpeg", "jpg", "png");
$temp = explode(".", $_FILES["picfile_up"]["name"]);
echo "Maximun allowed file size is:".ini_get('upload_max_filesize');

$extension = end($temp);
if ((($_FILES["picfile_up"]["type"] == "image/gif")
        || ($_FILES["picfile_up"]["type"] == "image/jpeg")
        || ($_FILES["picfile_up"]["type"] == "image/jpg")
        || ($_FILES["picfile_up"]["type"] == "image/pjpeg")
        || ($_FILES["picfile_up"]["type"] == "image/x-png")
        || ($_FILES["picfile_up"]["type"] == "image/png"))
        && ($_FILES["picfile_up"]["size"] <= 20000000000000000000000)
        && in_array($extension, $allowedExts))
{
      if ($_FILES["picfile_up"]["error"] > 0)
      {
        echo "Return Code: " . $_FILES["picfile_up"]["error"] . "<br>";
      }
      else
      {
        echo "Upload: " . $_FILES["picfile_up"]["name"] . "<br>";
        echo "Type: " . $_FILES["picfile_up"]["type"] . "<br>";
        echo "Size: " . ($_FILES["picfile_up"]["size"] / 1024) . " kB<br>";
        echo "Temp file: " . $_FILES["picfile_up"]["tmp_name"] . "<br>";
    
        if (file_exists("upload/" . $_FILES["picfile_up"]["name"]))
        {
          echo $_FILES["picfile_up"]["name"] . " already exists. ";
        }
        else
        {
          move_uploaded_file($_FILES["picfile_up"]["tmp_name"],
          "upload/" . $_FILES["picfile_up"]["name"]);
          echo "Stored in: " . "upload/" . $_FILES["picfile_up"]["name"]."<br>";


        }
      }
}
else
{
  echo "Invalid file";
}
?>