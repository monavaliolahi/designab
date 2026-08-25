<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "your-email@gmail.com";  // ← ایمیل خودت رو اینجا بذار
    $subject = "پیام جدید از سایت Designab";
    $body = "نام: $name\nایمیل: $email\nپیام: $message";
    $headers = "From: $email";
    
    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
?>