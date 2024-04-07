import { db } from "../database.js";

// Class model (object) constructor
export function newClass(
  id,
  className,
  datetime,
  startAt,
  duration,
  description,
  locationID,
  trainerID,
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
  const [allClassesResults] = await db.query("SELECT * FROM classes");

  console.log(allClassesResults);

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
      classResult.trainer_id,
    ),
  );
}

export async function getClass(classID) {
  try {
    const [rows] = await db.query("SELECT * FROM classes WHERE id = ?", [
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
          classResult.trainer_id,
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

export async function createClass(newClass) {
  // 确保新创建的课程对象不包含id属性
  delete newClass.id;

  try {
    // 插入课程对象到数据库
    const [result] = await db.query(
      "INSERT INTO classes (class_name, datetime, start_at, duration, description, location_id, trainer_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        newClass.className,
        newClass.datetime,
        newClass.startAt,
        newClass.duration,
        newClass.description,
        newClass.locationID,
        newClass.trainerID,
      ],
    );

    // 将数据库生成的id注入到课程对象中并返回
    return { ...newClass, id: result.insertId };
  } catch (error) {
    // 处理可能发生的任何错误
    console.error("Error creating new class:", error);
    // 在这里可以决定是否要处理错误或者将其抛出给调用者
    throw error;
  }
}

// export async function update(classInfo) {
//   return db.query(
//     "UPDATE classes SET class_name = ?, datetime = ?, start_at = ?, duration = ?, description = ?, location_id = ?, trainer_id = ? WHERE id = ?",
//     [
//       classInfo.className,
//       classInfo.datetime,
//       classInfo.startAt,
//       classInfo.duration,
//       classInfo.description,
//       classInfo.locationID,
//       classInfo.trainerID,
//       classInfo.id,
//     ],
//   );
// }

export async function updateById(classId, classInfo) {
  // 过滤掉 id 和任何不应直接更新的字段
  const { id, ...fieldsToUpdate } = classInfo;

  // 构建 SQL 语句的 SET 部分
  const setSql = Object.keys(fieldsToUpdate)
    .map((key, index) => `${key} = ?`)
    .join(", ");

  // 准备 SQL 语句的参数值
  const values = Object.values(fieldsToUpdate);

  // 确保 id 作为最后一个参数传递给 WHERE 子句
  values.push(classId);

  if (!setSql.length) {
    throw new Error("No fields provided for update");
  }

  const sql = `UPDATE classes SET ${setSql} WHERE id = ?`;

  try {
    const [result] = await db.query(sql, values);
    if (result.affectedRows === 0) {
      throw new Error("Class not found or no fields updated");
    }
    return result;
  } catch (error) {
    throw error;
  }
}

export async function deleteByID(classID) {
  return db.query("DELETE FROM classes WHERE id = ?", classID);
}
