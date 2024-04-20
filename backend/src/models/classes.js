import { db } from '../database.js';

// Class model (object) constructor
export function newClass(
  id,
  className,
  datetime,
  startAt,
  duration,
  description,
  locationID,
  trainerID
) {
  return {
    id,
    className,
    datetime,
    startAt,
    duration,
    description,
    locationID,
    trainerID,
  };
}

export async function getClasses() {
  // Get the collection of all animals
  const [allClassesResults] = await db.query('SELECT * FROM classes');

  // Convert the collection of results into a list of Animal objects
  return await allClassesResults.map((classResult) =>
    newClass(
      classResult.id,
      classResult.class_name,
      classResult.datetime,
      classResult.start_at,
      classResult.duration,
      classResult.description,
      classResult.location_id,
      classResult.trainer_id
    )
  );
}

export async function getClass(classID) {
  try {
    const [rows] = await db.query('SELECT * FROM classes WHERE id = ?', [
      classID,
    ]);
    if (rows.length > 0) {
      const classResult = rows[0];
      // 使用 Promise.resolve 返回已解决的 Promise
      return Promise.resolve(
        newClass(
          classResult.id,
          classResult.class_name,
          classResult.datetime,
          classResult.start_at,
          classResult.duration,
          classResult.description,
          classResult.location_id,
          classResult.trainer_id
        )
      );
    } else {
      // 使用 Promise.reject 返回被拒绝的 Promise
      return Promise.reject('No class found with the given ID.');
    }
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    // 直接抛出错误，让调用者决定如何处理
    return Promise.reject(error.message);
  }
}

export async function createClass(newClass) {
  // 确保新创建的课程对象不包含id属性
  delete newClass.id;

  try {
    // 插入课程对象到数据库
    const [result] = await db.query(
      'INSERT INTO classes (class_name, datetime, start_at, duration, description, location_id, trainer_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        newClass.className,
        newClass.datetime,
        newClass.startAt,
        newClass.duration,
        newClass.description,
        newClass.locationID,
        newClass.trainerID,
      ]
    );

    // 将数据库生成的id注入到课程对象中并返回
    return { ...newClass, id: result.insertId };
  } catch (error) {
    // 处理可能发生的任何错误
    console.error('Error creating new class:', error);
    // 在这里可以决定是否要处理错误或者将其抛出给调用者
    throw error;
  }
}

export async function deleteByID(classID) {
  return db.query('DELETE FROM classes WHERE id = ?', classID);
}
