const router = require("express").Router();
const { Role } = require("@prisma/client");
const checkRole = require("../../middlewares/checkRole.middleware.js");
const authenticateToken = require("../../middlewares/auth.middleware.js");
const { CAFE_CONTROLLERS } =
  require("../../controllers/index.js").V1_CONTROLLERS;

/**
 * @swagger
 * tags:
 *   name: Cafe
 *   description: API for managing cafes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cafe:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the cafe
 *         address:
 *           type: string
 *           description: The address of the cafe
 *         phoneNumber:
 *           type: string
 *           description: The phone number of the cafe
 *       example:
 *         name: "Cafe Gamatecha"
 *         address: "Malang, Jawa Timur"
 *         phoneNumber: "+62123123123"
 */

/**
 * @swagger
 * /cafe:
 *   get:
 *     summary: Get all cafes
 *     tags: [Cafe]
 *     responses:
 *       200:
 *         description: A list of cafes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "all cafe found"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cafe'
 */

/**
 * @swagger
 * /cafe/{cafeId}:
 *   get:
 *     summary: Get a single cafe by ID
 *     tags: [Cafe]
 *     parameters:
 *       - name: cafeId
 *         in: path
 *         required: true
 *         description: ID of the cafe to retrieve
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A single cafe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "cafe found"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   $ref: '#/components/schemas/Cafe'
 *       404:
 *         description: Cafe not found
 */

/**
 * @swagger
 * /cafe/{cafeId}/menu:
 *   get:
 *     summary: Get all menus from a specific cafe
 *     tags: [Cafe]
 *     parameters:
 *       - name: cafeId
 *         in: path
 *         required: true
 *         description: ID of the cafe
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: A list of menus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "menu found"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "c5cb18d3-96d0-4a9f-8f33-1ab4286226fe"
 *                       name:
 *                         type: string
 *                         example: "Nasi Goreng"
 *                       price:
 *                         type: integer
 *                         example: 15000
 *                       isRecommendation:
 *                         type: boolean
 *                         example: true
 *       404:
 *         description: Cafe not found
 */

/**
 * @swagger
 * /cafe/{cafeId}/menu/{menuId}:
 *   get:
 *     summary: Get a specific menu from a cafe
 *     tags: [Cafe]
 *     parameters:
 *       - name: cafeId
 *         in: path
 *         required: true
 *         description: ID of the cafe
 *         schema:
 *           type: string
 *           format: uuid
 *       - name: menuId
 *         in: path
 *         required: true
 *         description: ID of the menu to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A specific menu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "menu found"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c5cb18d3-96d0-4a9f-8f33-1ab4286226fe"
 *                     name:
 *                       type: string
 *                       example: "Nasi Goreng"
 *                     price:
 *                       type: integer
 *                       example: 15000
 *                     isRecommendation:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T06:43:02.653Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T06:43:02.653Z"
 *                     cafeId:
 *                       type: string
 *                       example: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *       404:
 *         description: Cafe or menu not found
 */

/**
 * @swagger
 * /cafe:
 *   post:
 *     summary: Create a cafe
 *     tags: [Cafe]
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
 *                 description: The name of the cafe
 *               address:
 *                 type: string
 *                 description: The address of the cafe
 *               phoneNumber:
 *                 type: string
 *                 description: The phone number of the cafe
 *               managerId:
 *                 type: string
 *                 description: The user ID of the cafe manager (should be a valid userId)
 *             required:
 *               - name
 *               - address
 *               - phoneNumber
 *               - managerId
 *     responses:
 *       201:
 *         description: Cafe created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "cafe created"
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "a2ac5de2-dda7-4585-ae63-77d650054c2d"
 *                     name:
 *                       type: string
 *                       example: "Cafe Speed"
 *                     address:
 *                       type: string
 *                       example: "Indonesia"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+623091283021"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T10:01:42.984Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T10:01:42.984Z"
 *                     userId:
 *                       type: string
 *                       example: "fc1e4531-91dd-4d10-bb3c-a8b3bc254334"
 *       403:
 *         description: Forbidden, only SuperAdmin and Owner can create cafes
 */

/**
 * @swagger
 * /cafe/{cafeId}:
 *   put:
 *     summary: Update a cafe by ID
 *     tags: [Cafe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cafeId
 *         in: path
 *         required: true
 *         description: ID of the cafe to update
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cafe'
 *     responses:
 *       200:
 *         description: Cafe updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "update cafe success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *                     name:
 *                       type: string
 *                       example: "Gamatecha Cafe"
 *                     address:
 *                       type: string
 *                       example: "Malang, Jawa Timur"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+62123123123"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T06:10:16.855Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T10:29:05.188Z"
 *                     userId:
 *                       type: string
 *                       example: "25d46f38-e88d-4f75-a9c6-b37136cafd6d"
 *       403:
 *         description: Forbidden, only SuperAdmin and Owner can update cafes
 *       404:
 *         description: Cafe not found
 */

/**
 * @swagger
 * /cafe/{cafeId}:
 *   delete:
 *     summary: Delete a cafe by ID
 *     tags: [Cafe]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: cafeId
 *         in: path
 *         required: true
 *         description: ID of the cafe to delete
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Cafe deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "delete cafe success"
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 data:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "Cafe Gamatecha"
 *                     address:
 *                       type: string
 *                       example: "Malang, Jawa Timur"
 *                     phoneNumber:
 *                       type: string
 *                       example: "+62123123123"
 *       403:
 *         description: Forbidden, only SuperAdmin and Owner can delete cafes
 *       404:
 *         description: Cafe not found
 *       500:
 *         description: Something went wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Something went wrong"
 *                 statusCode:
 *                   type: integer
 *                   example: 500
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */

// Get all cafe
router.get("", CAFE_CONTROLLERS.getAllCafe);

// Get single cafe by id
router.get("/:cafeId", CAFE_CONTROLLERS.getCafe);

// Show all menu from specific cafe by its id
router.get("/:cafeId/menu", CAFE_CONTROLLERS.getAllMenuFromCafe);

// Show specific menu by menuId from specific cafe by cafeId
router.get("/:cafeId/menu/:menuId", CAFE_CONTROLLERS.getMenuFromCafe);

// Create cafe
// Only user with role SuperAdmin and Owner can access this
router.post(
  "",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  CAFE_CONTROLLERS.createCafe
);

// edit / update cafe by id
// Only user with role SuperAdmin and Owner can access this
router.put(
  "/:cafeId", // corrected path here
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  CAFE_CONTROLLERS.updateCafe
);

// delete cafe by id
// Only user with role SuperAdmin and Owner can access this
router.delete(
  "/:cafeId", // corrected path here
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  CAFE_CONTROLLERS.deleteCafe
);

module.exports = router;
