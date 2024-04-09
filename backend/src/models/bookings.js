import { db } from "../database.js";

export class Booking {
  constructor(
    bookingId,
    className,
    trainerName,
    locationName,
    bookingTime,
    userName,
  ) {
    this.bookingId = bookingId;
    this.className = className;
    this.trainerName = trainerName;
    this.locationName = locationName;
    this.bookingTime = bookingTime;
    this.userName = userName;
  }
}

export async function getBookings() {
  const query = `SELECT 
  b.id AS booking_id,
  act.activity_name,
  CONCAT(tr.first_name, ' ', tr.last_name) AS trainer_name,  
  l.location_name,
  b.create_at AS booking_time,
  CONCAT(u.first_name, ' ', u.last_name) AS user_full_name
FROM 
  bookings b
  INNER JOIN classes c ON b.class_id = c.id
  INNER JOIN users u ON b.user_id = u.id
  INNER JOIN locations l ON c.location_id = l.id
  INNER JOIN activities act ON act.activity_id = c.activity_id
  INNER JOIN users tr ON c.trainer_id = tr.id;`;

  try {
    const [bookingDetails] = await db.query(query);
    return bookingDetails.map(
      (b) =>
        new Booking(
          b.booking_id,
          b.activity_name,
          b.trainer_name,
          b.location_name,
          b.booking_time,
          b.user_full_name,
        ),
    );
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
}

// export async function getBookings() {
//   const query = `SELECT
//   b.id AS booking_id,
//   b.create_at AS booking_time,
//   c.class_name,
//   u.first_name AS user_first_name,
//   u.last_name AS user_last_name,
//   l.location_name
// FROM
//   bookings b
//   INNER JOIN classes c ON b.class_id = c.id
//   INNER JOIN users u ON b.user_id = u.id
//   INNER JOIN locations l ON b.location_id = l.id;
// `;

//   const [bookingDetails] = await db.query(query);
//   // 转换为 BookingDetail 实例的数组
//   return bookingDetails.map(
//     (b) =>
//       new Booking(
//         b.booking_id,
//         b.booking_time,
//         b.class_name,
//         b.user_first_name,
//         b.user_last_name,
//         b.location_name,
//       ),
//   );
// }

// Helper functions to find IDs by names
// async function findClassIdByName(className) {
//   const [classes] = await db.query(
//     "SELECT id FROM classes WHERE class_name = ?",
//     [className],
//   );
//   return classes[0]?.id;
// }

async function findActivityIdByName(activityName) {
  const [activities] = await db.query(
    "SELECT activity_id FROM activities WHERE activity_name = ?",
    [activityName],
  );
  return activities[0]?.activity_id;
}

async function findUserIdByName(userName) {
  const [users] = await db.query(
    "SELECT id FROM users WHERE CONCAT(first_name, ' ', last_name) = ? AND role = 'member'",
    [userName],
  );
  return users[0]?.id;
}

async function findLocationIdByName(locationName) {
  const [locations] = await db.query(
    "SELECT id FROM locations WHERE location_name = ?",
    [locationName],
  );
  return locations[0]?.id;
}

async function findTrainerIdByName(trainerName) {
  const [trainers] = await db.query(
    "SELECT id FROM users WHERE CONCAT(first_name, ' ', last_name) = ? AND role = 'trainer'",
    [trainerName],
  );
  return trainers[0]?.id;
}

export async function createBooking(newBooking) {
  try {
    const {
      activityName,
      userName,
      locationName,
      trainerName,
      startDate, // 前端传来的上课时间
      startTime, // 前端传来的上课开始时间
    } = newBooking;

    // 查找相关ID
    const activityId = await findActivityIdByName(activityName);
    const userId = await findUserIdByName(userName);
    const locationId = await findLocationIdByName(locationName);
    const trainerId = await findTrainerIdByName(trainerName);

    console.log(`Class ID: ${activityId}`);
    console.log(`User ID: ${userId}`);
    console.log(`Location ID: ${locationId}`);
    console.log(`Trainer ID: ${trainerId}`);

    // 检查ID是否都找到了
    if (!activityId || !userId || !locationId || !trainerId) {
      throw new Error("One or more details are incorrect or missing");
    }

    // 找到特定时间和地点的课程实例
    const [classInstances] = await db.query(
      `SELECT id FROM classes
       WHERE activity_id = ? AND datetime = ? AND start_at = ? AND location_id = ? AND trainer_id = ?`,
      [activityId, startDate, startTime, locationId, trainerId],
    );

    if (classInstances.length === 0) {
      throw new Error("This trainer does not teach this class");
    }

    const classId = classInstances[0]?.id;
    if (!classId) {
      throw new Error("No class instance found for the provided details");
    }

    // 创建预订
    const [result] = await db.query(
      "INSERT INTO bookings (class_id, user_id, location_id) VALUES (?, ?, ?)",
      [classId, userId, locationId],
    );

    // 构造并返回成功响应
    return {
      bookingId: result.insertId,
      bookingTime: new Date().toISOString(), // 创建预订的时间
      activityName,
      userName,
      locationName,
      trainerName,
      startDate,
      startTime,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  }
}

/*
export async function createBooking(newBooking) {
  try {
    const { className, userName, locationName, trainerName } = newBooking;

    // 解析用户全名
    // const [userFirstName, userLastName] = userName.split(" ");
    // const [trainerFirstName, trainerLastName] = trainerName.split(" ");

    // 查找相关ID
    const classId = await findClassIdByName(className);
    const userId = await findUserIdByName(userName);
    const locationId = await findLocationIdByName(locationName);
    const trainerId = await findTrainerIdByName(trainerName);

    // console.log(`Class ID: ${classId}`);
    // console.log(`User ID: ${userId}`);
    // console.log(`Location ID: ${locationId}`);
    // console.log(`Trainer ID: ${trainerId}`);

    // 验证所有ID都已找到，包括教练是否属于这个课程
    if (!classId || !userId || !locationId) {
      throw new Error("One or more details are incorrect or missing");
    }

    // 验证这个教练是否确实教授了这个课程
    const [classes] = await db.query(
      "SELECT id FROM classes WHERE id = ? AND trainer_id = ?",
      [classId, trainerId],
    );
    if (classes.length === 0) {
      throw new Error("This trainer does not teach this class");
    }

    // 执行数据库插入操作
    const [result] = await db.query(
      "INSERT INTO bookings (class_id, user_id, location_id) VALUES (?, ?, ?)",
      [classId, userId, locationId],
    );

    // 构造并返回成功响应
    return {
      bookingId: result.insertId,
      bookingTime: new Date().toISOString(),
      className,
      userName,
      locationName,
      trainerName,
    };
  } catch (error) {
    console.error("Error creating booking:", error);
    // 将错误抛出，让调用者处理（例如，发送HTTP错误响应）
    throw error;
  }
}
*/

// Function to delete a booking
export async function deleteBooking(bookingId) {
  const result = await db.query("DELETE FROM bookings WHERE id = ?", [
    bookingId,
  ]);

  // 检查是否成功删除了一行数据
  if (result.affectedRows === 0) {
    throw new Error("No booking found with the given ID.");
  }

  return { message: "Booking deleted successfully" };
}
