-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-11-2023 a las 04:07:51
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `robotica`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_cat` int(32) NOT NULL,
  `categoria_cat` varchar(30) NOT NULL,
  `id_mod_cat` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_cat`, `categoria_cat`, `id_mod_cat`) VALUES
(8, 'o', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_equipos`
--

CREATE TABLE `categorias_equipos` (
  `id_catequ` int(32) NOT NULL,
  `id_cat_catequ` int(32) NOT NULL,
  `id_equ_catequ` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_equipos`
--

INSERT INTO `categorias_equipos` (`id_catequ`, `id_cat_catequ`, `id_equ_catequ`) VALUES
(3, 8, 7),
(4, 8, 6),
(5, 8, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipos`
--

CREATE TABLE `equipos` (
  `id_equ` int(32) NOT NULL,
  `equipo_equ` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipos`
--

INSERT INTO `equipos` (`id_equ`, `equipo_equ`) VALUES
(2, 'da'),
(6, 'dark'),
(7, 'dark c'),
(8, 'dark co'),
(9, 'dark coq'),
(1, 'nada');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `integrantes`
--

CREATE TABLE `integrantes` (
  `id_int` int(32) NOT NULL,
  `integrante_int` varchar(40) NOT NULL,
  `id_equ_int` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `integrantes`
--

INSERT INTO `integrantes` (`id_int`, `integrante_int`, `id_equ_int`) VALUES
(3, 'Pepo', 2),
(6, 'Pe', 1),
(8, 'Pep', 6),
(10, 'Pepe', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modalidades`
--

CREATE TABLE `modalidades` (
  `id_mod` int(32) NOT NULL,
  `modalidad_mod` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modalidades`
--

INSERT INTO `modalidades` (`id_mod`, `modalidad_mod`) VALUES
(3, 'nuev'),
(4, 'nueva'),
(5, 'Manquitos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrocinantes`
--

CREATE TABLE `patrocinantes` (
  `id_pat` int(32) NOT NULL,
  `patrocinante_pat` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patrocinantes`
--

INSERT INTO `patrocinantes` (`id_pat`, `patrocinante_pat`) VALUES
(1, 'a'),
(4, 'ab'),
(5, 'abc');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrocinantes_equipos`
--

CREATE TABLE `patrocinantes_equipos` (
  `id_patequ` int(32) NOT NULL,
  `id_pat_patequ` int(32) NOT NULL,
  `id_equ_patequ` int(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patrocinantes_equipos`
--

INSERT INTO `patrocinantes_equipos` (`id_patequ`, `id_pat_patequ`, `id_equ_patequ`) VALUES
(5, 1, 2),
(6, 1, 2),
(7, 4, 2),
(8, 5, 2),
(9, 5, 9),
(10, 5, 8),
(11, 4, 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `role` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_cat`),
  ADD UNIQUE KEY `categoria` (`categoria_cat`),
  ADD KEY `id_mod_cat` (`id_mod_cat`);

--
-- Indices de la tabla `categorias_equipos`
--
ALTER TABLE `categorias_equipos`
  ADD PRIMARY KEY (`id_catequ`),
  ADD KEY `id_equ_catequ` (`id_equ_catequ`),
  ADD KEY `id_cat_catequ` (`id_cat_catequ`);

--
-- Indices de la tabla `equipos`
--
ALTER TABLE `equipos`
  ADD PRIMARY KEY (`id_equ`),
  ADD UNIQUE KEY `equipo` (`equipo_equ`);

--
-- Indices de la tabla `integrantes`
--
ALTER TABLE `integrantes`
  ADD PRIMARY KEY (`id_int`),
  ADD UNIQUE KEY `integrante` (`integrante_int`),
  ADD KEY `id_equ_int` (`id_equ_int`);

--
-- Indices de la tabla `modalidades`
--
ALTER TABLE `modalidades`
  ADD PRIMARY KEY (`id_mod`),
  ADD UNIQUE KEY `id_mod` (`id_mod`,`modalidad_mod`);

--
-- Indices de la tabla `patrocinantes`
--
ALTER TABLE `patrocinantes`
  ADD PRIMARY KEY (`id_pat`),
  ADD UNIQUE KEY `patrocinante` (`patrocinante_pat`);

--
-- Indices de la tabla `patrocinantes_equipos`
--
ALTER TABLE `patrocinantes_equipos`
  ADD PRIMARY KEY (`id_patequ`),
  ADD KEY `id_pat_patequ` (`id_pat_patequ`),
  ADD KEY `id_equ_patequ` (`id_equ_patequ`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_cat` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `categorias_equipos`
--
ALTER TABLE `categorias_equipos`
  MODIFY `id_catequ` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `equipos`
--
ALTER TABLE `equipos`
  MODIFY `id_equ` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `integrantes`
--
ALTER TABLE `integrantes`
  MODIFY `id_int` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `modalidades`
--
ALTER TABLE `modalidades`
  MODIFY `id_mod` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `patrocinantes`
--
ALTER TABLE `patrocinantes`
  MODIFY `id_pat` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `patrocinantes_equipos`
--
ALTER TABLE `patrocinantes_equipos`
  MODIFY `id_patequ` int(32) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD CONSTRAINT `Categorias_ibfk_1` FOREIGN KEY (`id_mod_cat`) REFERENCES `modalidades` (`id_mod`) ON DELETE CASCADE;

--
-- Filtros para la tabla `categorias_equipos`
--
ALTER TABLE `categorias_equipos`
  ADD CONSTRAINT `categorias_Equiposeibfk_1` FOREIGN KEY (`id_equ_catequ`) REFERENCES `equipos` (`id_equ`) ON DELETE CASCADE,
  ADD CONSTRAINT `categorias_Equiposeibfk_2` FOREIGN KEY (`id_cat_catequ`) REFERENCES `categorias` (`id_cat`) ON DELETE CASCADE;

--
-- Filtros para la tabla `integrantes`
--
ALTER TABLE `integrantes`
  ADD CONSTRAINT `Integrantes_ibfk_1` FOREIGN KEY (`id_equ_int`) REFERENCES `equipos` (`id_equ`) ON DELETE CASCADE;

--
-- Filtros para la tabla `patrocinantes_equipos`
--
ALTER TABLE `patrocinantes_equipos`
  ADD CONSTRAINT `patrocinantes_equipos_ibfk_1` FOREIGN KEY (`id_pat_patequ`) REFERENCES `patrocinantes` (`id_pat`) ON DELETE CASCADE,
  ADD CONSTRAINT `patrocinantes_equipos_ibfk_2` FOREIGN KEY (`id_equ_patequ`) REFERENCES `equipos` (`id_equ`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
