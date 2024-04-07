import { db } from "../database.js";

// Class detail model constructor
export function classDetail(
  id,
  className,
  datetime,
  startAt,
  duration,
  description,
  locationName, // Include location name instead of ID
  trainerName, // Include trainer name instead of ID
) {
  return {
    id,
    className,
    datetime,
    startAt,
    duration,
    description,
    locationName, // Location name from 'locations' table
    trainerName, // Trainer's first name from 'users' table
  };
}

export async function getClassDetails() {
  // SQL 查询加入 JOIN 操作来获得地点名称和教练名字
  const [allClassesResults] = await db.query(`
    SELECT
      c.id,
      c.class_name,
      c.datetime,
      c.start_at,
      c.duration,
      c.description,
      l.location_name,
      u.first_name AS trainer_name
    FROM
      classes c
    INNER JOIN locations l ON c.location_id = l.id
    INNER JOIN users u ON c.trainer_id = u.id
  `);

  // 使用 ClassDetail 模型来创建对象列表
  return allClassesResults.map((classResult) =>
    classDetail(
      classResult.id,
      classResult.class_name,
      classResult.datetime,
      classResult.start_at,
      classResult.duration,
      classResult.description,
      classResult.location_name,
      classResult.trainer_name,
    ),
  );
}

export async function getClass(classID) {
  try {
    const [rows] = await db.query(
      `
    SELECT
      c.id,
      c.class_name,
      c.datetime,
      c.start_at,
      c.duration,
      c.description,
      l.location_name,
      u.first_name AS trainer_name
    FROM
      classes c
    INNER JOIN locations l ON c.location_id = l.id
    INNER JOIN users u ON c.trainer_id = u.id
    WHERE c.id = ?
  `,
      [classID],
    );

    if (rows.length > 0) {
      const classResult = rows[0];
      // 使用 Promise.resolve 返回已解决的 Promise
      return Promise.resolve(
        classDetail(
          classResult.id,
          classResult.class_name,
          classResult.datetime,
          classResult.start_at,
          classResult.duration,
          classResult.description,
          classResult.location_name,
          classResult.trainer_name,
        ),
      );
    } else {
      // 使用 Promise.reject 返回被拒绝的 Promise
      return Promise.reject("No class found with the given ID.");
    }
  } catch (error) {
    console.error("Error fetching class by ID:", error);
    // 直接抛出错误，让调用者决定如何处理
    return Promise.reject(error.message);
  }
}
