const express = require('express');
const ContactModel = require('@src/models/contact.model');
const debug = require('console-development');
const { body, validationResult } = require('express-validator');

const router = express.Router();
router.get('/:id?', async (req, res) => {
  try {
    const id = req.params.id;
    debug.log('contact list/find');
    if (id) {
      const contact = await ContactModel.findById(id);
      if (!contact) {
        return res.status(404).send('The contact with the given ID was not found.');
      }
      return res.send(contact);
    }
    const contacts = await ContactModel.find();
    return res.send(contacts);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post(
  '/',
  body('name').notEmpty().isLength({ max: 150 }),
  body('email').isEmail().normalizeEmail().isLength({ max: 255 }),
  body('phone').notEmpty().isLength({ max: 11 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      debug.log('contact post');
      const { name, email, phone } = req.body;
      const contact = await ContactModel.create({ name, email, phone });
      return res.send(contact);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
);

router.put(
  '/:id',
  body('name').notEmpty().isLength({ max: 150 }),
  body('email').isEmail().normalizeEmail().isLength({ max: 255 }),
  body('phone').notEmpty().isLength({ max: 11 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
      }
      const id = req.params.id;
      debug.log('contact put');
      const { name, email, phone } = req.body;
      await ContactModel.findOneAndUpdate({ id }, { name, email, phone });
      const contact = await ContactModel.findById(id);
      return res.send(contact);
    } catch (error) {
      return res.status(500).send(error);
    }
  },
);

router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    debug.log('contact delete');
    await ContactModel.deleteOne({ id });
    return res.send('deleted');
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
