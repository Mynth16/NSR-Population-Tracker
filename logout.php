<?php
require_once 'backend/includes/auth.php';

Auth::logout();
header('Location: login.php');
exit();
