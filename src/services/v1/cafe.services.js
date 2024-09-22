const { CAFE_MODELS } = require("../../models/index.js").V1_MODELS;

class CAFE_SERVICES {
  async createCafe(name, address, phoneNumber, managerId) {
    try {
      const cafe = await CAFE_MODELS.createCafe(
        name,
        address,
        phoneNumber,
        managerId
      );
      return cafe;
    } catch (error) {
      throw error;
    }
  }

  async getAllCafe() {
    try {
      return await CAFE_MODELS.getAllCafe();
    } catch (error) {
      throw error;
    }
  }

  async getCafe(cafeId) {
    try {
      return await CAFE_MODELS.getCafe(cafeId);
    } catch (error) {
      throw error;
    }
  }

  async updateCafe(cafeId, cafeObj) {
    try {
      return await CAFE_MODELS.updateCafe(cafeId, cafeObj);
    } catch (error) {
      throw error;
    }
  }

  async deleteCafe(cafeId) {
    try {
      return await CAFE_MODELS.deleteCafe(cafeId);
    } catch (error) {
      throw error;
    }
  }

  async isWorkHere(managerId, cafeId) {
    try {
      const result = await CAFE_MODELS.isWorkHere(managerId, cafeId);
      if (result) {
        return true;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new CAFE_SERVICES();
