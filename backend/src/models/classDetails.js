import { db } from '../database.js';

// Class detail model constructor
export function classDetail(
  classId,
  activityName,
  activityDescription,
  activityDuration,
  startDate,
  startTime,
  locationNames,
  trainerNames
) {
  return {
    classId,
    activityName,
    activityDescription,
    activityDuration,
    startDate,
    startTime,
    locationNames,
    trainerNames,
  };
}

export async function getClassDetails() {
  const query = `
  SELECT 
        cl.id AS class_id,
        act.activity_name,
        act.activity_description,
        act.activity_duration,
        cl.datetime AS start_date,
        cl.start_at AS start_time,
        GROUP_CONCAT(DISTINCT loc.location_name SEPARATOR ', ') AS location_names,
        GROUP_CONCAT(DISTINCT CONCAT(tr.first_name, ' ', tr.last_name) SEPARATOR ', ') AS trainer_names
    FROM 
        classes cl
        INNER JOIN activities act ON cl.activity_id = act.activity_id
        LEFT JOIN class_locations clloc ON cl.id = clloc.class_id
        LEFT JOIN locations loc ON clloc.location_id = loc.id
        LEFT JOIN class_trainers cltr ON cl.id = cltr.class_id
        LEFT JOIN users tr ON cltr.trainer_id = tr.id AND tr.role = 'trainer'
    GROUP BY 
        cl.id,
        act.activity_name,
        act.activity_description,
        act.activity_duration,
        cl.datetime,
        cl.start_at
    
`;

  try {
    const [rows] = await db.query(query);
    return rows.map((row) =>
      classDetail(
        row.class_id,
        row.activity_name,
        row.activity_description,
        row.activity_duration,
        row.start_date,
        row.start_time,
        row.location_names,
        row.trainer_names
      )
    );
  } catch (error) {
    throw new Error('Error fetching class details: ' + error.message);
  }
}

export async function getClass(classID) {
  const query = `
    SELECT 
      cl.id AS classId,
      act.activity_name AS activityName,
      act.activity_description AS activityDescription,
      act.activity_duration AS activityDuration,
      cl.datetime AS startDate,
      cl.start_at AS startTime,
      GROUP_CONCAT(DISTINCT loc.location_name SEPARATOR ', ') AS locationNames,
      GROUP_CONCAT(DISTINCT CONCAT(tr.first_name, ' ', tr.last_name) SEPARATOR ', ') AS trainerNames
    FROM 
      classes cl
      INNER JOIN activities act ON cl.activity_id = act.activity_id
      LEFT JOIN class_locations clloc ON cl.id = clloc.class_id
      LEFT JOIN locations loc ON clloc.location_id = loc.id
      LEFT JOIN class_trainers cltr ON cl.id = cltr.class_id
      LEFT JOIN users tr ON cltr.trainer_id = tr.id AND tr.role = 'trainer'
    WHERE 
      cl.id = ?
    GROUP BY 
      cl.id, act.activity_name, act.activity_description, act.activity_duration, cl.datetime, cl.start_at
  `;

  try {
    const [rows] = await db.query(query, [classID]);
    if (rows.length > 0) {
      const classInfo = rows[0];
      return classDetail(
        classInfo.classId,
        classInfo.activityName,
        classInfo.activityDescription,
        classInfo.activityDuration,
        classInfo.startDate,
        classInfo.startTime,
        classInfo.locationNames,
        classInfo.trainerNames
      );
    } else {
      throw new Error('No class found with the given ID.');
    }
  } catch (error) {
    console.error('Error fetching class details by ID:', error);
    throw error; // Better error propagation
  }
}

async function findActivityIdByName(activityName) {
  const [activities] = await db.query(
    'SELECT activity_id FROM activities WHERE activity_name = ?',
    [activityName]
  );
  if (activities.length === 0) {
    throw new Error(`Activity with name ${activityName} not found.`);
  }
  return activities[0].activity_id;
}

async function findLocationIdByName(locationName) {
  const [locations] = await db.query(
    'SELECT id FROM locations WHERE location_name = ?',
    [locationName]
  );
  if (locations.length === 0) {
    throw new Error(`Location with name ${locationName} not found.`);
  }
  return locations[0].id;
}

async function findTrainerIdByName(trainerName) {
  // Split the full name into first and last names for the query
  const [firstName, lastName] = trainerName.split(' ');
  const [trainers] = await db.query(
    "SELECT id FROM users WHERE first_name = ? AND last_name = ? AND role = 'trainer'",
    [firstName, lastName]
  );
  if (trainers.length === 0) {
    throw new Error(`Trainer with name ${trainerName} not found.`);
  }
  return trainers[0].id;
}

export async function updateById(classId, classInfo) {
  // let activityId;

  // Initialize an object to hold the fields to update
  let fieldsToUpdate = {};
  // If activityName is provided, find the corresponding activity_id
  if (classInfo.activityName) {
    const activityId = await findActivityIdByName(classInfo.activityName);
    if (!activityId) throw new Error('Activity name not found');
    fieldsToUpdate.activity_id = activityId;
  }

  // Similar approach for locationName and trainerName
  if (classInfo.locationName) {
    const locationId = await findLocationIdByName(classInfo.locationName);
    if (!locationId) throw new Error('Location name not found');
    fieldsToUpdate.location_id = locationId;
  }

  if (classInfo.trainerName) {
    const trainerId = await findTrainerIdByName(classInfo.trainerName);
    if (!trainerId) throw new Error('Trainer name not found');
    fieldsToUpdate.trainer_id = trainerId;
  }

  // Include any other fields that are directly part of the classes table and provided by the client
  if (classInfo.startTime) fieldsToUpdate.start_at = classInfo.startTime;
  if (classInfo.startDate) fieldsToUpdate.datetime = classInfo.startDate;

  // Build the SQL query dynamically based on the fields provided
  const setSql = Object.keys(fieldsToUpdate)
    .map((key) => `${key} = ?`)
    .join(', ');
  const values = Object.values(fieldsToUpdate);

  // Ensure there are fields to update
  if (values.length === 0) {
    throw new Error('No valid fields provided for update');
  }

  // Add classId to the parameters for the WHERE clause
  values.push(classId);

  const sql = `UPDATE classes SET ${setSql} WHERE id = ?`;

  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      throw new Error('Class not found or no fields updated');
    }
    return { message: 'Class updated successfully', classId };
  } catch (error) {
    console.error('Error updating class:', error);
    throw error;
  }
}

export async function createOrUpdateActivity(
  activityName,
  activityDuration,
  activityDescription
) {
  // search the activity
  const activityId = await findActivityIdByName(activityName);
  let sql;

  if (activityId) {
    // if the activity is already existed, update the duration and activity
    sql = `UPDATE activities SET activity_duration = ?, activity_description = ? WHERE activity_id = ?`;

    await db.query(sql, [activityDuration, activityDescription, activityId]);

    return activityId; // return the current activity id
  } else {
    // if the activity is not existed, insert the new one
    sql = `INSERT INTO activities (activity_name, activity_duration, activity_description) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [
      activityName,
      activityDuration,
      activityDescription,
    ]);

    return result.insertId; // return the newly created activity id
  }
}

export async function createClass(newClassInfo) {
  const {
    activityName,
    startDate,
    startTime,
    activityDuration,
    activityDescription,
  } = newClassInfo;

  // 首先创建或更新活动
  const activityId = await createOrUpdateActivity(
    activityName,
    activityDuration,
    activityDescription
  );

  // 插入新的class记录
  const classSql = `
    INSERT INTO classes (activity_id, datetime, start_at) 
    VALUES (?, ?, ?)
  `;

  const [classResult] = await db.query(classSql, [
    activityId,
    startDate,
    startTime,
  ]);

  const classId = classResult.insertId;

  // 插入新的 class 记录后，获取 location names 和 trainer names
  const [locationRecords] = await db.query(
    `
    SELECT l.location_name
    FROM class_locations cl
    JOIN locations l ON cl.location_id = l.id
    WHERE cl.class_id = ?
  `,
    [classId]
  );

  const [trainerRecords] = await db.query(
    `
    SELECT CONCAT(u.first_name, ' ', u.last_name) AS trainer_name
    FROM class_trainers ct
    JOIN users u ON ct.trainer_id = u.id
    WHERE ct.class_id = ?
  `,
    [classId]
  );

  // 将结果映射到数组中
  const locationNames = locationRecords.map((l) => l.location_name);
  const trainerNames = trainerRecords.map((t) => t.trainer_name);

  await linkClassWithLocationAndTrainer(classId, newClassInfo);

  return {
    classId: classId,
    activityName,
    startDate,
    startTime,
    activityDuration,
    activityDescription,
    locationNames,
    trainerNames,
  };
}

async function linkClassWithLocationAndTrainer(
  classId,
  { locationNames, trainerNames }
) {
  for (const locationName of locationNames) {
    const locationId = await findLocationIdByName(locationName);
    if (locationId) {
      await db.query(
        `INSERT INTO class_locations (class_id, location_id) VALUES (?, ?)`,
        [classId, locationId]
      );
    }
  }

  for (const trainerName of trainerNames) {
    const trainerId = await findTrainerIdByName(trainerName);
    if (trainerId) {
      await db.query(
        `INSERT INTO class_trainers (class_id, trainer_id) VALUES (?, ?)`,
        [classId, trainerId]
      );
    }
  }
}

export async function getLocationsByTrainerName(trainerName) {
  const trainerId = await findTrainerIdByName(trainerName);

  const query = `
    SELECT 
      loc.id,
      loc.location_name
    FROM 
      class_trainers ct
      JOIN class_locations cl ON ct.class_id = cl.class_id
      JOIN locations loc ON cl.location_id = loc.id
    WHERE 
      ct.trainer_id = ?
    GROUP BY loc.id
  `;

  try {
    const [locations] = await db.query(query, [trainerId]);
    return locations;
  } catch (error) {
    console.error('Error fetching locations for trainer:', error);
    throw error;
  }
}

export async function getLocationsForTrainerAndClass(trainerName, classId) {
  // 首先根据教练名字找到对应的教练ID
  const trainerId = await findTrainerIdByName(trainerName);

  // 调整查询以选择特定课程和教练的地点
  const query = `
    SELECT DISTINCT
      loc.id,
      loc.location_name
    FROM 
      locations loc
      JOIN class_locations cl ON loc.id = cl.location_id
      JOIN classes c ON cl.class_id = c.id
      JOIN class_trainers ct ON c.id = ct.class_id
    WHERE 
      ct.trainer_id = ? AND
      c.id = ?
  `;

  try {
    const [locations] = await db.query(query, [trainerId, classId]);
    return locations;
  } catch (error) {
    console.error('Error fetching locations for class and trainer:', error);
    throw error;
  }
}

/*
export async function createClass(newClassInfo) {
  const {
    activityName,
    startDate,
    startTime,
    locationName,
    trainerName,
    activityDuration,
    activityDescription, // 假设描述也是由前端提供
  } = newClassInfo;

  // 首先创建或更新活动
  const activityId = await createOrUpdateActivity(
    activityName,
    activityDuration,
    activityDescription
  );

  // 然后查找location_id和trainer_id
  const locationId = await findLocationIdByName(locationName);
  if (!locationId) throw new Error('Location name not found');
  const trainerId = await findTrainerIdByName(trainerName);
  if (!trainerId) throw new Error('Trainer name not found');

  // 插入新的class记录
  const insertSql = `
    INSERT INTO classes (activity_id, datetime, start_at, location_id, trainer_id) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.query(insertSql, [
    activityId,
    startDate,
    startTime,
    locationId,
    trainerId,
  ]);

  return {
    classId: result.insertId,
    activityName,
    startDate,
    startTime,
    locationName,
    trainerName,
    activityDuration,
    activityDescription,
  };
}
*/

export async function deleteClass(classId) {
  const deleteSql = `
    DELETE FROM classes 
    WHERE id = ?
  `;

  try {
    const [result] = await db.query(deleteSql, [classId]);

    if (result.affectedRows === 0) {
      throw new Error('Class not found or already deleted');
    }

    return { message: 'Class deleted successfully', classId };
  } catch (error) {
    console.error('Error deleting class:', error);
    throw error; // 重新抛出错误让调用者能够处理它
  }
}
