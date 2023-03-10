import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { hash } from 'bcrypt';

@Injectable()
export class HashPasswordInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    if (request.body.password) {
      request.body.password = await hash(request.body.password, 10);
    }
    return next.handle().pipe(
      map((data) => {
        return data;
      }),
    );
  }
}