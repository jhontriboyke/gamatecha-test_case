const router = require("express").Router();
const { Role } = require("@prisma/client");
const checkRole = require("../../middlewares/checkRole.middleware.js");
const authenticateToken = require("../../middlewares/auth.middleware.js");
const { MENU_CONTROLLERS } =
  require("../../controllers/index.js").V1_CONTROLLERS;

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: API for managing menu items
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the menu item
 *         name:
 *           type: string
 *           description: Name of the menu item
 *         price:
 *           type: number
 *           format: float
 *           description: Price of the menu item
 *         isRecommended:
 *           type: boolean
 *           description: Whether the menu item is recommended
 *         cafeId:
 *           type: string
 *           format: uuid
 *           description: ID of the cafe the menu belongs to
 *       example:
 *         id: '605c72b2c19d32001bc1c4a1'
 *         name: 'Coffee'
 *         price: 3.50
 *         isRecommended: true
 *         cafeId: '4bfa58bf-805b-4d6d-96e6-9c930ca41476'
 */

/**
 * @swagger
 * /v1/menu/{menuId}:
 *   get:
 *     summary: Get menu by ID
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu item
 *     responses:
 *       200:
 *         description: Menu item data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Menu'
 *       404:
 *         description: Menu item not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /v1/menu:
 *   post:
 *     summary: Create a new menu item
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the menu item
 *               price:
 *                 type: number
 *                 format: float
 *                 description: Price of the menu item
 *               isRecommended:
 *                 type: boolean
 *                 description: Whether the menu item is recommended
 *               cafeId:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the cafe the menu belongs to
 *             required:
 *               - name
 *               - price
 *               - isRecommended
 *               - cafeId
 *     responses:
 *       201:
 *         description: Menu item created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /v1/menu/{menuId}:
 *   put:
 *     summary: Update a menu item by ID
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu item to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Menu'
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /v1/menu/{menuId}:
 *   delete:
 *     summary: Delete a menu item by ID
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: menuId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the menu item to delete
 *     responses:
 *       200:
 *         description: Menu item deleted successfully
 *       404:
 *         description: Menu item not found
 *       401:
 *         description: Unauthorized access
 */

// Get single menu by id
router.get(
  "/:menuId",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner, Role.Manager]),
  MENU_CONTROLLERS.getMenuById
);

// Create menu
router.post(
  "",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner, Role.Manager]),
  MENU_CONTROLLERS.createMenu
);

// Update menu by id
router.put(
  "/:menuId",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner, Role.Manager]),
  MENU_CONTROLLERS.updateMenu
);

// Delete menu by id
router.delete(
  "/:menuId",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner, Role.Manager]),
  MENU_CONTROLLERS.deleteMenu
);

module.exports = router;
