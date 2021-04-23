const express = require("express");
const router = express.Router();
const Person = require("../models/Person");

//     GET :  RETURN ALL USERS

router.get("/", async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).send({ msg: "All contacts", persons });
    } catch (error) {
        res.status(500).send("impossible to get persons");
    }
});

//   POST :  ADD A NEW USER TO THE DATABASE

router.post("/", async (req, res) => {
    try {
        const { name, age, favoriteFoods } = req.body;
        if (!name) {
            return res.status(400).send("name is required");
        }
        const person = new Person({ name, age, favoriteFoods });
        await person.save();
        res.status(200).send({ msg: "person added", person });
    } catch (error) {
        res.status(500).send("error");
    }
});

//       PUT : EDIT A USER BY ID

router.put("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findOneAndUpdate(
            { _id: id },
            { $set: { name: "John", age: 40 } }
        );
        res.status(200).send({ msg: "person updated", person });
    } catch (error) {
        res.status(500).send("impossible to update person");
    }
});

//       DELETE : REMOVE A USER BY ID

router.delete("/:Id", async (req, res) => {
    try {
        const id = req.params.Id;
        const person = await Person.findByIdAndRemove({ _id: id });

        res.status(200).send({ msg: "person deleted", person });
    } catch (error) {
        res.status(500).send("impossible to delete person");
    }
});

module.exports = router;
