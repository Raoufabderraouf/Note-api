const { z } = require("zod");
const { UserModel } = require("../db");
const { generateSessionToken } = require("../services/SessionService");
const validate = require("../middlewares/validateMiddleware");

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
    displayName: z.string().min(3).max(32),
  }),
});
const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
  }),
});

module.exports = (app) => {
  app.post(
    `/auth/register`,
    validate(registerSchema),
    async (req, res, next) => {
      try {
        const { email, password, displayName } = req.body;

        const user = new UserModel({
          email,
          password,
          displayName,
        });
        await user.save();
        // TODO: Generate Session Token
        const session = await generateSessionToken(user);

        return res.status(201).json({
          message: `User created`,
          data: {
            user,
            session,
          },
        });
      } catch (e) {
        if (e.code === 11000) {
          return res.status(400).json({
            message: `Email already in use`,
          });
        }
        res.status(500).json({
          message: e.message,
        });
      }
    }
  );

  app.post("/auth/login", validate(loginSchema), async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(404).json({
        message: "This email is not registred",
      });
    }
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // TODO: Generate Session Token
    const session = await generateSessionToken(user);
    return res.status(200).json({
      message: "User logged in",
      data: { user, session },
    });
  });
};
