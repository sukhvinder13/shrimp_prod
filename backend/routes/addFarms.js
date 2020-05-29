const express = require("express");
const router = express.Router();
const AddFarm = require("../models/addFarm");

// router.get('', async (req, res) => {
//     var getFarm = await AddFarm.find({});
//     res.send(getFarm);
// })
router.get("", (req, res, next) => {
    AddFarm.find().then(documents => {
      res.status(200).json({
        message: "Farms fetched successfully!",
        posts: documents
      });
    });
  });
  
router.post('', (req, res) => {
    // var AddFarmData = req.body;
    // var addFarm = new AddFarm(AddFarmData);
    const addFarm = new AddFarm({
        farmOwner: req.body.farmOwner, farmHistory: req.body.farmHistory,
        village: req.body.village,
        mandal: req.body.mandal, city: req.body.city,
        state: req.body.state, zip: req.body.zip,
        country: req.body.country, noOfTanks: req.body.noOfTanks,
        noOfEmployess: req.body.noOfEmployess
    })
    addFarm.save((err, result) => {
        if (err) {
            console.log("error saving farm.")
            console.log(err.message);
            console.log(err);
            // res.body.send(err);
        }
        res.sendStatus(200);
        console.log("data saved successfully")
    })
})
//delete service
router.delete("/:id", (req, res, next) => {
    AddFarm.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Farm deleted!" });
    });
});

module.exports = router; 