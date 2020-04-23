import { Injectable, Inject } from '@nestjs/common';
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
      scope: ['email', 'public_profile', 'user_photos'],
      profileFields: ['id', 'name', 'emails', 'photos']
    })
  ;}

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const expiredAt = addDays(Date.now(), 60);

    console.log(profile);
    const avatar = (profile.photos[0]) ? profile.photos[0].value : null;
    const email = (profile.emails) ? profile.emails[0].value : null;

    const providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email,
      providerId: `${profile.id}`,
      provider: 'facebook',
      avatar,
      accessToken,
      expiredAt,
    };

    return await providerUserProfile;
  }
}