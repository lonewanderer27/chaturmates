import { Group } from "@/types";
import Joi from "joi";

export const newGroup = Joi.object<Group>({
  name: Joi.string().required(),
  academic_year_id: Joi.number().optional().default(1),
  school: Joi.number().optional().default(1),
  avatar_url: Joi.string().required().uri(),
  cover_url: Joi.string().optional().default(null),
  vanity_url: Joi.string().required(),
  semester: Joi.number().optional().default(1),
  course: Joi.number().optional().default(2),
  description: Joi.string().required(),
});