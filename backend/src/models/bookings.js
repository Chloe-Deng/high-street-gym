import { db } from '../database.js';

export class Booking {
  constructor(
    bookingId,
    userId,
    className,
    trainerName,
    locationName,
    bookingTime,
    userName,
    startDate,
    startTime
  ) {
    this.bookingId = bookingId;
    this.userId = userId;
    this.className = className;
    this.trainerName = trainerName;
    this.locationName = locationName;
    this.bookingTime = bookingTime;
    this.userName = userName;
    this.startDate = startDate;
    this.startTime = startTime;
  }
}

export async function getBookings() {
  const query = `SELECT 
  b.id AS booking_id,
  b.user_id, 
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
          b.user_id,
          b.activity_name,
          b.trainer_name,
          b.location_name,
          b.booking_time,
          b.user_full_name
        )
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}

export async function getBookingsByMember(userId) {
  const query = `SELECT 
  b.id AS booking_id,
  b.user_id,
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
  INNER JOIN users tr ON c.trainer_id = tr.id
WHERE 
  u.id = ?;`; // Use a placeholder for the user ID

  try {
    const [bookingDetails] = await db.query(query, [userId]);

    return bookingDetails.map(
      (b) =>
        new Booking(
          b.booking_id,
          b.user_id,
          b.activity_name,
          b.trainer_name,
          b.location_name,
          b.booking_time,
          b.user_full_name
        )
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}

export async function getConditionalBookings(userId, role) {
  let query;
  if (role === 'admin' || role === 'trainer') {
    // If the user is an admin or a trainer, fetch all bookings
    query = `
    SELECT 
    b.id AS booking_id,
    b.user_id,
    act.activity_name AS activity_name,
    b.create_at AS booking_time,
    loc.location_name AS location_name,
    c.datetime,
    c.start_at,
    CONCAT(tr.first_name, ' ', tr.last_name) AS trainer_name,
    CONCAT(u.first_name, ' ', u.last_name) AS user_full_name
   
  FROM 
    bookings b
    INNER JOIN classes c ON b.class_id = c.id
    INNER JOIN activities act ON c.activity_id = act.activity_id
    INNER JOIN locations loc ON b.location_id = loc.id
    INNER JOIN users tr ON b.trainer_id = tr.id
    INNER JOIN users u ON b.user_id = u.id
  
  `;
  } else {
    query = `
  SELECT 
    b.id AS booking_id,
    b.user_id,
    act.activity_name AS activity_name,
    b.create_at AS booking_time,
    loc.location_name AS location_name,
    c.datetime,
    c.start_at,
    CONCAT(tr.first_name, ' ', tr.last_name) AS trainer_name,
    CONCAT(u.first_name, ' ', u.last_name) AS user_full_name
  FROM 
    bookings b
    INNER JOIN classes c ON b.class_id = c.id
    INNER JOIN activities act ON c.activity_id = act.activity_id
    INNER JOIN locations loc ON b.location_id = loc.id
    INNER JOIN users tr ON b.trainer_id = tr.id
    INNER JOIN users u ON b.user_id = u.id
    
  WHERE 
    b.user_id = ?
  `;
  }

  try {
    const [bookingDetails] =
      role === 'admin' || role === 'trainer'
        ? await db.query(query)
        : await db.query(query, [userId]); // Pass the userId if member

    return bookingDetails.map(
      (b) =>
        new Booking(
          b.booking_id,
          b.user_id,
          b.activity_name,
          b.trainer_name, // Updated to reflect multiple trainers
          b.location_name, // Updated to reflect multiple locations
          b.booking_time,
          b.user_full_name,
          b.datetime,
          b.start_at
        )
    );
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}

// HELPER FUNCTIONS
async function findActivityIdByName(activityName) {
  const [activities] = await db.query(
    'SELECT activity_id FROM activities WHERE activity_name = ?',
    [activityName]
  );
  return activities[0]?.activity_id;
}

async function findUserIdByName(userName) {
  const [users] = await db.query(
    "SELECT id FROM users WHERE CONCAT(first_name, ' ', last_name) = ?",
    [userName]
  );
  return users[0]?.id;
}

async function findLocationIdByName(locationName) {
  const [locations] = await db.query(
    'SELECT id FROM locations WHERE location_name = ?',
    [locationName]
  );
  return locations[0]?.id;
}

async function findTrainerIdByName(trainerName) {
  const [trainers] = await db.query(
    "SELECT id FROM users WHERE CONCAT(first_name, ' ', last_name) = ? AND role = 'trainer'",
    [trainerName]
  );
  return trainers[0]?.id;
}

export async function getLocationByTrainer() {
  try {
    const query = `
      SELECT loc.location_name 
      FROM class_trainers ct
      JOIN classes c ON ct.class_id = c.id
      JOIN class_locations cl ON c.id = cl.class_id
      JOIN locations loc ON cl.location_id = loc.id
      WHERE ct.trainer_id = ? AND c.datetime = ?
    `;

    const [locations] = await db.query(query, [trainerId, dateTime]);

    if (locations.length === 0) {
      throw new Error('No location found for the given trainer and datetime.');
    }

    return locations[0].location_name;
  } catch (error) {
    throw error;
  }
}

export async function createBooking(newBooking) {
  try {
    const {
      activityName,
      userName,
      locationName, // single location
      trainerName, // single trainer
      startDate,
      startTime,
    } = newBooking;

    // 查找相关的 activity_id 和 user_id
    const activityId = await findActivityIdByName(activityName);
    const userId = await findUserIdByName(userName);

    // 确认是否找到了 activity_id 和 user_id
    if (!activityId || !userId) {
      throw new Error('Activity or user not found');
    }

    // 在 classes 表中查找是否存在符合条件的 class 实例
    const [existingClasses] = await db.query(
      `
      SELECT id FROM classes
      WHERE activity_id = ? AND datetime = ? AND start_at = ?
    `,
      [activityId, startDate, startTime]
    );
    let classId = existingClasses[0]?.id;

    // 如果不存在符合条件的 class 实例，则创建一个
    if (!classId) {
      const [classInsertResult] = await db.query(
        `
        INSERT INTO classes (activity_id, datetime, start_at) VALUES (?, ?, ?)
      `,
        [activityId, startDate, startTime]
      );
      classId = classInsertResult.insertId;
    }

    // 检查并添加 location 与 class 的关联
    const locationId = await findLocationIdByName(locationName);
    if (locationId) {
      const [locationRelation] = await db.query(
        `
        SELECT * FROM class_locations WHERE class_id = ? AND location_id = ?
      `,
        [classId, locationId]
      );
      if (locationRelation.length === 0) {
        await db.query(
          `
          INSERT INTO class_locations (class_id, location_id) VALUES (?, ?)
        `,
          [classId, locationId]
        );
      }
    }

    const trainerId = await findTrainerIdByName(trainerName);
    if (trainerId) {
      const [trainerRelation] = await db.query(
        `
        SELECT * FROM class_trainers WHERE class_id = ? AND trainer_id = ?
      `,
        [classId, trainerId]
      );
      if (trainerRelation.length === 0) {
        await db.query(
          `
          INSERT INTO class_trainers (class_id, trainer_id) VALUES (?, ?)
        `,
          [classId, trainerId]
        );
      }
    }
    // Create booking
    const [bookingInsertResult] = await db.query(
      'INSERT INTO bookings (class_id, user_id, location_id, trainer_id) VALUES (?, ?, ?, ?)',
      [classId, userId, locationId, trainerId]
    );
    const bookingId = bookingInsertResult.insertId;
    // return the new booking object
    return {
      bookingId,
      bookingTime: new Date().toISOString(),
      activityName,
      userName,
      locationName,
      trainerName,
      startDate,
      startTime,
    };
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
}

// Function to delete a booking
export async function deleteBooking(bookingId) {
  const result = await db.query('DELETE FROM bookings WHERE id = ?', [
    bookingId,
  ]);

  // Check if it is delete one booking
  if (result.affectedRows === 0) {
    throw new Error('No booking found with the given ID.');
  }

  return { message: 'Booking deleted successfully' };
}
