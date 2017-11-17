var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

var mongoose = require("mongoose");
var Picture = mongoose.model("Picture");

router.get("/pictures", function (req, res, next) {
  Picture.find(function (err, pictures) {
    if (err) {
      return next(err);
    }
    res.json(Pictures);
  });
});

router.post("/pictures", function (req, res, next) {
  var picture = new Picture(req.body);
  console.log(picture);
  picture.save(function (err, picture) {
    if (err) {
      return next(err);
    }
    res.json(picture);
  });
});

router.param("picture", function (req, res, next, id) {
  var query = Picture.findById(id);
  query.exec(function (err, picture) {
    if (err) {
      return next(err);
    }
    if (!picture) {
      return next(new Error("can't find picture"));
    }
    req.picture = picture;
    return next();
  });
});

router.get("/pictures/:picture", function (req, res) {
  res.json(req.picture);
});

router.put("/pictures/:picture/upvote", function (req, res, next) {
  req.picture.upvote(function (err, picture) {
    if (err) {
      return next(err);
    }
    res.json(picture);
  });
});

router.delete("/pictures/:picture", function (req, res) {
  console.log("in Delete");
  req.picture.remove();
  res.sendStatus(200);
});

module.exports = router;