-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Dec 24, 2019 at 04:38 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `chat`
--

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `name` varchar(10) NOT NULL,
  `message` text NOT NULL,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`name`, `message`, `time`) VALUES
('anmi', 'hello', '2019-12-11 14:09:28'),
('anmi', 'nano', '2019-12-11 14:27:09'),
('bob', 'yo', '2019-12-11 14:28:22'),
('ham', 'thanks', '2019-12-11 14:28:29'),
('sam', 'bye', '2019-12-11 14:28:36'),
('osero', 'tired', '2019-12-11 14:28:47'),
('papico', 'eat', '2019-12-11 14:28:55'),
('stanley', 'fishing', '2019-12-11 14:29:08'),
('meme', 'bye', '2019-12-11 14:29:30'),
('apple', 'pie', '2019-12-11 14:29:41'),
('blueberry', 'pie', '2019-12-11 14:29:46'),
('blueberry', 'pie', '2019-12-11 14:30:03'),
('blueberry', 'pie', '2019-12-11 14:30:09'),
('blueberry', 'pie', '2019-12-11 14:30:41');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
