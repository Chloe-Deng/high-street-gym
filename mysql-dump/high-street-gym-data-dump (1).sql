-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: high-street-gym
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `class_id` int unsigned DEFAULT NULL,
  `user_id` int unsigned DEFAULT NULL,
  `location_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_location` (`location_id`),
  KEY `fk_user` (`user_id`),
  KEY `fk_class` (`class_id`),
  CONSTRAINT `fk_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,NULL,2,7,2),(4,NULL,4,9,4),(5,'2024-04-08 14:00:00',1,10,1),(9,'2024-04-07 07:23:36',1,10,1),(10,'2024-04-07 07:28:32',1,10,1),(11,'2024-04-07 07:30:45',1,10,1),(12,'2024-04-07 07:31:01',1,10,1),(13,'2024-04-07 07:38:56',1,10,1),(14,'2024-04-07 09:07:09',1,11,1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `class_name` varchar(100) NOT NULL,
  `datetime` date NOT NULL,
  `start_at` time NOT NULL,
  `duration` int NOT NULL,
  `description` text NOT NULL,
  `location_id` int unsigned DEFAULT NULL,
  `trainer_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_trainer_id` (`trainer_id`),
  KEY `fk_location_id` (`location_id`),
  CONSTRAINT `fk_location_id` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `fk_trainer_id` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (1,'Yoga','2024-04-07','08:00:00',60,'A good exercise',1,1),(2,'HIIT Training','2024-04-08','10:00:00',60,'An amazing workout',1,4),(3,'Dancing','2024-04-09','10:00:00',60,'Keep good body shape',2,5),(4,'HIIT Training','2024-04-09','09:00:00',60,'An amazing workout',2,5),(5,'Running','2024-04-10','09:00:00',60,'good',3,5),(6,'Swimming','2024-04-11','09:00:00',60,'good',4,6),(7,'Swimming','2024-04-11','09:00:00',60,'good',1,1),(8,'Yoga','2024-04-07','08:00:00',60,'A good exercise',2,4);
/*!40000 ALTER TABLE `classes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locations`
--

DROP TABLE IF EXISTS `locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `location_name` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locations`
--

LOCK TABLES `locations` WRITE;
/*!40000 ALTER TABLE `locations` DISABLE KEYS */;
INSERT INTO `locations` VALUES (1,'South bank'),(2,'Sandgate'),(3,'Gold Coast'),(4,'Redcliff');
/*!40000 ALTER TABLE `locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `post_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `post_title` varchar(100) NOT NULL,
  `post_content` text NOT NULL,
  `post_user_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_user_id` (`post_user_id`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`post_user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'2024-04-01 14:00:00','5 Keys to Unlocking Your Workout Potential','Unlock your fitness potential with these five essential workout principles. From setting achievable goals to mixing up your routines, discover how to boost your workouts for maximum results. Learn the importance of proper nutrition, the benefits of consistent training, and the power of rest and recovery. Join us as we delve into each principle and provide practical tips to transform your fitness journey into a powerhouse of progress.',1),(2,'2024-04-04 14:00:00','ransforming Your Mindset for Fitness Success','The path to fitness is as much mental as it is physical. In this article, we explore the power of a positive mindset in overcoming obstacles and achieving your health goals. Discover strategies for staying motivated, the importance of setting intentions, and how to cultivate a fitness mindset that embraces challenge. Transform your thoughts and you transform your body.',4),(3,NULL,'ransforming Your Mindset for Fitness Success','The path to fitness is as much mental as it is physical. In this article, we explore the power of a positive mindset in overcoming obstacles and achieving your health goals. Discover strategies for staying motivated, the importance of setting intentions, and how to cultivate a fitness mindset that embraces challenge. Transform your thoughts and you transform your body.',4),(4,'2024-04-07 06:23:27','ransforming Your Mindset for Fitness Success','The path to fitness is as much mental as it is physical. In this article, we explore the power of a positive mindset in overcoming obstacles and achieving your health goals. Discover strategies for staying motivated, the importance of setting intentions, and how to cultivate a fitness mindset that embraces challenge. Transform your thoughts and you transform your body.',4),(5,'2024-04-07 06:28:14','Finding Balance: Yoga for Strength and Flexibility','Yoga isn\'t just about relaxation; it\'s a potent tool for enhancing physical strength and flexibility. This article introduces you to yoga poses that complement your strength training by promoting muscle recovery and flexibility. Embrace the balance with yoga sequences that support your gym workouts and discover a harmonious approach to your overall fitness and wellbeing.\n\n',10),(6,'2024-04-07 06:32:16','Fueling for Fitness: What to Eat Pre and Post Workout','Fueling your body correctly is essential for optimal performance in the gym and speedy recovery afterward. Learn what foods to eat before hitting the gym to maximize energy levels and what to consume post-workout to ensure effective muscle recovery. From complex carbohydrates to high-quality proteins, this blog post will guide you through the best nutrition practices for your fitness routine.',2),(7,'2024-04-07 06:34:20','The Ultimate Guide to Bodyweight Training','Bodyweight training offers a convenient, no-equipment-needed way to sculpt and strengthen your body. This ultimate guide covers exercises that target every major muscle group, suitable for beginners to advanced fitness enthusiasts. Explore the versatility of push-ups, the challenge of planks, and the intensity of squats. Incorporate these movements into your daily routine and experience the empowerment of mastering your own body.',8);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(100) NOT NULL,
  `role` varchar(45) NOT NULL,
  `first_name` varchar(60) NOT NULL,
  `last_name` varchar(60) NOT NULL,
  `authentication_key` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `authentication_key` (`authentication_key`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'trainer@email.com','pass1234','trainer','Jack','user',NULL),(2,'member@email.com','pass1234','member','Amy','user',NULL),(3,'admin@email.com','pass1234','admin','David','user',NULL),(4,'trainer2@email.com','pass1234','trainer','Josh','user',NULL),(5,'trainer3@email.com','pass1234','trainer','Austin','user',NULL),(6,'trainer4@email.com','pass1234','trainer','Jimmy','user',NULL),(7,'member2@email.com','pass1234','member','Anna','user',NULL),(8,'member3@email.com','pass1234','member','Rachel','user',NULL),(9,'member4@email.com','pass1234','member','Monica','user',NULL),(10,'admin2@email.com','$2a$10$RDKO3DpmSpNvZHYdsPPme.9N6bIsIWwh7fWRHd3POqWsYZJYa6VGy','admin','Chloe','user','40d2f165-d6a0-4509-b106-fcc3e0c08ada'),(11,'member52@email.com','$2a$10$t8nN7clnCDURk3xWN5IFtOtFNQqbNVFvCbIsN9D5hoRqySMMHYuxK','member','Chloe','user',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-07 21:08:59
