<?php
	$name = stripslashes($_POST['name']);
	$email = stripslashes($_POST['email']);
	$phone = $_POST['phoneNumber'];
	$website = $_POST['website'];
	$msg = stripslashes($_POST['message']);

	$to = "eric@ericfarley.net";
	$subject = "::: You recieved an email from ericfarley.net :::";
	$headers = "From: jobOffers@ericfarley.net\r\nReply-To: $email\r\nContent-type: text/html; charset=iso-8859-1";
	$message = "<h5 style=\"margin:0px\">HOLY SHIT!! A job offer or other contact has been received from <a href=\"mailto:".$email."\">".$email."</a>,</h5><br />";
	$message .= "<h5 style=\"margin:0px\">".$name."</h5>";
	if($phone != null){ 
		$message .= "<h5 style=\"margin:0px\">Phone: ".$phone."</h5>"; 
	}
	if($website != null){ 
		$message .= "<h5 style=\"margin:0px\">Website: ".$website."</h5>"; 
	}
	$message .= "<br /><fieldset style=\"padding-left:20px;\"><legend>Message</legend><h4 style=\"margin:0px\">".$msg."</h4></fieldset>";
	$mail = mail($to,$subject,$message,$headers);

	echo $mail;
?>