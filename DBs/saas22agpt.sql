-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 19, 2022 at 02:59 AM
-- Server version: 8.0.29-0ubuntu0.20.04.3
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `saas22agpt`
--

-- --------------------------------------------------------

--
-- Table structure for table `agpt data load`
--

CREATE TABLE `agpt data load` (
  `AreaName` varchar(100) NOT NULL,
  `ProductionType` varchar(100) NOT NULL,
  `DateTime` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `ActualGenerationOutput` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Table structure for table `agpt dimensions`
--

CREATE TABLE `agpt dimensions` (
  `AreaName` varchar(100) NOT NULL,
  `ResolutionCode` varchar(100) CHARACTER SET utf8mb4 DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `agpt dimensions`
--

INSERT INTO `agpt dimensions` (`AreaName`, `ResolutionCode`) VALUES
('AL CTY', 'PT15M'),
('AM CTY', NULL),
('Armenia', NULL),
('AT CTY', 'PT15M'),
('AZ CTY', NULL),
('Azerbaijan', NULL),
('BA CTY', 'PT60M'),
('BE CTY', 'PT15M'),
('BG CTY', 'PT60M'),
('BY CTY', NULL),
('CH CTY', 'PT60M'),
('CY CTY', 'PT30M'),
('CZ CTY', 'PT60M'),
('DE CTY', 'PT15M'),
('DK CTY', 'PT60M'),
('EE CTY', 'PT60M'),
('ES CTY', 'PT60M'),
('FI CTY', 'PT60M'),
('FR CTY', 'PT60M'),
('GE CTY', 'PT60M'),
('GR CTY', 'PT60M'),
('HR CTY', 'PT60M'),
('HU CTY', 'PT15M'),
('IE CTY', 'PT30M'),
('IT CTY', 'PT60M'),
('LT CTY', 'PT60M'),
('LU CTY', 'PT15M'),
('LV CTY', 'PT60M'),
('MD CTY', 'PT60M'),
('ME CTY', 'PT60M'),
('MK CTY', 'PT60M'),
('MT CTY', NULL),
('NL CTY', 'PT15M'),
('NO CTY', 'PT60M'),
('PL CTY', 'PT60M'),
('PT CTY', 'PT60M'),
('RO CTY', 'PT15M'),
('RS CTY', 'PT60M'),
('RU CTY', NULL),
('Russian Federation', NULL),
('SE CTY', 'PT60M'),
('SI CTY', 'PT60M'),
('SK CTY', 'PT60M'),
('TR CTY', NULL),
('UA CTY', 'PT60M'),
('UK CTY', NULL),
('XK CTY', 'PT60M');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `agpt data load`
--
ALTER TABLE `agpt data load`
  ADD PRIMARY KEY (`AreaName`,`ProductionType`,`DateTime`),
  ADD KEY `MapCode` (`AreaName`);

--
-- Indexes for table `agpt dimensions`
--
ALTER TABLE `agpt dimensions`
  ADD PRIMARY KEY (`AreaName`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `agpt data load`
--
ALTER TABLE `agpt data load`
  ADD CONSTRAINT `AreaName1` FOREIGN KEY (`AreaName`) REFERENCES `agpt dimensions` (`AreaName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
