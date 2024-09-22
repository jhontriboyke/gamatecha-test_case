const {
  DuplicationError,
  NotFoundError,
} = require("../../errors/customError.js");

const { CAFE_MODELS } = require("../../models/index.js").V1_MODELS;

class CAFE_SERVICES {
  async getCafeByName(name) {
    return await CAFE_MODELS.getCafeByName(name);
  }

  async createCafe(name, address, phoneNumber, managerId) {
    const isCafeExist = await this.getCafeByName(name);

    if (isCafeExist) {
      throw new DuplicationError("Cafe already exist");
    }

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
      const cafes = await CAFE_MODELS.getAllCafe();

      if (cafes.length === 0) {
        throw new NotFoundError("Cafe not found");
      }

      return cafes;
    } catch (error) {
      throw error;
    }
  }

  async getCafe(cafeId) {
    try {
      const cafe = await CAFE_MODELS.getCafe(cafeId);

      if (!cafe) {
        throw new NotFoundError("Cafe not found");
      }

      return cafe;
    } catch (error) {
      throw error;
    }
  }

  async updateCafe(cafeId, cafeObj) {
    try {
      await this.getCafe(cafeId);

      return await CAFE_MODELS.updateCafe(cafeId, cafeObj);
    } catch (error) {
      throw error;
    }
  }

  async deleteCafe(cafeId) {
    try {
      await this.getCafe(cafeId);

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
