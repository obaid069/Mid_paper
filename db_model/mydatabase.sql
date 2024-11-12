-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : mysql
-- Généré le : mer. 13 oct. 2021 à 17:04
-- Version du serveur : 5.6.51
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `mydatabase`
--

-- --------------------------------------------------------

--
-- Structure de la table `Class`
--

CREATE TABLE `Class` (
  `id` int(11) NOT NULL,
  `level` varchar(100) DEFAULT NULL,
  `Teacher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Class`
--

INSERT INTO `Class` (`id`, `level`, `Teacher_id`) VALUES
(16, 'Primary class P1', 2),
(17, 'Primary class P2', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `Class_has_Student`
--

CREATE TABLE `Class_has_Student` (
  `Class_id` int(11) NOT NULL,
  `Student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Class_has_Student`
--

INSERT INTO `Class_has_Student` (`Class_id`, `Student_id`) VALUES
(16, 3);

-- --------------------------------------------------------

--
-- Structure de la table `Student`
--

CREATE TABLE `Student` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Student`
--

INSERT INTO `Student` (`id`, `name`, `birthday`, `gender`) VALUES
(3, 'Lirienne Marleau', '1999-01-13', 'female'),
(18, 'Talon Leroy', '1990-10-16', 'female'),
(20, 'Gilles Gagnon', '1998-07-06', 'male'),
(21, 'Oliver Laramée', '2001-05-30', 'male'),
(22, 'Hortense Beaudoin', '1999-11-09', 'female');

-- --------------------------------------------------------

--
-- Structure de la table `Teacher`
--

CREATE TABLE `Teacher` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `gender` enum('male','female','other') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `Teacher`
--

INSERT INTO `Teacher` (`id`, `name`, `email`, `gender`) VALUES
(2, 'Ruth Balmat', 'ruth.balmat@gmail.com', 'female'),
(3, 'Thomas Humbert', 'thomas.humbert@gmail.com', 'male'),
(4, 'Claudia Chopard', 'claudia.chaupard@gmail.com', 'female');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `Class`
--
ALTER TABLE `Class`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_Class_Teacher` (`Teacher_id`);

--
-- Index pour la table `Class_has_Student`
--
ALTER TABLE `Class_has_Student`
  ADD PRIMARY KEY (`Class_id`,`Student_id`),
  ADD KEY `fk_Class_has_Student_2` (`Student_id`);

--
-- Index pour la table `Student`
--
ALTER TABLE `Student`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `Teacher`
--
ALTER TABLE `Teacher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Class`
--
ALTER TABLE `Class`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `Student`
--
ALTER TABLE `Student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT pour la table `Teacher`
--
ALTER TABLE `Teacher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `Class_has_Student`
--
ALTER TABLE `Class_has_Student`
  ADD CONSTRAINT `fk_Class_has_Student_1` FOREIGN KEY (`Class_id`) REFERENCES `Class` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Class_has_Student_2` FOREIGN KEY (`Student_id`) REFERENCES `Student` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
