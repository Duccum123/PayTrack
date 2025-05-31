const User = require('../models/Users');
const jwt = require('jsonwebtoken');
const { generateAccessToken, generateRefreshToken } = require('../utils/generateToken');
const Employee = require('../models/Employees');
const AppError = require('../utils/AppError');

class UserController {
  // Đăng nhập
  static async login(req, res) {
    const { username, password } = req.body;
    if(!username || !password) {
      throw new AppError("Thiếu thông tin đăng nhập", 400);
    }
    const user = await User.findOne({ username });
    if(!user) {
      throw new AppError("Người dùng không tồn tại", 404);
    }
    const isMatch = await user.matchPassword(password);
    if(!isMatch) {
      throw new AppError("Mật khẩu không đúng", 401);
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.status(200).json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  }
  // Đăng ký - chỉ admin
  static async register(req, res) {
    console.log('Registering user:', req.body);
    const { username, password, role } = req.body;
    if(!username || !password || !role) {
      throw new AppError("Thiếu thông tin đăng ký", 400);
    }
    const existingUser = await User.findOne({ username });
    if(existingUser) {
      throw new AppError("Tên người dùng đã tồn tại", 400);
    }
      const newUser = new User({
      username,
      password,
      role,
      });
      await newUser.save();

      const accessToken = generateAccessToken(newUser);
      const refreshToken = generateRefreshToken(newUser);

      res.status(201).json({
        accessToken,
        refreshToken,
        user: {
          id: newUser._id,
          username: newUser.username,
          role: newUser.role,
        },
      });
  }

  // Refresh token
  static async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new AppError("Thiếu refresh token", 400);
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    if (!decoded) {
      throw new AppError("Refresh token không hợp lệ", 401);
    }
    const user = await User.findById(decoded.id);
    if (!user) {
      throw new AppError("Người dùng không tồn tại", 404);
    }
    const accessToken = generateAccessToken(user);
    res.status(200).json({
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  }

  // Get all users
  static async getAllUsers(req, res) {
    const users = await User.find().populate('employeeId');
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'No users found' });
    }
    res.status(200).json(users);
  }
  static async getUsersByMangerId(req, res) {
    const { id } = req.params
    if (!id) {
      throw new AppError("Không có managerId", 400);
    }
    const employees = await Employee.find({ managerId: id }).select('_id');
    if (!employees || employees.length === 0) {
      throw new AppError("Không tìm thấy nhân viên theo managerId", 404);
    }
    const employeeIds = employees.map(emp => emp._id);
    console.log('Employee IDs:', employeeIds);
    const users = await User.find({ employeeId: { $in: employeeIds } }).populate('employeeId');
    if (!users || users.length === 0) {
      throw new AppError("Không tìm thấy người dùng theo managerId", 404);
    }
    users.push(await User.findById(id));
    res.status(200).json(users);
  }

  // Get user by ID
  static async getUserById(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có userId", 400);
    }
    const user = await User.findById(id).populate('employeeId');
    if (!user) {
      throw new AppError("Không tìm thấy người dùng theo Id", 404);
    }
    res.status(200).json(user);
  }

  // Get user by username
  static async getUserByUsername(req, res) {
    const { username } = req.params;
    if(!username) {
      throw new AppError("Không có username", 400);
    }
    const user = await User.findByUsername(username);
    if (!user) {
      throw new AppError("Không tìm thấy người dùng theo username", 404);
    }
    res.status(200).json(user);
  }

  // Create new user
  static async createUser(req, res) {
    const { username, password, role, employeeId } = req.body;
    if(!username || !password || !role || !employeeId) {
      throw new AppError("Thiếu thông tin đăng ký người dùng", 400);
    }
    const existingUserByUsername = await User.findOne({ username });
    if(existingUserByUsername) {
      throw new AppError("Tên người dùng đã tồn tại", 400);
    }
    const existingUserByEmployee = await User.findOne({ employeeId });
    if(existingUserByEmployee) {
      throw new AppError("Đã tồn tại người dùng cho id nhân viên này", 400);
    }
    const newUser = new User({
      username,
      password,
      role,
      employeeId,
    });
    await newUser.save();
    res.status(201).json(newUser);
  }

  // Update user
  static async updateUser(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có userId", 400);
    }
    const { username, password, role, employeeId } = req.body;
    if(!username || !password || !role || !emplooyeeId) {
      throw new AppError("Thiếu thông tin cập nhật người dùng", 400);
    }
    const updatedUser = await User.findByIdAndUpdate(id, {
      username,
      password,
      role,
      employeeId,
    }, { new: true }).populate('employeeId');
    if (!updatedUser) {
      throw new AppError("Không tìm thấy người dùng theo Id", 404);
    }
    res.status(200).json(updatedUser);
  }

  // Delete user
  static async deleteUser(req, res) {
    const { id } = req.params;
    if(!id) {
      throw new AppError("Không có userId", 400);
    }
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new AppError("Không tìm thấy người dùng theo Id", 404);
    }
    res.status(200).json({ message: "Xóa thành công người dùng" });
  }
}

module.exports = UserController;
