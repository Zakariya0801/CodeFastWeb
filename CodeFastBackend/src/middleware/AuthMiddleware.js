const Student = require('../models/UserModel'); // Ensure correct path
const Admin = require('../models/AdminModel'); // Ensure correct path
const Industry = require('../models/IndustryModel'); // Ensure correct path

const jwt = require('jsonwebtoken');
const protect = async (req, res, next) => {
    try {
      // Check if token exists in headers
      const token = req.header("Authorization")?.replace("Bearer ", "");
      if (!token) {
        res
          .status(401)
          .json({ message: "No token, authorization denied" });
        return;
      }
      // console.log(process.env.JWT_SECRET)
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      // Find user from token
      let user = await Student.findById(decoded.id).select("-password");
      if (!user) {
        user = await Admin.findById(decoded.id).select("-password");
        if (!user) {
          user = await Industry.findById(decoded.id).select("-password");
          if (!user) {
              res.status(404).json({ message: "User not found" });
              return;
          }
        }
      }
  
      // Add user to request object
      req.user = user;
      next();
    } catch (error) {
      console.log("error = ", error)
      res.status(401).json({ message: "Token is not valid" });
    }
  };

  module.exports = protect;