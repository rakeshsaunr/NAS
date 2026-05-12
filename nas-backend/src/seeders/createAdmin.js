require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const connectDB = require('../config/db');
const User = require('../models/User');

const run = async () => {
  await connectDB();
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  let user = await User.findOne({ email });
  if (user) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }
  const hash = await bcrypt.hash(password, 10);
  user = await User.create({ name: 'Admin', email, passwordHash: hash, role: 'admin' });
  console.log('Created admin:', user.email);
  process.exit(0);
};

run().catch(err => { console.error(err); process.exit(1); });
