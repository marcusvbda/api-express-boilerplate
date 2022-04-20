const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: 'string',
  email: 'string',
  phone: 'string',
});
const Contact = mongoose.model('Contact', schema);
module.exports = Contact;
