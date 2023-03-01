import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { map } from 'rxjs/operators';

@Injectable()
export class GeneratejwtInterceptor implements NestInterceptor {
  constructor(private readonly jwtService: JwtService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const id = request.body.user.id;
    const email = request.body.user.email;
    const access_token = this.jwtService.sign({ id, email });

    return next.handle().pipe(
      map((response) => {
        return {
          ...response,
          access_token: access_token,
        };
      }),
    );;
  }
}

