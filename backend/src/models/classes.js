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
      return Promise.reject('No class found with the given ID.');
    }
  } catch (error) {
    console.error('Error fetching class by ID:', error);

    return Promise.reject(error.message);
  }
}

export async function createClass(newClass) {
  // ensure the ew class object doesn't contain id
  delete newClass.id;

  try {
    // insert the class object to database
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

    return { ...newClass, id: result.insertId };
  } catch (error) {
    console.error('Error creating new class:', error);

    throw error;
  }
}

export async function deleteByID(classID) {
  return db.query('DELETE FROM classes WHERE id = ?', classID);
}
