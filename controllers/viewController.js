const catchAsync = require('../utils/catchAsync');
const Tour = require('./../models/tourModel');

exports.getOverview = catchAsync(async (req, res) => {
  // 1) Get Tour Ddata from collection
  const tours = await Tour.find();

  // 2) Build Template
  // 3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours,
  });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', {
    tour: 'The Forest Hiker',
  });
};
