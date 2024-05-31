CREATE TABLE `usuario` (
  `nome_usuario` varchar(20) NOT NULL,
  `senha` varchar(256) NOT NULL,
  `nome` varchar(60) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`nome_usuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `fluxo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(32) DEFAULT NULL,
  `nodes` json NOT NULL,
  `edges` json NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `departamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(60) NOT NULL,
  `cor` varchar(7) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `atribuicao` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `departamento` int NOT NULL,
  `cargo` varchar(100) DEFAULT NULL,
  `unidade` int NOT NULL,
  `jornada` varchar(20) DEFAULT NULL,
  `horario` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`numero`),
  KEY `departamento` (`departamento`),
  CONSTRAINT `atribuicao_ibfk_3` FOREIGN KEY (`departamento`) REFERENCES `departamento` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `subordinacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `subordinado` int NOT NULL,
  `superior` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `subordinado` (`subordinado`),
  KEY `superior` (`superior`),
  CONSTRAINT `subordinacao_ibfk_1` FOREIGN KEY (`subordinado`) REFERENCES `atribuicao` (`numero`),
  CONSTRAINT `subordinacao_ibfk_2` FOREIGN KEY (`superior`) REFERENCES `atribuicao` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `atividade` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `atribuicao` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `atribuicao` (`atribuicao`),
  CONSTRAINT `atividade_ibfk_1` FOREIGN KEY (`atribuicao`) REFERENCES `atribuicao` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=456 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `expectativa` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `atribuicao` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `atribuicao` (`atribuicao`),
  CONSTRAINT `expectativa_ibfk_1` FOREIGN KEY (`atribuicao`) REFERENCES `atribuicao` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pop` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `departamento` int NOT NULL,
  `estabelecido` date NOT NULL,
  `revisado` date NOT NULL,
  `numRevisao` int DEFAULT NULL,
  `atividade` int DEFAULT NULL,
  `responsavel` int DEFAULT NULL,
  PRIMARY KEY (`numero`),
  KEY `departamento` (`departamento`),
  KEY `atividade` (`atividade`),
  KEY `pop_ibfk_3_idx` (`responsavel`),
  CONSTRAINT `pop_ibfk_1` FOREIGN KEY (`departamento`) REFERENCES `departamento` (`id`),
  CONSTRAINT `pop_ibfk_2` FOREIGN KEY (`atividade`) REFERENCES `atividade` (`numero`),
  CONSTRAINT `pop_ibfk_3` FOREIGN KEY (`responsavel`) REFERENCES `atribuicao` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=166 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `acaocorretiva` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `pop` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `pop` (`pop`),
  CONSTRAINT `acaocorretiva_ibfk_1` FOREIGN KEY (`pop`) REFERENCES `pop` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `habilidade` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `pop` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `pop` (`pop`),
  CONSTRAINT `habilidade_ibfk_1` FOREIGN KEY (`pop`) REFERENCES `pop` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=353 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `manuseio` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `pop` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `pop` (`pop`),
  CONSTRAINT `manuseio_ibfk_1` FOREIGN KEY (`pop`) REFERENCES `pop` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=578 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `material` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `pop` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `pop` (`pop`),
  CONSTRAINT `material_ibfk_1` FOREIGN KEY (`pop`) REFERENCES `pop` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=718 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `pontocritico` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `pop` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `pop` (`pop`),
  CONSTRAINT `pontocritico_ibfk_1` FOREIGN KEY (`pop`) REFERENCES `pop` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=1354 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `resultado` (
  `numero` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(256) NOT NULL,
  `ordem` int DEFAULT NULL,
  `pop` int NOT NULL,
  PRIMARY KEY (`numero`),
  KEY `pop` (`pop`),
  CONSTRAINT `resultado_ibfk_1` FOREIGN KEY (`pop`) REFERENCES `pop` (`numero`)
) ENGINE=InnoDB AUTO_INCREMENT=291 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
