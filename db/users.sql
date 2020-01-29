-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Jan 29, 2020 at 02:39 AM
-- Server version: 5.7.24-log
-- PHP Version: 7.2.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `othello`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` tinyint(20) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(20) DEFAULT '123',
  `win` tinyint(100) DEFAULT NULL,
  `lose` tinyint(100) DEFAULT NULL,
  `count` tinyint(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `win`, `lose`, `count`) VALUES
(1, 'kouhei', '123', NULL, NULL, NULL),
(2, 'hiroaki', '123', NULL, NULL, NULL),
(3, 'can', '123', NULL, NULL, NULL),
(4, 'shoya', '123', NULL, NULL, NULL),
(5, 'aren', '123', NULL, NULL, NULL),
(6, 'yuta', '123', NULL, NULL, NULL),
(7, 'yasuhiro', '123', NULL, NULL, NULL),
(8, 'akifumi', '123', NULL, NULL, NULL),
(9, 'junki', '123', NULL, NULL, NULL),
(10, 'ryuji', '123', NULL, NULL, NULL),
(11, 'reo', '123', NULL, NULL, NULL),
(12, 'hajime', '123', NULL, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
