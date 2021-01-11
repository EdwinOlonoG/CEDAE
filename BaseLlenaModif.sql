/*
SQLyog Community v13.1.7 (64 bit)
MySQL - 10.4.17-MariaDB : Database - mydb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`mydb` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `mydb`;

/*Table structure for table `administrador` */

DROP TABLE IF EXISTS `administrador`;

CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL,
  `NomAdmin` varchar(45) DEFAULT NULL,
  `Usuarios_idUsuarios` int(11) NOT NULL,
  PRIMARY KEY (`idAdministrador`,`Usuarios_idUsuarios`),
  KEY `fk_Administrador_Usuarios1_idx` (`Usuarios_idUsuarios`),
  CONSTRAINT `fk_Administrador_Usuarios1` FOREIGN KEY (`Usuarios_idUsuarios`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `administrador` */

insert  into `administrador`(`idAdministrador`,`NomAdmin`,`Usuarios_idUsuarios`) values 
(1,'Edwin',1),
(2,'Vallejo',20);

/*Table structure for table `citas` */

DROP TABLE IF EXISTS `citas`;

CREATE TABLE `citas` (
  `idCitas` int(11) NOT NULL,
  `Hora` varchar(45) DEFAULT NULL,
  `Dia` varchar(45) DEFAULT NULL,
  `Lugar` varchar(45) DEFAULT NULL,
  `Doctor_idDoctor` int(11) NOT NULL,
  `Doctor_Usuarios_idUsuarios` int(11) NOT NULL,
  `Doctor_Clinica_idClinica` int(11) NOT NULL,
  `Doctor_Paciente_idPaciente` int(11) NOT NULL,
  `Doctor_Paciente_Usuarios_idUsuarios` int(11) NOT NULL,
  `Paciente_idPaciente` int(11) NOT NULL,
  `Paciente_Usuarios_idUsuarios` int(11) NOT NULL,
  PRIMARY KEY (`idCitas`,`Doctor_idDoctor`,`Doctor_Usuarios_idUsuarios`,`Doctor_Clinica_idClinica`,`Doctor_Paciente_idPaciente`,`Doctor_Paciente_Usuarios_idUsuarios`,`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`),
  KEY `fk_Citas_Doctor1_idx` (`Doctor_idDoctor`,`Doctor_Usuarios_idUsuarios`,`Doctor_Clinica_idClinica`,`Doctor_Paciente_idPaciente`,`Doctor_Paciente_Usuarios_idUsuarios`),
  KEY `fk_Citas_Paciente1_idx` (`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`),
  CONSTRAINT `fk_Citas_Doctor1` FOREIGN KEY (`Doctor_idDoctor`, `Doctor_Usuarios_idUsuarios`, `Doctor_Clinica_idClinica`, `Doctor_Paciente_idPaciente`, `Doctor_Paciente_Usuarios_idUsuarios`) REFERENCES `doctor` (`idDoctor`, `Usuarios_idUsuarios`, `Clinica_idClinica`, `Paciente_idPaciente`, `Paciente_Usuarios_idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Citas_Paciente1` FOREIGN KEY (`Paciente_idPaciente`, `Paciente_Usuarios_idUsuarios`) REFERENCES `paciente` (`idPaciente`, `Usuarios_idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `citas` */

insert  into `citas`(`idCitas`,`Hora`,`Dia`,`Lugar`,`Doctor_idDoctor`,`Doctor_Usuarios_idUsuarios`,`Doctor_Clinica_idClinica`,`Doctor_Paciente_idPaciente`,`Doctor_Paciente_Usuarios_idUsuarios`,`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`) values 
(1,'18:00','25/01/21','Loma Bonita',1,4,1,1,3,1,3),
(2,'18:30','30/01/21','Linda Vista',1,4,1,1,3,2,5);

/*Table structure for table `doctor` */

DROP TABLE IF EXISTS `doctor`;

CREATE TABLE `doctor` (
  `idDoctor` int(11) NOT NULL,
  `NomDoc` varchar(45) DEFAULT NULL,
  `ApellidoDoc` varchar(45) DEFAULT NULL,
  `EdadDoc` varchar(45) DEFAULT NULL,
  `TelDoc` int(10) DEFAULT NULL,
  `SexoDoc` varchar(45) DEFAULT NULL,
  `CedulaDoc` int(15) DEFAULT NULL,
  `Usuarios_idUsuarios` int(11) NOT NULL,
  `Clinica_idClinica` int(11) NOT NULL,
  `Paciente_idPaciente` int(11) NOT NULL,
  `Paciente_Usuarios_idUsuarios` int(11) NOT NULL,
  `Cargo` int(11) DEFAULT NULL,
  PRIMARY KEY (`idDoctor`,`Usuarios_idUsuarios`,`Clinica_idClinica`,`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`),
  KEY `fk_Doctor_Usuarios1_idx` (`Usuarios_idUsuarios`),
  KEY `fk_Doctor_Clinica1_idx` (`Clinica_idClinica`),
  KEY `fk_Doctor_Paciente1_idx` (`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`),
  CONSTRAINT `fk_Doctor_Clinica1` FOREIGN KEY (`Clinica_idClinica`) REFERENCES `sucursal` (`idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Doctor_Paciente1` FOREIGN KEY (`Paciente_idPaciente`, `Paciente_Usuarios_idUsuarios`) REFERENCES `paciente` (`idPaciente`, `Usuarios_idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Doctor_Usuarios1` FOREIGN KEY (`Usuarios_idUsuarios`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `doctor` */

insert  into `doctor`(`idDoctor`,`NomDoc`,`ApellidoDoc`,`EdadDoc`,`TelDoc`,`SexoDoc`,`CedulaDoc`,`Usuarios_idUsuarios`,`Clinica_idClinica`,`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`,`Cargo`) values 
(1,'Pancho','Santos','44',2147483647,'M',2147483647,4,1,1,3,1),
(2,'Elizande','Gomez','52',2147483647,'F',2147483647,8,2,2,5,1),
(3,'Electra','Mendez','51',1919581919,'F',2147483647,9,1,3,6,1),
(4,'Victor','Arreola','47',2147483647,'M',2147483647,10,2,5,11,1),
(5,'Ester','Patron','60',2147483647,'F',2147483647,15,1,4,7,2),
(6,'Isaac','Vega','58',51981981,'M',2147483647,16,1,6,14,1),
(6,'Isaac','Vega','58',51981981,'M',2147483647,16,1,7,13,1),
(6,'Isaac','Vega','58',51981981,'M',214783647,17,1,9,21,1);

/*Table structure for table `expedientes` */

DROP TABLE IF EXISTS `expedientes`;

CREATE TABLE `expedientes` (
  `idExpedientes` int(11) NOT NULL,
  `Paciente_idPaciente` int(11) NOT NULL,
  `Paciente_Usuarios_idUsuarios` int(11) NOT NULL,
  `NSS` int(10) DEFAULT NULL,
  `FechaNa` varchar(45) DEFAULT NULL,
  `Domicilio` varchar(45) DEFAULT NULL,
  `Nacionalidad` varchar(45) DEFAULT NULL,
  `FichaID` varchar(45) NOT NULL,
  `AntecedentesF` varchar(80) DEFAULT NULL,
  `AntecedentesP` varchar(80) DEFAULT NULL,
  `Exploracion` varchar(45) DEFAULT NULL,
  `Pulso` varchar(45) DEFAULT NULL,
  `Temperatura` varchar(45) DEFAULT NULL,
  `EstadoF` varchar(45) DEFAULT NULL,
  `ResultadosLab` varchar(45) DEFAULT NULL,
  `Pronostico` varchar(45) DEFAULT NULL,
  `SignosVit` varchar(45) DEFAULT NULL,
  `Resultados` varchar(45) DEFAULT NULL,
  `Diagnositco` varchar(45) DEFAULT NULL,
  `PronosticoEv` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idExpedientes`,`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`,`FichaID`),
  KEY `fk_Expedientes_Paciente1_idx` (`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`),
  CONSTRAINT `fk_Expedientes_Paciente1` FOREIGN KEY (`Paciente_idPaciente`, `Paciente_Usuarios_idUsuarios`) REFERENCES `paciente` (`idPaciente`, `Usuarios_idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `expedientes` */

insert  into `expedientes`(`idExpedientes`,`Paciente_idPaciente`,`Paciente_Usuarios_idUsuarios`,`NSS`,`FechaNa`,`Domicilio`,`Nacionalidad`,`FichaID`,`AntecedentesF`,`AntecedentesP`,`Exploracion`,`Pulso`,`Temperatura`,`EstadoF`,`ResultadosLab`,`Pronostico`,`SignosVit`,`Resultados`,`Diagnositco`,`PronosticoEv`) values 
(1,1,3,151651651,'19/06/97','Mexico CDMX','Mexicano','1','nkdnsa kj naskdn askjdn askjdn ','das dsaasdasdasdasdsadasd','dasdasdsadsad','1851981 ','282','as dasdasdasdasd','asdasdsadasdasd','sadasdasdasd aasda','asdasdsad  as da',' asdas  asdas ',' asdasd asd as d',' asdasdasd asd asda'),
(1,1,3,151651651,'19/06/97','Mexico CDMX','Mexicano','2','asdasd as da sd as d','a sd as da d as d','a sd as da s','asd as ','a sd as d','a sd as d','a sd as d','a sd as ','a sd asd ','a sd as d sa','a sd as d','as d asd '),
(2,2,5,291981981,'20/06/78','Guadajara','Mexicano','1','dfsdfsd','sdfsdf','sdfsdf','sdfsd','sdfsdf','sdfsdf','sdfsdf','sdfsdfsd','sdfsdfsdf','sdfsdfsdf','sdfsdfds','sdfsdfsdf'),
(2,2,5,291981981,'20/06/78','Guadalajara','Mexicano','2','asdasdasd','asdasdsada','asdasdas','asdasdsa','dasdas','asdasdasd','asdasdasd','asdasdasd','asdasdasdsa','asdasdasdasd','asdasdasdsa','asdasdasd'),
(3,3,6,2147483647,'20/16/78','Estado de Mexico','Mexicano','1','asdas da sd as d as ','as da sd a ','as das d ','da sd as d','a sd as ','a sd as d','da sd asd ','a sd as d','a sd asd ','as d asd as ','asd as d asd ','as d as d as '),
(4,6,14,2147483647,'20/12/59','Puebla','Mexicano','1','11asd651as5 ','iiunu iuh','iu ','uihiu','iuhiuiu','iuiubiub','iubiubui','iubiubiub','iuiubiub','iubiubuib','ibiubibiu','ibiubiubiu'),
(5,5,11,2147483647,'20/12/99','Ecatepec','Mexicano','1','asdas das d','b','b','iub','ib','iub','i','bu','ib','iubuib','i','biu');

/*Table structure for table `farmacia` */

DROP TABLE IF EXISTS `farmacia`;

CREATE TABLE `farmacia` (
  `idFarmacia` int(11) NOT NULL,
  `TelFarm` varchar(45) DEFAULT NULL,
  `CorreoFarm` varchar(45) DEFAULT NULL,
  `Sucursal_idSucursal` int(11) NOT NULL,
  PRIMARY KEY (`idFarmacia`,`Sucursal_idSucursal`),
  KEY `fk_Farmacia_Sucursal1_idx` (`Sucursal_idSucursal`),
  CONSTRAINT `fk_Farmacia_Sucursal1` FOREIGN KEY (`Sucursal_idSucursal`) REFERENCES `sucursal` (`idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `farmacia` */

insert  into `farmacia`(`idFarmacia`,`TelFarm`,`CorreoFarm`,`Sucursal_idSucursal`) values 
(1,'558181618819','@mail.com',1),
(2,'55819198198','@mail.com',2);

/*Table structure for table `paciente` */

DROP TABLE IF EXISTS `paciente`;

CREATE TABLE `paciente` (
  `idPaciente` int(11) NOT NULL,
  `NomPac` varchar(45) DEFAULT NULL,
  `TelPac` int(10) DEFAULT NULL,
  `EdadPac` int(3) DEFAULT NULL,
  `CorreoPac` varchar(45) DEFAULT NULL,
  `SexoPac` varchar(45) DEFAULT NULL,
  `Usuarios_idUsuarios` int(11) NOT NULL,
  PRIMARY KEY (`idPaciente`,`Usuarios_idUsuarios`),
  KEY `fk_Paciente_Usuarios1_idx` (`Usuarios_idUsuarios`),
  CONSTRAINT `fk_Paciente_Usuarios1` FOREIGN KEY (`Usuarios_idUsuarios`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `paciente` */

insert  into `paciente`(`idPaciente`,`NomPac`,`TelPac`,`EdadPac`,`CorreoPac`,`SexoPac`,`Usuarios_idUsuarios`) values 
(1,'Manolo',2147483647,21,'@gmail.com','M',3),
(2,'Sandra',561651516,23,'@yahoo.com','F',5),
(3,'Ericka',81919198,18,'@mail.com','F',6),
(4,'Antonio',1819816516,20,'@mail.com','M',7),
(5,'Alexandra',2147483647,22,'@mail.com','F',11),
(6,'Mariano',15165165,29,'@mail.com','M',14),
(7,'Panfilo',2147483647,48,'@mail.com','M',13),
(8,'Alejandro',999999999,58,'@mail.com','M',12),
(9,'Libertad',45189198,99,'@.com','F',21);

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `idProductos` int(11) NOT NULL,
  `NomProd` varchar(45) DEFAULT NULL,
  `CadProd` varchar(45) NOT NULL,
  `PrecioProd` varchar(45) DEFAULT NULL,
  `ExistenciaProd` varchar(45) DEFAULT NULL,
  `Farmacia_idFarmacia` int(11) NOT NULL,
  `Farmacia_Sucursal_idSucursal` int(11) NOT NULL,
  PRIMARY KEY (`idProductos`,`CadProd`,`Farmacia_idFarmacia`,`Farmacia_Sucursal_idSucursal`),
  KEY `fk_Productos_Farmacia1_idx` (`Farmacia_idFarmacia`,`Farmacia_Sucursal_idSucursal`),
  CONSTRAINT `fk_Productos_Farmacia1` FOREIGN KEY (`Farmacia_idFarmacia`, `Farmacia_Sucursal_idSucursal`) REFERENCES `farmacia` (`idFarmacia`, `Sucursal_idSucursal`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `productos` */

insert  into `productos`(`idProductos`,`NomProd`,`CadProd`,`PrecioProd`,`ExistenciaProd`,`Farmacia_idFarmacia`,`Farmacia_Sucursal_idSucursal`) values 
(1,'Paracetamol','20/1','123','5',1,1),
(1,'Paracetamol','20/1','123','5',2,2),
(1,'Paracetamol','30/2','123','10',1,1);

/*Table structure for table `recepcionista` */

DROP TABLE IF EXISTS `recepcionista`;

CREATE TABLE `recepcionista` (
  `idRecepcionista` int(11) NOT NULL,
  `NomRecep` varchar(45) DEFAULT NULL,
  `TelRecep` int(10) DEFAULT NULL,
  `CorreoRecep` varchar(45) DEFAULT NULL,
  `SexoRecep` varchar(45) DEFAULT NULL,
  `Usuarios_idUsuarios` int(11) NOT NULL,
  PRIMARY KEY (`idRecepcionista`,`Usuarios_idUsuarios`),
  KEY `fk_Recepcionista_Usuarios1_idx` (`Usuarios_idUsuarios`),
  CONSTRAINT `fk_Recepcionista_Usuarios1` FOREIGN KEY (`Usuarios_idUsuarios`) REFERENCES `usuarios` (`idUsuarios`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `recepcionista` */

insert  into `recepcionista`(`idRecepcionista`,`NomRecep`,`TelRecep`,`CorreoRecep`,`SexoRecep`,`Usuarios_idUsuarios`) values 
(1,'Paquita',2147483647,'asereje@hotmail.com','F',2),
(2,'Panfila',1516516515,'@yahoo.com','F',18);

/*Table structure for table `receta` */

DROP TABLE IF EXISTS `receta`;

CREATE TABLE `receta` (
  `idPaciente` int(11) NOT NULL,
  `idDoctor` int(11) NOT NULL,
  `Medicamento` varchar(45) DEFAULT NULL,
  `Dosis` varchar(45) DEFAULT NULL,
  `Indicaciones` varchar(45) DEFAULT NULL,
  KEY `idPaciente` (`idPaciente`),
  KEY `idDoctor` (`idDoctor`),
  CONSTRAINT `receta_ibfk_1` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`idPaciente`),
  CONSTRAINT `receta_ibfk_2` FOREIGN KEY (`idDoctor`) REFERENCES `doctor` (`idDoctor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `receta` */

insert  into `receta`(`idPaciente`,`idDoctor`,`Medicamento`,`Dosis`,`Indicaciones`) values 
(1,1,'Paracetamol','2 MG','Cada dia una dosis'),
(1,1,'Viagra','3 MG','Cada que se necesite'),
(2,1,'Aspirina','2 MG','Cada que se necesite'),
(1,1,'paracetamor','lala','nohagasnada'),
(1,1,'paracetamor','lala','nohagasnada'),
(1,1,'paracetamor','lala','nohagasnada'),
(1,1,'a dasd as',' asdasd','asdasd'),
(1,1,'Matate','Una vez','Cuando ya no aguantes'),
(1,1,'Vamo a Morir','1 vez en la vida','Cuando ya no lo soportes hazlo'),
(1,1,'Amor','Una vez con pareja','Ligate a alguien'),
(1,1,'Paracetamol','1 mg','Cada 6 hrs'),
(1,1,'Chocolate','3 mg','Cada dia'),
(1,1,'Dormir','1 dia','Cada dia cuando estes tranq'),
(1,1,'Dormir','1 dia','Cada dia cuando estes tranq');

/*Table structure for table `sucursal` */

DROP TABLE IF EXISTS `sucursal`;

CREATE TABLE `sucursal` (
  `idSucursal` int(11) NOT NULL,
  `UbicacionSuc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idSucursal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `sucursal` */

insert  into `sucursal`(`idSucursal`,`UbicacionSuc`) values 
(1,'Loma Bonita'),
(2,'Linda Vista');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `idUsuarios` int(11) NOT NULL,
  `Usuario` varchar(45) DEFAULT NULL,
  `Contrasena` varchar(45) DEFAULT NULL,
  `TUsuario` int(11) DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `usuarios` */

insert  into `usuarios`(`idUsuarios`,`Usuario`,`Contrasena`,`TUsuario`) values 
(1,'Administrador','123456789',1),
(2,'Recepcionista','1234',2),
(3,'Paciente','19819819sdasd',3),
(4,'Doctor','dasdas1d56a1sd',4),
(5,'Paciente','151651616115',3),
(6,'Paciente','1981981981981',3),
(7,'Paciente Externo','18919871981',3),
(8,'Doctor','198191981',4),
(9,'Doctor','asdadewqw',4),
(10,'Doctor','asdasdas',4),
(11,'Paciente','59198198',3),
(12,'Paciente','16516516',3),
(13,'Paciente','asdas891da9',3),
(14,'Paciente','asdasda56s1d65',3),
(15,'Doctor','asdasd5as1d54',4),
(16,'Doctor','asdasdd19209d',4),
(17,'Doctor','1as98d1a51da6',4),
(18,'Recepcionista','1918919819819',2),
(20,'Administrador','19as198a1a98198',1),
(21,'Paciente','asdasdasdasd',3);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
