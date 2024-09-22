const { USER_MODELS } = require("../../models/index").V1_MODELS;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class USER_SERVICES {
  async findByUsername(username) {
    return await USER_MODELS.findByUsername(username);
  }

  async findById(userId) {
    return await USER_MODELS.findById(userId);
  }

  async createUser(username, fullName, password, role) {
    const user = await this.findByUsername(username);

    if (user) {
      throw new Error("User already exist");
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await USER_MODELS.createUser(
        username,
        fullName,
        hashedPassword,
        role
      );

      delete user.password;

      return user;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(userId, username, fullName, password) {
    const user = await this.findById(userId);

    if (!user) {
      throw Error("User not found");
    }

    try {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      console.log(password);
      const hashedPassword = await bcrypt.hash(password, salt);

      return await USER_MODELS.updateUser(userId, {
        username,
        fullName,
        password: hashedPassword,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(userId) {
    const user = await this.findById(userId);

    if (!user) {
      throw Error("User not found");
    }

    try {
      return await USER_MODELS.deleteUser(userId);
    } catch (error) {
      throw error;
    }
  }

  async getAllManager() {
    try {
      return await USER_MODELS.getAllManager();
    } catch (error) {
      throw error;
    }
  }

  async getManagerById(id) {
    try {
      return await USER_MODELS.getManagerById(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new USER_SERVICES();
