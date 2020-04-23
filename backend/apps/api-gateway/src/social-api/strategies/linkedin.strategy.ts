import { Injectable, Inject } from '@nestjs/common';
import 'dotenv/config';

import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-linkedin-oauth2';
import { addDays } from 'date-fns';

@Injectable()
export class LinkedinStrategy extends PassportStrategy(Strategy, 'linkedin') {
  constructor() {
    super({
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['r_liteprofile', 'r_emailaddress'],
      profileFields: ['id', 'first-name', 'last-name', 'email-address', 'headline']
    })
  ;}

  validate(accessToken: string, refreshToken: string, profile: any) {
    const expiredAt = addDays(Date.now(), 60);

    const avatar = (profile.photos[0]) ? profile.photos[0].value : null;

    const providerUserProfile = {
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      email: profile.emails[0].value,
      providerId: `${profile.id}`,
      provider: 'linkedin',
      avatar,
      accessToken,
      expiredAt,
    };

    return providerUserProfile;
  }
}