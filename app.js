const express = require('express');
const app = express();
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));
app.use(express.json());

app.use((req, res, next) => {
  console.log('Hello from the middleware!');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// // Tours Routes
// const tourRouter = express.Router();

// tourRouter.route('/').get(getAllTours).post(createTour);
// tourRouter.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.use('/api/v1/tours', tourRouter);
// // Users Routes
// const userRouter = express.Router();

// userRouter.route('/').get(getAllUsers).post(createUsers);
// userRouter.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/users', userRouter);

module.exports = app;

// const port = 3000;
// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
