const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

const encryptPassword = (password) => {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

  return bcrypt.hashSync(password, salt);
};

const comparePassword = (candidatePassword, storedPassword) => {
  return bcrypt.compareSync(candidatePassword, storedPassword);
};

module.exports = {
  encryptPassword,
  comparePassword,
};
