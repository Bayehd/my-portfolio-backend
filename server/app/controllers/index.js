

module.exports.hello = function (req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send('Hello World!');
}

// function goodbye(req, res, next){
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Goodbye!');
// }

// function notfound(req, res, next){
//     res.setHeader('Content-Type', 'text/plain');
//     res.send('Page Not Found');
// }
