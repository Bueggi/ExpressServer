const Joi = require('joi')
const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.use(express.json());

const courses = [
  {id : 1, name :  'Lernen fuer Anfaenger'},
  {id : 2, name :  'Keiner interessiert sich fuer deinen Scheiss'},
  {id : 3, name :  'Wie ich weniger Leute nerve'}
]

app.get('/', (req, res) => {
  console.log(req.body);
  res.send();
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send(`Course ${req.params.id} not found`);
  res.send(course);
});


app.post('/api/courses', (req, res) => {
  const schema = {
    name: Joi.string().min(3).required()
  }

  Joi.validate(req.body, schema);

  const course = {id : courses.length + 1, name : req.body.name};
  courses.push(course);
  res.send(course);
});

app.listen(port, () => console.log('Server running'));