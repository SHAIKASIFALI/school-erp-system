const newstudentModel = require("../models/newStudent");
const { catchAsync } = require("../utlis/catchAsync");
const upload = require("../utlis/uploadFile");
const excelToJsonConverter = require("../utlis/excelToJsonConverter");
const TeacherModel = require("../models/teacher");
const uploadMiddleware = upload.single("dataFile"); // the field name associated with uploading file will be
const adminDataPostController = catchAsync(async (req, res, next) => {
  const json = excelToJsonConverter(req.file.path);
  await newstudentModel.insertMany(json, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).json({
        msg: "file uploaded successfully into database",
        filename: req.file.originalname,
      });
    }
  });
});

const postTeachersDataController = catchAsync(async (req, res, next) => {
  const json = excelToJsonConverter(req.file.path);
  await TeacherModel.insertMany(json, (err, result) => {
    if (err) console.log(err);
    if (result) {
      res.status(200).json({
        msg: "Teachers data uploaded successfully into database",
        filename: req.file.originalname,
      });
    }
  });
});


module.exports = { adminDataPostController, postTeachersDataController, uploadMiddleware };
