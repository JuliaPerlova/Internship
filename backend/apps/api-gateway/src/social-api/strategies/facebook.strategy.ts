import { Injectable, Inject } from '@nestjs/common';
import * as FacebookTokenStrategy from 'passport-facebook-token';
import { use } from 'passport';
import 'dotenv/config';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { addDays } from 'date-fns';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, 'facebook') {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'name', 'emails', 'photos']
    })
  ;}

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const expiredAt = addDays(Date.now(), 60);

    const providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      providerId: `${profile.id}`,
      provider: 'facebook',
      avatar: profile.photos[0].value,
      accessToken,
      expiredAt,
    };

    return await providerUserProfile;
  }
}