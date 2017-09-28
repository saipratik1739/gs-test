// create data-structure inside getData function and return this data into the application.
export function getData() {
var data = [{
    'questionType': 'singleSelection',
    'questionTitle': 'What is Loram Ispam....',
    'questionDescription': 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
    'choices':[ { 'text': 'Yes', 'score': 1 }, { 'text': 'No', 'score': 2 } ]
  }, {
    'questionType': 'multiSelection',
    'questionTitle': 'Where does it come from?',
    'questionDescription': 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.',
    'choices':[ { 'text': 'Whatever!', 'score': 3 }, { 'text': 'Ohk!!', 'score': 4 }, { 'text': 'Hmmm...Maybe!!', 'score': 5 } , { 'text': 'Yeah!!', 'score': 6 }  ]
  }, {
    'questionType': 'singleSelection',
    'questionTitle': 'Why do we use it?',
    'questionDescription': 'Because, Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy.',
    'choices':[ { 'text': 'True', 'score': 7 }, { 'text': 'False', 'score': 8 } ]
  }, {
    'questionType': 'multiSelection',
    'questionTitle': 'Where can I get some?',
    'questionDescription': 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which do not look even slightly believable.',
    'choices':[ { 'text': 'Paragraphs', 'score': 9 }, { 'text': 'Words', 'score': 10 }, { 'text': 'Byte', 'score': 11 } , { 'text': 'List', 'score': 12 }  ]
  }]
  return data;
}
