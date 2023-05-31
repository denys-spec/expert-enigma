const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended: true}))

var fs = require("fs");
let notes_fs = fs.readFileSync("notes.json", "utf-8")
let notes_parsed = JSON.parse(notes_fs)
let notes = Array.from(notes_parsed.notes)
console.log(notes[0].title)

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  notes_fs = fs.readFileSync("notes.json", "utf-8")
  notes_parsed = JSON.parse(notes_fs)
  notes = Array.from(notes_parsed.notes)
  res.render('index', {title: 'NoteApp', message:'Hello there!', notes:notes})
})

var i = 3;

app.post('/', function(req, res) {
  const noteTitle = req.body.notetitle;
  const noteText = req.body.notetext;

  let notes_fs = fs.readFileSync("notes.json", "utf-8")
  let notes_parsed = JSON.parse(notes_fs)
  var dict = {}
  dict['title'] = noteTitle;
  dict['text'] = noteText;
  notes_parsed.notes.push(dict);
  notes_fs = JSON.stringify(notes_parsed)
  fs.writeFileSync("notes.json",notes_fs,"utf-8");

  console.log(noteTitle);

  res.redirect('back');
})

app.listen(port, () => {
  console.log(`Example app running on http://localhost:3000/`)
})