const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
var cors = require('cors');

const app = express();
app.use(cors());

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const imageRouter = require('./routes/image.router');
const orderRouter = require('./routes/order.router');
const emailRouter = require('./routes/email.router');
const emailSettingsRouter = require('./routes/emailSettings.router');
const costRouter = require('./routes/costs.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/image', imageRouter);
app.use('/api/order', orderRouter);
app.use('/api/email', emailRouter);
app.use('/api/emailSettings', emailSettingsRouter);
app.use('/api/cost', costRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
