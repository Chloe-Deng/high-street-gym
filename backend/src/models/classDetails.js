import { db } from '../database.js';

// Class detail model constructor
export function classDetail(
  classId,
  activityName,
  activityDescription,
  activityDuration,
  startDate,
  startTime,
  locationName,
  trainerName
) {
  return {
    classId,
    activityName,
    activityDescription,
    activityDuration,
    startDate,
    startTime,
    locationName,
    trainerName,
  };
}

export async function getClassDetails() {
  const query = `
    SELECT 
        cl.id AS class_id,
        act.activity_name,
        act.activity_description,
        act.activity_duration,
        cl.datetime,
        cl.start_at,
        loc.location_name,
        CONCAT(tr.first_name, ' ', tr.last_name) AS trainer_name
    FROM 
        classes cl
        INNER JOIN activities act ON cl.activity_id = act.activity_id
        INNER JOIN locations loc ON cl.location_id = loc.id
        INNER JOIN users tr ON cl.trainer_id = tr.id
    WHERE 
        tr.role = 'trainer';
    `;

  try {
    const [rows] = await db.query(query);
    return rows.map((row) =>
      classDetail(
        row.class_id,
        row.activity_name,
        row.activity_description,
        row.activity_duration,
        row.datetime,
        row.start_at,
        row.location_name,
        row.trainer_name
      )
    );
  } catch (error) {
    throw new Error('Error fetching class details: ' + error.message);
  }
}

export async function getClass(classID) {
  try {
    const [rows] = await db.query(
      `
    SELECT
      cl.id AS classId,
      act.activity_name AS activityName,
      act.activity_description AS activityDescription,
      act.activity_duration AS activityDuration,
      cl.datetime AS startDate,
      cl.start_at AS startTime,
      loc.location_name AS locationName,
      CONCAT(tr.first_name, ' ', tr.last_name) AS trainerName
    FROM
      classes cl
    INNER JOIN activities act ON cl.activity_id = act.activity_id
    INNER JOIN locations loc ON cl.location_id = loc.id
    INNER JOIN users tr ON cl.trainer_id = tr.id
    WHERE cl.id = ? AND tr.role = 'trainer'
  `,
      [classID]
    );

    if (rows.length > 0) {
      const classInfo = rows[0];
      return Promise.resolve(
        classDetail(
          classInfo.classId,
          classInfo.activityName,
          classInfo.activityDescription,
          classInfo.activityDuration,
          classInfo.startDate,
          classInfo.startTime,
          classInfo.locationName,
          classInfo.trainerName
        )
      );
    } else {
      return Promise.reject(new Error('No class found with the given ID.'));
    }
  } catch (error) {
    console.error('Error fetching class details by ID:', error);
    return Promise.reject(error);
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

// 更新activities表的函数
/*
async function updateActivity(activityId, updates) {
  const { activityDescription, activityDuration } = updates;
  const fields = [];
  const values = [];

  if (activityDescription !== undefined) {
    fields.push("activity_description = ?");
    values.push(activityDescription);
  }

  if (activityDuration !== undefined) {
    fields.push("activity_duration = ?");
    values.push(activityDuration);
  }

  if (fields.length === 0) {
    throw new Error("No updates provided for the activity");
  }

  values.push(activityId);
  const sql = `UPDATE activities SET ${fields.join(", ")} WHERE activity_id = ?`;

  await db.query(sql, values);
}
*/

export async function updateById(classId, classInfo) {
  // let activityId;

  // Initialize an object to hold the fields to update
  let fieldsToUpdate = {};
  // If activityName is provided, find the corresponding activity_id
  if (classInfo.activityName) {
    const activityId = await findActivityIdByName(classInfo.activityName);
    if (!activityId) throw new Error('Activity name not found');
    fieldsToUpdate.activity_id = activityId;

    // 更新activities表

    // await updateActivity(activityId, {
    //   activityDescription: classInfo.activityDescription,
    //   activityDuration: classInfo.activityDuration,
    // });

    // fieldsToUpdate.activity_id = activityId;
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
  // 尝试查找活动
  const activityId = await findActivityIdByName(activityName);
  let sql;

  if (activityId) {
    // 如果活动已存在，更新duration和description
    sql = `UPDATE activities SET activity_duration = ?, activity_description = ? WHERE activity_id = ?`;
    await db.query(sql, [activityDuration, activityDescription, activityId]);
    return activityId; // 返回现有活动的ID
  } else {
    // 如果活动不存在，创建新活动
    sql = `INSERT INTO activities (activity_name, activity_duration, activity_description) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [
      activityName,
      activityDuration,
      activityDescription,
    ]);
    return result.insertId; // 返回新创建活动的ID
  }
}

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

export async function deleteClass(classId) {
  // 构建删除特定class记录的SQL语句
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
