# Authentification JWT dans NestJS

## Vue d'ensemble

Ce système d'authentification utilise JWT (JSON Web Tokens) avec Passport.js pour sécuriser les routes de l'API.

## Flux d'authentification

### 1. Login (POST /auth/login)

1. **Saisie des credentials** : L'utilisateur envoie email/password
2. **Vérification** : `AuthService.login()` vérifie les credentials
3. **Génération des tokens** : Si valide, création de l'accessToken et refreshToken
4. **Réponse** : Retour des tokens + données utilisateur (sans password)

```typescript
// Structure du payload JWT (dans l'accessToken)
{
  email: "user@example.com",
  sub: 123,  // ID de l'utilisateur 
  role: "USER",
  iat: 1234567890,
  exp: 1234568890
}
```

### 2. Accès aux routes protégées

Quand une route utilise `@UseGuards(JwtAuthGuards)` :

1. **Extraction du token** : Le guard extrait le Bearer token du header `Authorization`
2. **Validation JWT** : Passport utilise `JwtStrategy` pour valider le token
3. **Décodage du payload** : Le JWT est décodé, révélant le payload avec `sub` (user ID)
4. **Récupération de l'utilisateur** : `JwtStrategy.validate()` utilise `payload.sub` pour récupérer l'utilisateur complet depuis la DB
5. **Ajout à la requête** : L'utilisateur est attaché à `request.user`

## Comment fonctionne JwtStrategy

### Configuration (constructor)
```typescript
super({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extrait depuis "Bearer <token>"
  ignoreExpiration: false,  // Vérifie l'expiration
  secretOrKey: configService.getOrThrow<string>('jwtSecret'), // Clé de validation
})
```

### Validation (méthode validate)

```typescript
async validate(payload: any) {
  // payload.sub contient l'ID utilisateur (défini lors de la création du token)
  const user = this.authService.getUserById(payload.sub);
  
  if (!user) {
    throw new UnauthorizedException('Invalid token');
  }
  
  return {
    ...omit(user, ['password']), // Utilisateur sans le mot de passe
    role: payload.role           // Rôle depuis le payload JWT
  }
}
```

## Séquence complète

```
Client Request avec Authorization: Bearer <accessToken>
           ↓
    JwtAuthGuards activé
           ↓
    Passport extrait le token du header
           ↓
    JWT décodé → payload = { sub: 123, email: "...", role: "USER" }
           ↓
    JwtStrategy.validate(payload) appelée
           ↓
    getUserById(payload.sub) → récupère User complet depuis DB
           ↓
    request.user = utilisateur complet
           ↓
    @CurrentUser() decorator retourne request.user
```

## Points clés

1. **L'ID utilisateur** vient de `payload.sub` (défini lors de la création du token dans `generateAccessToken()`)
2. **Le guard ne stocke rien** - il décode le JWT à chaque requête
3. **La DB est interrogée** à chaque validation pour avoir les données fraîches
4. **@CurrentUser()** est un decorator qui retourne simplement `request.user`

## Gestion des rôles

Le `RolesGuards` fonctionne après `JwtAuthGuards` :
- Lit les métadonnées `@Roles()` sur la route
- Vérifie si `request.user.role` correspond aux rôles requis
- Bloque l'accès si le rôle ne correspond pas

## Refresh Token

- **AccessToken** : 15 minutes, contient toutes les infos (email, sub, role)
- **RefreshToken** : 7 jours, contient seulement `sub` (ID utilisateur)
- Le refresh permet de générer un nouvel accessToken sans re-login