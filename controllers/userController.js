const User = require("../models/User");
const { isValid } = require("mongoose").Types.ObjectId;
const { signInError } = require("../errors/errors");
const { verify } = require("jsonwebtoken");

class UserController {
  static async getAllUsers(req, res) {
    try {
      const users = await User.find()
        .select("-password")
        .sort({"createdAt":-1});
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(err);
    }
  }

  static async addUser(req, res) {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      };
      const newUser = await User.create(user);
      res.status(201).json(newUser._id);
    } catch (err) {
      const errors = signInError(err);
      res.status(500).json(errors);
    }
  }

  static async editUser(req, res) {
    try {
      const { id } = req.params;
      if (isValid(id)) {
        const user = await User.findById(id);
        if (user) res.status(200).json(user);
        else res.status(404).json("user not found");
      } else {
        res.status(400).json({ error: "invalid id from edit method" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, avatar, followers, followings, likes } = req.body;
      console.log("name :", name);
      console.log("email :", email);
      const user = await User.findByIdAndUpdate({ _id: id }, { name, email });
      console.log("updated data", user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async removeUser(req, res) {
    try {
      const { id } = req.params;
      if (isValid(id)) {
        const user = await User.findByIdAndDelete(id);
        if (user) res.status(200).json(user);
        else res.status(404).json("user dont found");
      } else {
        res.status(400).json({ error: "invalid id from removeuser methode" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async follow(req, res) {
    try {
      const { id } = req.params;
      if (!isValid(id))
        return res.status(400).json("bad request id follower incorect");
        const follower = await User.findOneAndUpdate(
        { _id: id },
        {$addToSet: { following: req.user_id }}
      );
     
      const following = await User.findOneAndUpdate(
        { _id: req.user_id },
        { $addToSet: { followers: id}}
      );

      return res.end();
    } catch (error) {
      console.log(error)
    }
  }

  static async unfollow(req, res) {
    try {
      const { id } = req.params;
      if (!isValid(id))
        return res.status(400).json("bad request id follower incorect");
        const follower = await User.findOneAndUpdate(
          { _id: id },
          { $pull: {following: req.user_id}},
          { new: true, upsert: true}
        );      
      const following = await User.findOneAndUpdate(
        { _id: req.user_id },
        { $pull: { followers: id } },
        { new: true, upsert:true},
      );

      return res.end();
    } catch (error) {
      console.log(error)
    }
  }
}



module.exports = UserController;
