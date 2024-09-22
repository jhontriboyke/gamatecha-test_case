const router = require("express").Router();
const { Role } = require("@prisma/client");
const checkRole = require("../../middlewares/checkRole.middleware.js");
const authenticateToken = require("../../middlewares/auth.middleware.js");
const { USER_CONTROLLERS } =
  require("../../controllers/index.js").V1_CONTROLLERS;
const {
  validateNewUser,
  validateUpdateUser,
} = require("../../middlewares/validations/user-validation.middleware.js");

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users (Managers and Owners)
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Manager:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the manager
 *         fullName:
 *           type: string
 *           description: Full name of the manager
 *         userName:
 *           type: string
 *           description: Username of the manager
 *         role:
 *           type: string
 *           description: Role of the user (Manager)
 *       example:
 *         id: '605c72b2c19d32001bc1c4a1'
 *         fullName: 'John Doe'
 *         userName: 'john_doe'
 *         role: 'Manager'
 *     Owner:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated ID of the owner
 *         fullName:
 *           type: string
 *           description: Full name of the owner
 *         userName:
 *           type: string
 *           description: Username of the owner
 *         role:
 *           type: string
 *           description: Role of the user (Owner)
 *       example:
 *         id: '605c72b2c19d32001bc1c4a1'
 *         fullName: 'Jane Smith'
 *         userName: 'jane_smith'
 *         role: 'Owner'
 */

/**
 * @swagger
 * /v1/manager:
 *   get:
 *     summary: Get all managers
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all managers
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "get all manager success"
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
 *                         example: "25d46f38-e88d-4f75-a9c6-b37136cafd6d"
 *                       username:
 *                         type: string
 *                         example: "johndoe"
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       role:
 *                         type: string
 *                         example: "Manager"
 *                       cafes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               example: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *                             name:
 *                               type: string
 *                               example: "Cafe Gamatecha"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /v1/manager/{id}:
 *   get:
 *     summary: Get manager by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The manager ID
 *     responses:
 *       200:
 *         description: Manager data by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Manager'
 *       404:
 *         description: Manager not found
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /v1/manager:
 *   post:
 *     summary: Create a new manager
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       201:
 *         description: Manager created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /v1/owner:
 *   post:
 *     summary: Create a new owner
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 description: The username of the owner
 *               fullName:
 *                 type: string
 *                 description: The full name of the owner
 *               password:
 *                 type: string
 *                 description: The password for the owner account
 *             required:
 *               - userName
 *               - fullName
 *               - password
 *     responses:
 *       201:
 *         description: Owner created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Owner created successfully"
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "4bfa58bf-805b-4d6d-96e6-9c930ca41476"
 *                     userName:
 *                       type: string
 *                       example: "owner123"
 *                     fullName:
 *                       type: string
 *                       example: "Owner Name"
 *                     cafes:
 *                       type: array
 *                       items: {}
 *                     role:
 *                       type: string
 *                       example: "Owner"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T06:10:16.855Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T10:29:05.188Z"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /v1/manager/{userId}:
 *   patch:
 *     summary: Update a manager's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manager to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Manager'
 *     responses:
 *       200:
 *         description: Manager updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Manager not found
 */

/**
 * @swagger
 * /v1/owner/{userId}:
 *   put:
 *     summary: Update an owner's information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the owner to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Owner'
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Owner not found
 */

/**
 * @swagger
 * /v1/manager/{userId}:
 *   delete:
 *     summary: Delete a manager
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manager to delete
 *     responses:
 *       200:
 *         description: Manager deleted successfully
 *       404:
 *         description: Manager not found
 *       401:
 *         description: Unauthorized access
 */

// Get all manager
router.get(
  "/manager",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  USER_CONTROLLERS.getAllManager
);

// Get one manager by id
router.get(
  "/manager/:id",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  USER_CONTROLLERS.getManagerById
);

// Create manager
router.post(
  "/manager",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  validateNewUser,
  USER_CONTROLLERS.createUser(Role.Manager)
);

// Create owner
router.post(
  "/owner",
  authenticateToken,
  checkRole([Role.SuperAdmin]),
  validateNewUser,
  USER_CONTROLLERS.createUser(Role.Owner)
);

// Update manager
router.patch(
  "/manager/:userId",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner, Role.Manager]),
  validateUpdateUser,
  USER_CONTROLLERS.updateUser
);

// Update owner
router.patch(
  "/owner/:userId",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner]),
  validateUpdateUser,
  USER_CONTROLLERS.updateUser
);

// Delete manager
router.delete(
  "/manager/:userId",
  authenticateToken,
  checkRole([Role.SuperAdmin, Role.Owner, Role.Manager]),
  USER_CONTROLLERS.deleteUser
);

module.exports = router;
