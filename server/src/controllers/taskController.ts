const Task = require("../models/taskModel");

export const getTask = async (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  const sortField = req.query.sort.toLowerCase() || "title";
  const sortOrder = req.query.order === "asc" ? 1 : -1;
  try {
    const items = await Task.find()
      .collation({ locale: "en" })
      .sort({ [sortField]: sortOrder })
      .skip(skip)
      .limit(limit);
    const totalItems = await Task.countDocuments();
    res.json({ totalItems: totalItems, items: items });
  } catch (err) {
    console.log(err);
  }
};

export const createTask = (req, res) => {
  let data = new Task(req.body.taskData);
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  data
    .save()
    .then(async (data) => {
      const items = await Task.find().skip(skip).limit(limit);
      const totalItems = await Task.countDocuments();
      res.json({ totalItems: totalItems, items: items });
    })
    .catch(function (err) {
      res.status(422).send("Task add failed");
    });
};

export const updateTask = async (req, res) => {
  let rst = await Task.update(
    { _id: req.body.task._id },
    {
      $set: {
        title: req.body.task.title,
        description: req.body.task.description,
        status: req.body.task.status,
        create_at: req.body.task.create_at,
        duty_at: req.body.task.duty_at,
      },
    }
  );
  let task = await Task.findOne({ id: req.body.task._id });
  if (task) {
    Task.find(function (err, tasks) {
      res.json(tasks);
    });
  } else {
    res.status(422).send("Task add failed");
  }
};

export const removeTask = (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const skip = (page - 1) * limit;

  Task.findByIdAndRemove(req.params.id, async (err, doc) => {
    if (!err) {
      const items = await Task.find().skip(skip).limit(limit);
      const totalItems = await Task.countDocuments();
      res.json({ totalItems: totalItems, items: items });
    } else {
      console.log(err);
    }
  });
};
