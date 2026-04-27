import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import Users from "../models/Users.models.js";
import Weeks from "../models/Weeks.models.js";
import Activity from "../models/Activity.models.js";


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "https://daily-timetable-planner-fullstack.onrender.com/auth/google/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await Users.findOne({ googleid: profile.id });

        if (!user) {
          user = await Users.create({
            googleid: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value
          });
          const sampleWeek = await Weeks.find({email:"allNew"});
          const {_id,...newWeek}=sampleWeek;
          newWeek.email=profile.emails[0].value;
          await Weeks.insertOne(newWeek);
          const SampleAct = await Activity.find({email:"allNew"});
          const newActs = SampleAct.map(act => {
            const { _id, ...rest } = act; // remove _id
            return {
              ...rest,
              email: profile.emails[0].value
            };
          });
          await Activity.insertMany(newActs);
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user,done)=>{
  done(null,user.googleid);
});

passport.deserializeUser(async (id,done)=>{
  try{
    const user=await Users.findOne({googleid:id});
    done(null,user);
  }
  catch(err){
    done(err,null);
  }
});

export default passport;