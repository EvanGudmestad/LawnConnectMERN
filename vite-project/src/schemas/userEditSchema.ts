import { z } from "zod";

const userEditSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(1, "Name is required"),
  role: z.array(z.enum(["customer", "contractor", "admin"])).optional(),
});

export default userEditSchema;
