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
 * /menu:
 *   get:
 *     summary: Get all menu items
 *     tags: [Menu]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all menu items found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response
 *                 message:
 *                   type: string
 *                   description: A message indicating success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Auto-generated ID of the menu item
 *                       name:
 *                         type: string
 *                         description: Name of the menu item
 *                       price:
 *                         type: integer
 *                         description: Price of the menu item
 *                       isRecommendation:
 *                         type: boolean
 *                         description: Whether the menu item is recommended
 *               example:
 *                 statusCode: 200
 *                 message: "all menu found"
 *                 data:
 *                   - id: "c5cb18d3-96d0-4a9f-8f33-1ab4286226fe"
 *                     name: "Nasi Goreng"
 *                     price: 15000
 *                     isRecommendation: true
 *                   - id: "fec7cc01-98be-461d-bdda-4ce47c6dae7d"
 *                     name: "Bakso"
 *                     price: 12000
 *                     isRecommendation: false
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /menu/{menuId}:
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
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response
 *                 message:
 *                   type: string
 *                   description: A message indicating the menu item was found
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Auto-generated ID of the menu item
 *                     name:
 *                       type: string
 *                       description: Name of the menu item
 *                     price:
 *                       type: integer
 *                       description: Price of the menu item
 *                     isRecommendation:
 *                       type: boolean
 *                       description: Whether the menu item is recommended
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the menu item
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The last updated timestamp of the menu item
 *                     cafeId:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the cafe the menu belongs to
 *               example:
 *                 statusCode: 200
 *                 message: "menu found"
 *                 data:
 *                   id: "c5cb18d3-96d0-4a9f-8f33-1ab4286226fe"
 *                   name: "Nasi Goreng"
 *                   price: 15000
 *                   isRecommendation: false
 *                   createdAt: "2024-09-22T06:43:02.653Z"
 *                   updatedAt: "2024-09-22T14:16:34.053Z"
 *                   cafeId: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *       404:
 *         description: Menu item not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /menu:
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
 * /menu/{menuId}:
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
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the menu item
 *               price:
 *                 type: integer
 *                 description: Price of the menu item
 *               isRecommendation:
 *                 type: boolean
 *                 description: Whether the menu item is recommended
 *             example:
 *               name: "Nasi Goreng"
 *               price: 15000
 *               isRecommendation: false
 *     responses:
 *       200:
 *         description: Menu item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response
 *                 message:
 *                   type: string
 *                   description: A message indicating the menu item was updated
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Auto-generated ID of the menu item
 *                     name:
 *                       type: string
 *                       description: Name of the menu item
 *                     price:
 *                       type: integer
 *                       description: Price of the menu item
 *                     isRecommendation:
 *                       type: boolean
 *                       description: Whether the menu item is recommended
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the menu item
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The last updated timestamp of the menu item
 *                     cafeId:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the cafe the menu belongs to
 *               example:
 *                 statusCode: 200
 *                 message: "menu updated"
 *                 data:
 *                   id: "c5cb18d3-96d0-4a9f-8f33-1ab4286226fe"
 *                   name: "Nasi Goreng"
 *                   price: 15000
 *                   isRecommendation: false
 *                   createdAt: "2024-09-22T06:43:02.653Z"
 *                   updatedAt: "2024-09-22T14:16:34.053Z"
 *                   cafeId: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Menu item not found
 */

/**
 * @swagger
 * /menu/{menuId}:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   description: The status code of the response
 *                 message:
 *                   type: string
 *                   description: A message indicating the menu item was deleted
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID of the deleted menu item
 *                     name:
 *                       type: string
 *                       description: Name of the deleted menu item
 *                     price:
 *                       type: integer
 *                       description: Price of the deleted menu item
 *                     isRecommendation:
 *                       type: boolean
 *                       description: Whether the deleted menu item was recommended
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: The creation timestamp of the deleted menu item
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: The last updated timestamp of the deleted menu item
 *                     cafeId:
 *                       type: string
 *                       format: uuid
 *                       description: ID of the cafe the deleted menu belonged to
 *               example:
 *                 statusCode: 200
 *                 message: "menu deleted"
 *                 data:
 *                   id: "c5cb18d3-96d0-4a9f-8f33-1ab4286226fe"
 *                   name: "Nasi Goreng"
 *                   price: 15000
 *                   isRecommendation: false
 *                   createdAt: "2024-09-22T06:43:02.653Z"
 *                   updatedAt: "2024-09-22T14:16:34.053Z"
 *                   cafeId: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *       404:
 *         description: Menu item not found
 *       401:
 *         description: Unauthorized access
 */

// Get all menu
router.get("", MENU_CONTROLLERS.getAllMenu);

// Get single menu by id
router.get("/:menuId", MENU_CONTROLLERS.getMenuById);

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
