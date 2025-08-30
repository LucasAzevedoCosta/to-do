import { Inject, Injectable } from '@nestjs/common';
import { betterAuth } from 'better-auth';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH') private readonly auth: ReturnType<typeof betterAuth>,
  ) {}

  signIn = async (email: string, password: string) => {
    try {
      await this.auth.api.signInEmail({ body: { email, password } });
      return { success: true, message: 'Signed in successfully.' };
    } catch (error) {
      const e = error as Error;
      return {
        success: false,
        message: e.message || 'An unknown error occurred.',
      };
    }
  };

  signUp = async (email: string, password: string, username: string) => {
    try {
      await this.auth.api.signUpEmail({
        body: { email, password, name: username },
      });
      return { success: true, message: 'Signed up successfully.' };
    } catch (error) {
      const e = error as Error;
      return {
        success: false,
        message: e.message || 'An unknown error occurred.',
      };
    }
  };
}
