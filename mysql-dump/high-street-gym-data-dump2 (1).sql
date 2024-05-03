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
INSERT INTO `activities` VALUES (1,'Yoga','A holistic practice combining physical postures, breathing exercises, and meditation to enhance overall well-being.',60),(2,'Pilates','A mind-body exercise that targets the core',60),(3,'HIIT','High Intensity Interval Training for burning fat',30),(4,'Indoor cycling','Stationary cycling class for endurance',45),(5,'Boxing','Combative sport class focusing on punching and dodging',60),(6,'Zumba','Dance fitness class with Latin American dance moves',45);
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
  `trainer_id` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `fk_location` (`location_id`),
  KEY `fk_user` (`user_id`),
  KEY `fk_class` (`class_id`),
  KEY `fk_trainer` (`trainer_id`),
  CONSTRAINT `fk_class` FOREIGN KEY (`class_id`) REFERENCES `classes` (`id`),
  CONSTRAINT `fk_location` FOREIGN KEY (`location_id`) REFERENCES `locations` (`id`),
  CONSTRAINT `fk_trainer` FOREIGN KEY (`trainer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=80 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (41,'2024-04-19 00:56:40',4,21,NULL,NULL),(78,'2024-04-20 08:25:30',4,17,3,42),(79,'2024-04-20 08:25:58',51,17,1,55);
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
INSERT INTO `class_locations` VALUES (5,1),(51,1),(52,1),(53,1),(54,1),(55,1),(56,1),(4,2),(5,2),(4,3),(51,3),(52,3),(53,3),(54,3),(55,3),(56,3),(5,4);
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
INSERT INTO `class_trainers` VALUES (4,42),(5,42),(51,42),(52,42),(54,42),(55,42),(56,42),(51,53),(54,53),(55,53),(56,53),(4,54),(52,54),(5,55),(51,55);
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
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classes`
--

LOCK TABLES `classes` WRITE;
/*!40000 ALTER TABLE `classes` DISABLE KEYS */;
INSERT INTO `classes` VALUES (4,'2024-04-24','09:00:00',3),(5,'2024-04-24','09:00:00',4),(6,'2024-04-25','09:00:00',5),(8,'2024-04-26','08:00:00',2),(9,'2024-04-27','08:00:00',6),(14,'2024-04-28','08:00:00',4),(20,'2024-04-29','08:00:00',1),(51,'2024-04-30','08:00:00',1),(52,'2024-04-30','08:00:00',1),(53,'2024-04-30','08:00:00',1),(54,'2024-04-30','08:00:00',1),(55,'2024-04-30','08:00:00',1),(56,'2024-05-01','08:00:00',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (5,'2024-04-07 06:28:14','Finding Balance: Yoga for Strength and Flexibility','Yoga isn\'t just about relaxation; it\'s a potent tool for enhancing physical strength and flexibility. This article introduces you to yoga poses that complement your strength training by promoting muscle recovery and flexibility. Embrace the balance with yoga sequences that support your gym workouts and discover a harmonious approach to your overall fitness and wellbeing.\n\n',17),(6,'2024-04-07 06:32:16','Fueling for Fitness: What to Eat Pre and Post Workout','Fueling your body correctly is essential for optimal performance in the gym and speedy recovery afterward. Learn what foods to eat before hitting the gym to maximize energy levels and what to consume post-workout to ensure effective muscle recovery. From complex carbohydrates to high-quality proteins, this blog post will guide you through the best nutrition practices for your fitness routine.',21),(7,'2024-04-07 06:34:20','The Ultimate Guide to Bodyweight Training','Bodyweight training offers a convenient, no-equipment-needed way to sculpt and strengthen your body. This ultimate guide covers exercises that target every major muscle group, suitable for beginners to advanced fitness enthusiasts. Explore the versatility of push-ups, the challenge of planks, and the intensity of squats. Incorporate these movements into your daily routine and experience the empowerment of mastering your own body.',20),(13,'2024-04-09 11:28:45','Breaking Through Plateaus: Advanced Strategies for Continued Progress','Hit a wall in your fitness journey? Learn advanced strategies to overcome plateaus and keep making gains. We\'ll discuss the importance of periodization, workout variety, and intensity modulation. Plus, find out when it\'s time to seek expert advice to revamp your fitness plan for sustained growth.',17),(15,'2024-04-11 06:27:02','The Impact of Hydration on Performance','Dive into the science of hydration and its critical role in fitness performance. Understand how staying adequately hydrated can improve endurance, strength, and recovery. We\'ll break down the signs of dehydration, the best ways to hydrate, and how to balance electrolytes for optimal workout results.',17),(17,'2024-04-12 11:19:56','Transforming Your Mindset for Fitness Success','The path to fitness is as much mental as it is physical. In this article, we explore the power of a positive mindset in overcoming obstacles and achieving your health goals. Discover strategies for staying motivated, the importance of setting intentions, and how to cultivate a fitness mindset that embraces challenge. Transform your thoughts and you transform your body.\n\n',20),(23,'2024-04-19 08:47:37','5 Keys to Unlocking Your Workout Potential','Unlock your fitness potential with these five essential workout principles. From setting achievable goals to mixing up your routines, discover how to boost your workouts for maximum results. Learn the importance of proper nutrition, the benefits of consistent training, and the power of rest and recovery. Join us as we delve into each principle and provide practical tips to transform your fitness journey into a powerhouse of progress.',17);
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
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'member5@email.com','$2a$10$0NRsmkNyCnVNDb7Lh4G36.baqx.fhu2sTlLyPpCjzc0jxNVPnwuW2','member','Jonas','user',NULL),(17,'angela@email.com','$2a$10$lbwGZizQChR6de7K47xXxOE1duA9FzmRBA3L5KJkNFYqhNjQm0GLG','member','Angela','Yu','4be565fb-76fc-4ade-ad31-36caee73249f'),(20,'membermonica@email.com','$2a$10$WgUS.U8dnPyzig/vI5JSIuPRs/rKn7heaogkm7Z7A81iOTbiPBPza','member','Monica','User',NULL),(21,'member4@email.com','$2a$10$0vGszj1rZQDO5sWsPDDN9uPn1/sozI5Ico4hl1/BWZyUD0qumtr5e','member','Rachel','Pointing',NULL),(42,'john.doe@example.com','$2a$10$qQAAvQSi9wLNLJfwAnDlyeBFOwQlzOzNm.ZKCuwkCXrjq.RF8tz6K','trainer','John','Doe',NULL),(45,'member@email.com','$2a$10$I/t3oMty.zZSIOERRx.6HO/qpNCbXl8XKBREAlfc9cIbD53UlYEla','member','Amy','User',NULL),(46,'member2@email.com','$2a$10$SOHk.Z26fHjAevd6wOo6h.P45QEB/LNlUEoWG467S25HDnJSoSg42','member','Austin','User',NULL),(50,'chloe@email.com','$2a$10$3bT2EYYuYQSdHUVbpbdyjOG5Kx8aULAHah8zsQQ2lxXauOkqvTbrK','admin','Chloe','Deng',NULL),(52,'test2@email.com','$2a$10$p3imCJV6/ea71RdYZBAxZOjLxptqUfJ.kxqA2pnTjomAcyuTscpPG','member','member','test',NULL),(53,'trainer4@email.com','$2a$10$qxYCDDU6fhCS4HOr0zjYIeHx74gXgnN0754UzR3FNY0DHQ54X9/Oe','trainer','Wilson','Ren',NULL),(54,'kyle@email.com','$2a$10$BYqmqmbQS4yosxWTWdKymOMl.yZ7vY8uyFGghJTfG.nZXYjGQX83m','trainer','Kyle','Xu',NULL),(55,'reece@email.com','$2a$10$67CtgvYjMev6Hp.1vOhRR.utkuabULoa1gJ430zzgdkUI/Ykm29Wi','trainer','Reece','Doe',NULL);
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

-- Dump completed on 2024-04-20 20:56:58
