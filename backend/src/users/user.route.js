const express = require("express");
const User = require("./user.model");
const generateToken = require("./middleware/genarateToken");
const verifyToken = require("./middleware/verifyToken");

const router = express.Router();

// register endpoint
// router.get('/', async (req, res) => {
//      res.send('this is registation routes')
// })
//register for first time
router.post("/register", async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = new User({ email, userName, password })
  ;
    await user.save();
    res.status(201).send({ message: "user registered successfully" });
  } catch (error) {
    console.error("error registering user", error);
    res.status(500).send({ message: "error registering user" });
  }
});

//login user end points
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).send({ message: "password not match" });
    }
    //generate token
    const token = await generateToken(user.id);
    // console.log(token)
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    });

    res.status(200).send({
      message: "logged in successfully",
      token,
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        role: user.role,
        profileImg: user.profileImg,
        bio: user.bio,
        profession: user.profession,
      },
    });
  } catch (error) {
    console.error("error logged user", error);
    res.status(500).send({ message: "error logged user" });
  }
});
//to get all users in our database
router.get("/all", async (req, res) => {
  try {
    const users = await User.find({}, "userName email role").sort({
      createdAt: -1,
    }); // sort by newest first

    if (!users.length) {
      return res.status(404).json({ message: "no users are found/ register" });
    }
    res.status(200).json({ users });
  } catch (error) {
    console.error("error all user access", error);
    res.status(500).send({ message: "error all user access" });
  }
});

router.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.status(200).send({
    messsage: "logged out successfully",
  });
});
//  to delete one by one by their id
router.delete("/delete/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deletedId = await User.findByIdAndDelete(userId);
    if (!deletedId) {
      return res.status(404).json({ message: "user not found" });
    }
    res.status(200).json({
      message: "user deleted successfully ",
      user: {
        userName: deletedId.userName, // insted to show all info it show this two user info
        email: deletedId.email,
      },
    });
  } catch (error) {
    console.error("error deleting user", error);
    res.status(500).send({ message: "error deleting user" });
  }
});
//delete all user at once
router.delete("/delete-all", async (req, res) => {
  try {
    const deleteAll = await User.deleteMany({});
    if (!deleteAll.deletedCount === 0) {
      res.status(404).json({ message: "no users found before" });
    }
    res.status(202).json({
      message: `${deleteAll.deletedCount} users are deleted successfuly`,
    });
  } catch (error) {
    console.error("error deleting all user", error);
    res.status(500).send({ message: "error deleting all user" });
  }
});

//udate role of users use patch to update some shcema if need to up date all use put

router.patch("/update-role/:id", async (req, res) => {
  try {
    const updaterUserId = req.params.id; // get user id from the url
    const { role } = req.body; //get the new role from the request body

    // Validate the role (optional, but a good practice)
    const validRoles = ["admin", "user", "moderator"];
    if (!validRoles.includes(role)) {
      return res.status(400).json({ message: "invalid role" });
    }

    // Find the user by ID and update the role
    const updatedUser = await User.findByIdAndUpdate(
      updaterUserId,
      { role: role },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({
      message: "user role updated successfully",
      user: {
        userName: updatedUser.userName,
        email: updaterUserId.email,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("error role updater", error);
    res.status(500).send({ message: "error role updater" });
  }
});
 // update the user profile like bio, profle image , and other in one
router.patch("/edit-profile", async (req, res) => {
  try {
    const { userId, userName, profileImg, bio, profession } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "user ID is required" });
    }
    const user = await User.findById(userId);
      // console.log(user);
      if (!user) {
        return res.status(400).json({ message: "user not found" });
      }

    //update profile
    if (userName !== undefined) user.userName = userName;
    if (profileImg !== undefined) user.profileImg = profileImg;
    if (bio !== undefined) user.bio = bio;
    if (profession !== undefined) user.profession = profession;
    await user.save();

    res.status(200).send({
      message: "profile updated succesfully",
      user: {
        id: user.id,
        email: user.email,
        userName: user.userName,
        role: user.role,
        profileImg: user.profileImg,
        bio: user.bio,
        profession: user.profession,
      },
    });

    
  } catch (error) {
    console.error("error profile update", error);
    res.status(500).send({ message: "error profile update" });
  }
});

//all users
router.get("/users", verifyToken, async (req, res) => {
  res.send({ message: "protected users" });
});

module.exports = router;
