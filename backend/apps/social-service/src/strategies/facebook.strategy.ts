import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { use } from 'passport';
import 'dotenv/config';

import { ISocial } from '../interfaces/social.interface';

const FacebookTokenStrategy = require('passport-facebook-token');

@Injectable()
export class FacebookStrategy {
  constructor(@Inject('USER_MODEL') private readonly socialModel: Model<ISocial>) {this.init()}

  private init(): void {
    use('facebook', new FacebookTokenStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      profileFields: ['id', 'name', 'displayName', 'emails', 'photos']
    }, async (accessToken: string, refreshToken: string, profile: any, done: Function) => {
      try {

        let email: string = profile.emails.shift().value;
        if (!email || email === '') email = `${profile.id}@${profile.provider}.com`;

        const existingUser: ISocial = await this.socialModel.findOne({ email: email });

        if (existingUser) {
          return done(null, existingUser);
        }
  
        const providerUserProfile = {
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          providerId: `${profile.id}`,
          email: email,
          avatar: (profile.id) ? '//graph.facebook.com/' + profile.id + '/picture?type=large' : undefined,
          provider: 'facebook',
          accessToken,
          refreshToken,
        };

        const socialProfile = new this.socialModel(providerUserProfile);
        
        done(null, await socialProfile.save());
      } catch (err) {
        done(err, null);
      }
    }));
  }
}