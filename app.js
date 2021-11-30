const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();

const { corsOptions } = require('./cors');
const {
  authRoutes, departmentRoutes, deviceRoutes, userRoutes
} = require('./routes');
const {
  constants: { ENV, PORT }, db, httpStatusCodes
} = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (ENV === 'dev') {
  app.use(cors({
    origin: '*',
  }));
} else {
  app.use(cors(corsOptions));
}

app.use('/api/auth', authRoutes);
app.use(deviceRoutes);
app.use(userRoutes);
app.use('/api/departments', departmentRoutes);

app.use(_MainErrorHandler);

mongoose.connect(db.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => {
    console.log('Connection to MongoDB successfully!');
  });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server has been started on port ${PORT} `);
});

// eslint-disable-next-line no-unused-vars
function _MainErrorHandler(err, req, res, next) {
  res
    .status(err.status || httpStatusCodes.Internal_Server_Error)
    .json({
      message: (err.message || 'Unknown err')
    });
}
