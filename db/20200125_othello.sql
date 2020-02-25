-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Feb 25, 2020 at 04:47 AM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
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
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
CREATE TABLE `history` (
  `id` tinyint(30) NOT NULL,
  `roomid` tinyint(15) NOT NULL,
  `color` tinyint(2) NOT NULL,
  `x` tinyint(8) NOT NULL,
  `y` tinyint(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `id` tinyint(30) NOT NULL,
  `roomid` tinyint(15) NOT NULL,
  `userid` tinyint(30) NOT NULL,
  `message` varchar(45) DEFAULT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`id`, `roomid`, `userid`, `message`, `time`, `name`) VALUES
(1, 9, 12, '1234', '2020-02-25 04:20:00', 'hajime'),
(2, 9, 12, '6886', '2020-02-25 04:20:02', 'hajime'),
(3, 10, 12, 'r6756756756', '2020-02-25 04:20:25', 'hajime');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` tinyint(30) NOT NULL,
  `name` varchar(45) NOT NULL,
  `members` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `members`) VALUES
(11, 'room01', ''),
(12, 'room02', ''),
(13, 'room03', '');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` tinyint(20) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(20) DEFAULT '123',
  `win` tinyint(100) DEFAULT '0',
  `lose` tinyint(100) DEFAULT '0',
  `count` tinyint(200) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `win`, `lose`, `count`) VALUES
(1, 'kouhei', '123', 0, 0, 0),
(2, 'hiroaki', '123', 0, 1, 1),
(3, 'can', '123', 0, 0, 0),
(4, 'shoya', '123', 0, 0, 0),
(5, 'aren', '123', 0, 0, 0),
(6, 'yuta', '123', 0, 0, 0),
(7, 'yasuhiro', '123', 0, 0, 0),
(8, 'akifumi', '123', 0, 0, 0),
(9, 'junki', '123', 0, 0, 0),
(10, 'ryuji', '123', 0, 0, 0),
(11, 'reo', '123', 0, 0, 0),
(12, 'hajime', '123', 1, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `history`
--
ALTER TABLE `history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `history`
--
ALTER TABLE `history`
  MODIFY `id` tinyint(30) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `id` tinyint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` tinyint(30) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` tinyint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
