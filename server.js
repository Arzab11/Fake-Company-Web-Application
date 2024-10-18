const express = require('express');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = 4131;

let contacts = [];
let next_id = 0;
let message = null;
let active = false;

const auth = basicAuth({
  users: { 'admin': 'password' },
  challenge: true,
  unauthorizedResponse: 'Incorrect username or password',
});


app.use('/css', express.static('resources/css'));
app.use('/js', express.static('resources/js'));
app.use('/images', express.static('resources/images'));


app.set('view engine', 'pug');
app.set('views', 'templates');

app.get('/', (req, res) => res.render('mainpage'));
app.get('/main', (req, res) => res.render('mainpage'));
app.get('/contact', (req, res) => res.render('contactform'));

app.post('/contact', (req, res) => {
  try {
    const form_data = req.body;
    const required_fields = ["name", "email", "response"];
    
    for (const field of required_fields) {
      if (!(field in form_data)) {
        return res.status(400).render('ErrorPage');
      }
    }
    
    if ("yes" in form_data) {
      form_data.checkbox = "Yes";
    } else {
      form_data.checkbox = "No";
    }
    
    form_data.id = next_id;
    next_id += 1;
    
    contacts.push(form_data);
    
    return res.status(201).render('ConfirmationPage');
  } catch (error) {
    return res.status(500).render('ErrorPage');
  }
});
app.get('/testimonies', (req, res) => {
  res.render('testimonies');
});

app.get('/admin/contactlog', auth, (req, res) => {
  res.render('contactlog', { contacts });
});

app.delete('/api/contact', auth, (req, res) => {
  try {
    const { id } = req.body;
    const contactIndex = contacts.findIndex(contact => contact.id === parseInt(id));

    if (contactIndex !== -1) {
      contacts.splice(contactIndex, 1);
      return res.status(200).send('Contact deleted successfully');
    } else {
      return res.status(404).json({ success: false, message: 'Contact not found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.get('/api/sale', (req, res) => {
  if (active) {
    const data = { active: true, message };
    return res.status(200).json(data);
  } else {
    const data = { active: false };
    return res.status(200).json(data);
  }
});

app.post('/api/sale', auth, (req, res) => {
  try {
    const data = req.body;
    
    if (!("message" in data)) {
      return res.status(400).render('error', { message: 'Request body must contain a message' });
    }
    
    message = data.message;
    active = true;
    
    return res.status(200).send('Sale updated');
  } catch (error) {
    return res.status(500).render('error', { message: 'Error' });
  }
});

app.delete('/api/sale', auth, (req, res) => {
  message = null;
  active = false;
  return res.status(200).send('Sale ended');
});

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});