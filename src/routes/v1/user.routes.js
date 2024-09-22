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

 */

/**
 * @swagger
 * /user/manager:
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
 * /user/manager/{id}:
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
 *         description: Manager found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "manager found"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "25d46f38-e88d-4f75-a9c6-b37136cafd6d"
 *                     username:
 *                       type: string
 *                       example: "johndoe"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$4mOSYf5BWznv1otLKxyibeN2RVb7TmF5GrYkP9lwyq6jICDu3V9PS"
 *                     role:
 *                       type: string
 *                       example: "Manager"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T04:38:59.825Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T04:38:59.825Z"
 *       404:
 *         description: Manager not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "manager not found"
 *                 data:
 *                   type: object
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/manager:
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
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the manager
 *               fullName:
 *                 type: string
 *                 description: The full name of the manager
 *               password:
 *                 type: string
 *                 description: The password for the manager account
 *             required:
 *               - username
 *               - fullName
 *               - password
 *     responses:
 *       201:
 *         description: Manager created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "user created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c17aec8d-64a4-4583-bba3-65123bd10398"
 *                     username:
 *                       type: string
 *                       example: "jhontriboyke"
 *                     fullName:
 *                       type: string
 *                       example: "Jhontri Boyke"
 *                     role:
 *                       type: string
 *                       example: "Manager"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       property:
 *                         type: string
 *                         example: "username"
 *                       message:
 *                         type: string
 *                         example: "username required"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/owner:
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
 *               username:
 *                 type: string
 *                 description: The username of the owner
 *               fullName:
 *                 type: string
 *                 description: The full name of the owner
 *               password:
 *                 type: string
 *                 description: The password for the owner account
 *             required:
 *               - username
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
 *                 statusCode:
 *                   type: integer
 *                   example: 201
 *                 message:
 *                   type: string
 *                   example: "user created"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c17aec8d-64a4-4583-bba3-65123bd10398"
 *                     username:
 *                       type: string
 *                       example: "jhontriboyke"
 *                     fullName:
 *                       type: string
 *                       example: "Jhontri Boyke"
 *                     role:
 *                       type: string
 *                       example: "Owner"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Validation error"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       property:
 *                         type: string
 *                         example: "username"
 *                       message:
 *                         type: string
 *                         example: "username required"
 *       401:
 *         description: Unauthorized access
 */

/**
 * @swagger
 * /user/manager/{userId}:
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
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the manager
 *               fullName:
 *                 type: string
 *                 description: The full name of the manager
 *               password:
 *                 type: string
 *                 description: The password for the manager account
 *             required:
 *               - password
 *     responses:
 *       200:
 *         description: Owner updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "user updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c17aec8d-64a4-4583-bba3-65123bd10398"
 *                     username:
 *                       type: string
 *                       example: "jboyke"
 *                     fullName:
 *                       type: string
 *                       example: "Jhontri Boyke"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$TBDcyWVimbMKoLg89qZ9KOhdsGpjnWpNeP3iGcEdk9gD2nwYeR71O"
 *                     role:
 *                       type: string
 *                       example: "Manager"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:48:10.959Z"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Manager not found
 */

/**
 * @swagger
 * /user/owner/{userId}:
 *   patch:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "user updated"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c17aec8d-64a4-4583-bba3-65123bd10398"
 *                     username:
 *                       type: string
 *                       example: "jboyke"
 *                     fullName:
 *                       type: string
 *                       example: "Jhontri Boyke"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$TBDcyWVimbMKoLg89qZ9KOhdsGpjnWpNeP3iGcEdk9gD2nwYeR71O"
 *                     role:
 *                       type: string
 *                       example: "Owner"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:48:10.959Z"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized access
 *       404:
 *         description: Owner not found
 */

/**
 * @swagger
 * /user/manager/{userId}:
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
 *         description: Owner deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: "user deleted"
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "c17aec8d-64a4-4583-bba3-65123bd10398"
 *                     username:
 *                       type: string
 *                       example: "jboyke"
 *                     fullName:
 *                       type: string
 *                       example: "Jhontri Boyke"
 *                     password:
 *                       type: string
 *                       example: "$2b$10$TBDcyWVimbMKoLg89qZ9KOhdsGpjnWpNeP3iGcEdk9gD2nwYeR71O"
 *                     role:
 *                       type: string
 *                       example: "Manager"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:26:45.769Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-09-22T13:48:10.959Z"
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
