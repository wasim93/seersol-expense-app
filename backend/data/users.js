import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'wasim',
    email: 'wasim@seersol.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'amir',
    email: 'amir@seersol.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'hammad',
    email: 'hammad@seersol.com',
    password: bcrypt.hashSync('123456', 10),
  },
];

export default users;
