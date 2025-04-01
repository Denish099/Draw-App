import { config } from "dotenv";
config();

const jwt_secret = process.env.JWT_SECRET;
const node_env = process.env.NODE_ENV;
export { jwt_secret, node_env };
