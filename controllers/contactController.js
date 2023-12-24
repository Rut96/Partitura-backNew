const Contact = require('../models/Contact');

exports.contact_get_all = async (req, res) => {
    const contacts = await Contact.find();
    res.json(contacts);
};

exports.contact_get_byId = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.json(contact);
};

exports.contact_create_new = async (req, res) => {
  const { name, email, msg } = req.body;
    const contact = new Contact({
      contactName: name, contactEmail: email, contactMsg: msg
    });
    await contact.save();
    res.json(contact);
};

exports.contact_update = async (req, res) => {
  const { name, email, msg } = req.body;
    const contact = await Contact.findByIdAndUpdate(req.params.id, {
      contactName: name, contactEmail: email, contactMsg: msg
    }, { new: true });
    if (!contact) {
      return res.status(404).send('Contact not found');
    }
    res.json(contact);
};

exports.contact_delete = async (req, res) => {
  console.log(req.body);
  let id = req.body.id;
  await Contact.findByIdAndDelete({_id: id});   
  contact = await Contact.find()
  console.log(contact);
  if (!contact) {
    return res.status(404).send('Contact not found');
  }
  res.json(contact);
};