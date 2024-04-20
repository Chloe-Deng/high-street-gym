-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: high-street-gym-3
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
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activities` (
  `activity_id` int unsigned NOT NULL AUTO_INCREMENT,
  `activity_name` varchar(100) NOT NULL,
  `activity_description` text,
  `activity_duration` int NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,'Yoga',' A holistic practice combining physical postures, breathing exercises',60),(2,'Pilates','A mind-body exercise that targets the core',60),(3,'HIIT','High Intensity Interval Training for burning fat',30),(4,'Indoor cycling','Stationary cycling class for endurance',45),(5,'Boxing','Combative sport class focusing on punching and dodging',60),(6,'Zumba','Dance fitness class with Latin American dance moves',45);
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (41,'2024-04-19 00:56:40',4,21,NULL);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_locations`
--

DROP TABLE IF EXISTS `class_locations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_locations` (
  `class_id` int unsigned NOT NULL,
  `location_id` int unsigned NOT NULL,
  PRIMARY KEY (`class_id`,`location_id`),
  KEY `location_id` (`location_id`),
  CONSTRAINT `class_locations_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `class_locations_ibfk_2` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_locations`
--

LOCK TABLES `class_locations` WRITE;
/*!40000 ALTER TABLE `class_locations` DISABLE KEYS */;
INSERT INTO `class_locations` VALUES (4,2),(4,3);
/*!40000 ALTER TABLE `class_locations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `class_trainers`
--

DROP TABLE IF EXISTS `class_trainers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_trainers` (
  `class_id` int unsigned NOT NULL,
  `trainer_id` int unsigned NOT NULL,
  PRIMARY KEY (`class_id`,`trainer_id`),
  KEY `trainer_id` (`trainer_id`),
  CONSTRAINT `class_trainers_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `class_trainers_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_trainers`
--

LOCK TABLES `class_trainers` WRITE;
/*!40000 ALTER TABLE `class_trainers` DISABLE KEYS */;
INSERT INTO `class_trainers` VALUES (4,1),(4,4);
/*!40000 ALTER TABLE `class_trainers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classes`
--

DROP TABLE IF EXISTS `classes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classes` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `datetime` date NOT NULL,
  `start_at` time NOT NULL,
  `activity_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_activity` (`activity_id`),
  CONSTRAINT `fk_activity` FOREIGN KEY (`activity_id`) REFERENCES `activities` (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (4,'2024-04-09','09:00:00',3),(5,'2024-04-10','09:00:00',4),(6,'2024-04-11','09:00:00',5),(7,'2024-04-11','09:00:00',6),(8,'2024-04-07','08:00:00',2),(9,'2024-04-09','08:00:00',1),(13,'2024-04-09','08:00:00',1),(14,'2024-04-15','08:00:00',1),(18,'2024-04-18','08:00:00',1),(19,'2024-04-18','08:00:00',1),(20,'2024-04-19','08:00:00',1),(21,'2024-04-18','08:00:00',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'2024-04-01 14:00:00','5 Keys to Unlocking Your Workout Potential','Unlock your fitness potential with these five essential workout principles. From setting achievable goals to mixing up your routines, discover how to boost your workouts for maximum results. Learn the importance of proper nutrition, the benefits of consistent training, and the power of rest and recovery. Join us as we delve into each principle and provide practical tips to transform your fitness journey into a powerhouse of progress.',1),(5,'2024-04-07 06:28:14','Finding Balance: Yoga for Strength and Flexibility','Yoga isn\'t just about relaxation; it\'s a potent tool for enhancing physical strength and flexibility. This article introduces you to yoga poses that complement your strength training by promoting muscle recovery and flexibility. Embrace the balance with yoga sequences that support your gym workouts and discover a harmonious approach to your overall fitness and wellbeing.\n\n',10),(6,'2024-04-07 06:32:16','Fueling for Fitness: What to Eat Pre and Post Workout','Fueling your body correctly is essential for optimal performance in the gym and speedy recovery afterward. Learn what foods to eat before hitting the gym to maximize energy levels and what to consume post-workout to ensure effective muscle recovery. From complex carbohydrates to high-quality proteins, this blog post will guide you through the best nutrition practices for your fitness routine.',21),(7,'2024-04-07 06:34:20','The Ultimate Guide to Bodyweight Training','Bodyweight training offers a convenient, no-equipment-needed way to sculpt and strengthen your body. This ultimate guide covers exercises that target every major muscle group, suitable for beginners to advanced fitness enthusiasts. Explore the versatility of push-ups, the challenge of planks, and the intensity of squats. Incorporate these movements into your daily routine and experience the empowerment of mastering your own body.',20),(12,'2024-04-09 11:23:57','Mastering the Mind-Muscle Connection for Growth','Explore the mental aspect of training with our in-depth guide on the mind-muscle connection. Learn techniques to enhance your focus during workouts, which can lead to more effective muscle engagement and growth. We\'ll share tips on visualization, proper form, and mental cues that can transform an ordinary workout into an extraordinary session.',4),(13,'2024-04-09 11:28:45','Breaking Through Plateaus: Advanced Strategies for Continued Progress','Hit a wall in your fitness journey? Learn advanced strategies to overcome plateaus and keep making gains. We\'ll discuss the importance of periodization, workout variety, and intensity modulation. Plus, find out when it\'s time to seek expert advice to revamp your fitness plan for sustained growth.',10),(15,'2024-04-11 06:27:02','The Impact of Hydration on Performance','Dive into the science of hydration and its critical role in fitness performance. Understand how staying adequately hydrated can improve endurance, strength, and recovery. We\'ll break down the signs of dehydration, the best ways to hydrate, and how to balance electrolytes for optimal workout results.',10),(17,'2024-04-12 11:19:56','Transforming Your Mindset for Fitness Success','The path to fitness is as much mental as it is physical. In this article, we explore the power of a positive mindset in overcoming obstacles and achieving your health goals. Discover strategies for staying motivated, the importance of setting intentions, and how to cultivate a fitness mindset that embraces challenge. Transform your thoughts and you transform your body.\n\n',20);
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
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'trainer@email.com','$2a$10$FPoUvfIwvdfe9vEcEeNF2OtXRYdVSbjsjB9JUXcsEclaZ6gbXslKe','trainer','Jack','User',NULL),(4,'trainer2@email.com','$2a$10$sD1232n12wMQM3MLeXVrY.xAcQ0v6EKquM0ZZc.D4fbsBLb75htly','trainer','Josh','User',NULL),(10,'admin2@email.com','$2a$10$FJwm99ufY3lS32gT124HhuPa2ZdxWAkRy2t9WzHabkLgeLa438Xbm','admin','Chloe','Deng','8674966f-dbc5-4717-9133-988d19c78701'),(14,'member5@email.com','$2a$10$0NRsmkNyCnVNDb7Lh4G36.baqx.fhu2sTlLyPpCjzc0jxNVPnwuW2','member','Jonas','User',NULL),(17,'angela@email.com','$2a$10$lbwGZizQChR6de7K47xXxOE1duA9FzmRBA3L5KJkNFYqhNjQm0GLG','member','Angela','Yu',NULL),(20,'membermonica@email.com','$2a$10$WgUS.U8dnPyzig/vI5JSIuPRs/rKn7heaogkm7Z7A81iOTbiPBPza','member','Monica','User',NULL),(21,'member4@email.com','$2a$10$0vGszj1rZQDO5sWsPDDN9uPn1/sozI5Ico4hl1/BWZyUD0qumtr5e','member','Rachel','User',NULL),(22,'member@email.com','$2a$10$Q/Gp1OSh.Gn.G4hGv9QDUetwrXyiOaJEScSaEuUgUYSeUHDu5ZHcu','member','Amy','user',NULL),(23,'trainer9@email.com','$2a$10$11G54vh42EAXh1e4eQCGjuUe5tivu0wMALW86IQQqeEKLpZ1AEuIm','trainer','September','user',NULL),(31,'john.doe2@example.com','$2a$10$1/gofUZnx4IiZyqMv.P4U.w1Av2q63TGUmLaoAQlHRvrMAOQwWOXO','admin','John','Doe',NULL),(32,'john.doe@example.com','$2a$10$M8gK.MRYmx08F4G4RKKcKe40cDRtTmQHgz.eJXpWs7U6pZv20A6DC','trainer','John','Doe',NULL);
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

-- Dump completed on 2024-04-19 12:54:19
