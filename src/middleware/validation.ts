import Joi from "joi";
import { SignupRequest } from "../controllers/user/signup.js";
import { SignInBody } from "../controllers/user/signin.js";
import { CreateCommunityRequest } from "../controllers/community/createCommunity.js";

export const validateAddRole = (role: AddRoleRequest) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
  });
  const { error } = schema.validate(role);
  if (error) throw error;
};
export const validateSingup = (signupRequest: SignupRequest) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .message(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
      ),
  });
  const { error } = schema.validate(signupRequest);
  if (error) throw error;
};

export const validateSingin = (signinRequest: SignInBody) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string()
      .required()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
        )
      )
      .message(
        "Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character."
      ),
  });
  const { error } = schema.validate(signinRequest);
  if (error) throw error;
};

export const validateAddCommunity = (community: CreateCommunityRequest) => {
  const schema = Joi.object({
    name: Joi.string().min(2).required(),
  });
  const { error } = schema.validate(community);
  if (error) throw error;
};

export type AddRoleRequest = {
  name: string;
};
