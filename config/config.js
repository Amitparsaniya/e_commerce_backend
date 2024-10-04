import dotenv from "dotenv"
dotenv.config()
const config={
    STRIPE_KEY:process.env.STRIPE_SECRET_KEY,
    DB:process.env.DB
}
export default config
