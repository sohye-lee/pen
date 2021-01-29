import passport from 'passport';
import PassportLocal from 'passport-local';
import PassportJwt from 'passport-jwt';
import jwt from 'jsonwebtoken';
import FacebookTokenStrategy from 'passport-facebook-token';

const LocalStrategy = PassportLocal.Strategy;
const JwtStrategy = PassportJwt.Strategy;
const ExtractJwt = PassportJwt.ExtractJwt;

