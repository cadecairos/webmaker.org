module.exports.form = function( req, res ) {
  res.render( "publish.html", {
    email: req.query.email,
    url: req.query.url,
    title: req.query.title,
    description: req.query.description,
    contentType: req.query.contentType
  });
};

module.exports.publisher = function( req, res ) {
  var make = require("../lib/makeapi");
  if ( !req.session.email ) {
    res.send( 401 );
  }
console.log( req.session.email );
console.log( JSON.stringify( req.body, null, 2 ) );
  make.create({
    email: req.session.email,
    url: req.body.url,
    title: req.body.title,
    description: req.body.description,
    contentType: req.body.contentType
  }, function( err, make ) {
    res.render( "publish.html", {
      status: "success",
      url: make.url
    });
  });
};
