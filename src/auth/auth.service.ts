import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
    signUp() {
        return "signed up";
    }

    signIn() {
        return "signed in";
    }
}
