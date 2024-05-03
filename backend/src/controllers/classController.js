import { Router } from 'express';
import auth from '../middleware/auth.js';
import * as Classes from '../models/classes.js';
import * as ClassDetails from '../models/classDetails.js';

const classController = Router();

classController.get('/', async (req, res) => {
  const classes = await Classes.getClasses();

  res.status(200).json({
    status: 'Success',
    message: 'Get all classes',
    data: classes,
  });
});

classController.get('/details', async (req, res) => {
  const classes = await ClassDetails.getClassDetails();

  res.status(200).json({
    status: 'Success',
    message: 'Get all classes with trainers and locations',
    result: classes.length,
    data: classes,
  });
});

classController.get('/:id', async (req, res) => {
  const classID = req.params.id;

  // Implement request validation
  if (!classID || isNaN(parseInt(classID)) || parseInt(classID) < 1) {
    return res.status(400).json({
      status: 400,
      message: 'Invalid class ID provided.',
    });
  }

  try {
    const classInfo = await ClassDetails.getClass(classID);
    if (classInfo) {
      res.status(200).json({
        status: 200,
        message: 'Get class by ID',
        data: classInfo,
      });
    } else {
      res.status(404).json({
        status: 404,
        message: 'Class not found',
      });
    }
  } catch (error) {
    console.error('Error fetching class by ID:', error);
    res.status(500).json({
      status: 500,
      message: 'Failed to get class by ID',
    });
  }
});

classController.get('/locations-for-trainer/:trainerName', async (req, res) => {
  try {
    const trainerName = req.params.trainerName;

    if (!trainerName) {
      return res.status(400).send('Trainer name is required.');
    }

    const locations = await ClassDetails.getLocationsByTrainerName(trainerName);

    if (!locations || locations.length === 0) {
      return res
        .status(404)
        .send('No locations found for the provided trainer name.');
    }

    res.status(200).json(locations);
  } catch (error) {
    console.error('Error in GET /locations-for-trainer:', error.message);
    res.status(500).send(error.message);
  }
});

classController.get(
  '/locations-for-trainer-and-class/:trainerName/:classId',
  async (req, res) => {
    try {
      const { trainerName, classId } = req.params;

      if (!trainerName || !classId) {
        return res.status(400).send('Trainer name and class ID are required.');
      }

      const locations = await ClassDetails.getLocationsForTrainerAndClass(
        trainerName,
        classId
      );

      if (!locations || locations.length === 0) {
        return res
          .status(404)
          .send('No locations found for the provided trainer and class.');
      }

      res.status(200).json(locations);
    } catch (error) {
      console.error(
        'Error in GET /locations-for-trainer-and-class:',
        error.message
      );
      res.status(500).send(error.message);
    }
  }
);

classController.post('/', auth(['admin', 'trainer']), async (req, res) => {
  // Get the class data out of the request
  const classData = req.body;
  console.log(classData);

  // Implement request validation
  if (
    !classData.activityName ||
    !classData.startDate ||
    !classData.startTime ||
    !classData.locationNames ||
    !classData.trainerNames
  ) {
    return res.status(400).json({
      status: 400,
      message: 'Missing required class information',
    });
  }

  try {
    // Directly pass classData to createClass function
    const createdClass = await ClassDetails.createClass(classData);

    res.status(201).json({
      status: 201,
      message: 'Created new class',
      data: createdClass,
    });
  } catch (error) {
    console.error('Failed to create new class:', error.message);
    res.status(500).json({
      status: 500,
      message: 'Failed to create new class: ' + error.message,
    });
  }
});

classController.patch('/:id', async (req, res) => {
  const classId = req.params.id;
  const updateData = req.body;
  // console.log(Object.keys(updateData));

  if (!updateData || Object.keys(updateData).length === 0) {
    return res.status(400).json({
      status: 400,
      message: 'No update data provided',
    });
  }

  try {
    await ClassDetails.updateById(classId, updateData);
    // console.log(result);
    res.json({
      status: 200,
      message: 'Class updated successfully',
    });
  } catch (error) {
    console.error('Failed to update class:', error.message);
    res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
});

classController.delete('/:id', auth(['admin', 'trainer']), async (req, res) => {
  const classId = req.params.id;
  // console.log(classId);

  try {
    const result = await ClassDetails.deleteClass(classId);

    res.status(200).json({
      message: 'Class deleted successfully',
      classId: result.classId,
    });
  } catch (error) {
    if (error.message === 'Class not found or already deleted') {
      res.status(404).send(error.message);
    } else {
      res.status(500).send('Server error while deleting class');
    }
  }
});

export default classController;
