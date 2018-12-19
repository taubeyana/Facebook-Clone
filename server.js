const http = require('http');

let app = http.createServer((req, res) => {
  console.log(req.url);
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
    
  });
  let resObject = {
    posts: [
      {
        user: {
          firstName: 'Yana',
          lastName: 'Taube',
          image: 'img/userpic.jpg',
          name: 'Yana Taube',
          id: 3
        },
        message: "Lorem ipsum dolor sit amet, ne mundi aperiam delicata usu, oratio accusata cu ius. Semper fierent no vix. Odio expetenda cu per, te usu omnes decore admodum.  ",
        lang: 'heb',
        likes: 5
      },
      {
        user: {
          firstName: 'Slava',
          lastName: 'Rozman',
          image: 'img/slava.jpg',
          name: 'Slava Rozman'
        },
        message: "Lorem ipsum dolor sit amet, ne mundi aperiam delicata usu, oratio accusata cu ius. Semper fierent no vix. Odio expetenda cu per, te usu omnes decore admodum. ",
        lang: '',
        likes: 10
      }
    ]
  };
  
  res.end(JSON.stringify(resObject));
});

app.listen(3000, '127.0.0.1');
console.log('Server is running');