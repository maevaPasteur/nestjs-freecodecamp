# 🧭 Guards, Metadata, Reflector, Strategy & Pipes

---

## 🔐 1. Guards — les “videurs” de l’application

Un **Guard** est exécuté **avant** le contrôleur.
Il décide si une requête **a le droit** de passer ou non.

```ts
@UseGuards(AuthGuard('jwt'))
@Get('profile')
getProfile() {
  return 'Bienvenue !';
}
```

* Les guards retournent `true` ou `false`.
* S’ils retournent `false`, la requête est bloquée.
* Ils sont souvent utilisés pour vérifier l’authentification ou les rôles.

📌 Exemple simple :

```ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class MyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    return !!request.user; // autorise si l'utilisateur est authentifié
  }
}
```

---

## 🏷 2. Metadata — les “étiquettes” des routes

Les métadonnées sont **des infos attachées aux routes** grâce à `SetMetadata`.
Elles **ne font rien toutes seules**, mais peuvent être **lues par un Guard ou un Interceptor**.

```ts
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);

@Roles('admin')
@Get('users')
getAllUsers() {}
```

---

## 🪞 3. Reflector — pour lire les Metadata

Le **Reflector** (de `@nestjs/core`) permet de **récupérer** les métadonnées dans un Guard.

```ts
import { Reflector } from '@nestjs/core';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

---

## 🧠 4. Strategy — comment on reconnaît les utilisateurs

Une **Strategy** explique à Nest **comment authentifier** une requête.
Exemple classique avec JWT :

```ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('jwtSecret'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
```

📌 `AuthGuard('jwt')` utilisera automatiquement cette stratégie.

---

## 🧼 5. Pipes — valider et transformer les données

Un **Pipe** agit sur les données **après leur réception** et **avant** que le controller ne les utilise.
Idéal pour valider ou transformer les entrées.

```ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException('Validation failed');
    }
    return val;
  }
}
```

Usage :

```ts
@Get(':id')
getUser(@Param('id', ParseIntPipe) id: number) {
  return this.userService.findOne(id);
}
```

* Les **guards** filtrent avant le controller
* Les **pipes** valident ou transforment les données
* Les **strategies** expliquent comment authentifier
* Les **metadata** ajoutent des règles sur les routes
* Le **reflector** lit ces règles dans les guards

---

## 📝 Résumé visuel rapide

```
Requête HTTP
   ↓
Guards (AuthGuard, RolesGuard...)
   ↓
Pipes (validation/transformation)
   ↓
Controller
   ↓
Service / Repository / BDD
```

✅ Les Guards contrôlent **l’accès**.
✅ Les Pipes contrôlent **le contenu**.
✅ Les Strategies définissent **la méthode d’authentification**.
✅ Les Metadata ajoutent **des règles personnalisées**.
✅ Le Reflector permet de **lire ces règles** dans les Guards.

```
```
