// import passport from 'passport'
// import passportJwt, { StrategyOptionsWithoutRequest, VerifyCallback } from 'passport-jwt'
// import { db } from '@db/index'
// import { config } from 'dotenv'
// import { users } from '@/db/schema/users'
// import { eq } from 'drizzle-orm'
// config()

// const ExtractJwt = passportJwt.ExtractJwt
// const StrategyJwt = passportJwt.Strategy

// const opt: StrategyOptionsWithoutRequest = {
//   secretOrKey: process.env.SECRET_KEY || 'secret',
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   issuer: 'accounts.examplesoft.com',
//   audience: 'yoursite.net'
// }

// const verify: VerifyCallback = async (jwtPayload, done) => {
//   try {
//     const user = await db.select().from(users).where(eq(users.userId, jwtPayload.userId))
//     if (user) {
//       return done(null, user)
//     }
//     return done(null, false)
//   } catch (error) {
//     return done(error, false)
//   }
// }

// passport.use(new StrategyJwt(opt, verify))
