# NestJS Exceptions 
@nestjs/common

Les exceptions NestJS permettent de gérer les erreurs de manière standardisée avec des codes de statut HTTP appropriés.

### Exceptions de base

| Exception | Code HTTP | Description |
| :--- | :---: | :--- |
| BadRequestException | 400 | Requête malformée ou paramètres invalides |
| UnauthorizedException | 401 | Utilisateur non authentifié |
| ForbiddenException | 403 | Accès interdit malgré l'authentification |
| NotFoundException | 404 | Ressource non trouvée |
| ConflictException | 409 | Conflit avec l'état actuel de la ressource |
| UnprocessableEntityException | 422 | Entité non traitable (erreurs de validation) |
| InternalServerErrorException | 500 | Erreur interne du serveur |
| NotImplementedException | 501 | Fonctionnalité non implémentée |
| BadGatewayException | 502 | Erreur de passerelle |
| ServiceUnavailableException | 503 | Service temporairement indisponible |
| GatewayTimeoutException | 504 | Timeout de la passerelle |

### Utilisation

```typescript
import { ConflictException, UnauthorizedException } from '@nestjs/common';

// Avec message personnalisé
throw new ConflictException('Email already exists');

// Avec objet d'erreur détaillé
throw new UnauthorizedException({
  message: 'Invalid credentials',
  error: 'Unauthorized',
  statusCode: 401
});
```