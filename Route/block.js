const router = require("express").Router();
const Blocks = require("../models/Blocks")


router.post("/blocks", async (req, res) => {
    console.log(req.body.email);
    const blockList = {
        email: req.body.email,
        blockedName: req.body.blockedName,
        blockedEmail: req.body.blockedEmail
    }
    console.log(blockList);
    try {
        // Create new block
        const newBlock = await new Blocks(blockList);
        //   save and return response
        const newBlockList = await newBlock.save();
        res.status(200).json(newBlockList);
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get("/block-list/:email", async (req, res) => {
    console.log(req.params.email);
    try {
        const block = await Blocks.find({ email: req.params.email });
        !block && res.status(400).json("Block list empty")

        res.status(200).json(block);
        // res.send(user);
    } catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/unblock/:id", async (req, res) => {
    console.log(req.params.id);
    Blocks.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            res.send(result)
        })
})
// router.get("/all-block", async (req, res) => {
//     try {
//         Blocks.find({})
//         .then((result) => {
//           res.send(result)
//         })
//     } catch (err) {
//       console.log(error)
//       res.status(500).json(err);
//     }
//   });
module.exports = router;