import { config } from "dotenv";
config();

const jwt_secret = process.env.JWT_SECRET;
export default jwt_secret;
