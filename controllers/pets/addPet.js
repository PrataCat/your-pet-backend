const catchAsyncWrapper = require("../../helpers/catchAsyncWrapper");
const httpError = require("../../helpers/httpError");
const { Pet, addSchema } = require("../../models/pet");

const addPet = catchAsyncWrapper(async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    const errMessage = `missing required "${error.details[0].path[0]}" field`;
    throw httpError(400, errMessage);
  }

  const { _id: owner } = req.user;
  const result = await Pet.create({ ...req.body, owner });

  res.status(201).json(result);
});

module.exports = addPet;
