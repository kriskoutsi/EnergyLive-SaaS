-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Εξυπηρετητής: 127.0.0.1
-- Χρόνος δημιουργίας: 17 Ιουλ 2022 στις 01:31:07
-- Έκδοση διακομιστή: 10.4.19-MariaDB
-- Έκδοση PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Βάση δεδομένων: `saas22atl`
--

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `atl data load`
--

CREATE TABLE `atl data load` (
  `AreaName` varchar(100) NOT NULL,
  `DateTime` datetime NOT NULL,
  `TotalLoadValue` float(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Δομή πίνακα για τον πίνακα `atl dimensions`
--

CREATE TABLE `atl dimensions` (
  `AreaName` varchar(100) NOT NULL,
  `ResolutionCode` varchar(100) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Άδειασμα δεδομένων του πίνακα `atl dimensions`
--

INSERT INTO `atl dimensions` (`AreaName`, `ResolutionCode`) VALUES
('AZ CTY', NULL),
('AL CTY', 'PT15M'),
('AM CTY', NULL),
('AT CTY', 'PT15M'),
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
('SE CTY', 'PT60M'),
('SI CTY', 'PT60M'),
('SK CTY', 'PT60M'),
('TR CTY', NULL),
('UA CTY', 'PT60M'),
('UK CTY', NULL),
('XK CTY', 'PT60M'),
('Russian Federation', NULL),
('Armenia', NULL),
('Azerbaijan', NULL);

--
-- Ευρετήρια για άχρηστους πίνακες
--

--
-- Ευρετήρια για πίνακα `atl data load`
--
ALTER TABLE `atl data load`
  ADD PRIMARY KEY (`AreaName`,`DateTime`);

--
-- Ευρετήρια για πίνακα `atl dimensions`
--
ALTER TABLE `atl dimensions`
  ADD PRIMARY KEY (`AreaName`);

--
-- Περιορισμοί για άχρηστους πίνακες
--

--
-- Περιορισμοί για πίνακα `atl data load`
--
ALTER TABLE `atl data load`
  ADD CONSTRAINT `AreaNameConstraint` FOREIGN KEY (`AreaName`) REFERENCES `atl dimensions` (`AreaName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
