# HTTP Status Codes

### 🟢 Informationnel (1xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| CONTINUE | 100 | Le serveur a reçu les en-têtes, le client peut continuer |
| SWITCHING_PROTOCOLS | 101 | Le serveur change de protocole selon la demande du client |
| PROCESSING | 102 | Le serveur a reçu et traite la requête |
| EARLYHINTS | 103 | Utilisé pour retourner des en-têtes avant la réponse finale |

### 🟡 Succès (2xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| OK | 200 | La requête a réussi |
| CREATED | 201 | La requête a réussi et une nouvelle ressource a été créée |
| ACCEPTED | 202 | Requête acceptée pour traitement mais non terminée |
| NON_AUTHORITATIVE_INFORMATION | 203 | Requête réussie mais info peut provenir d'une source différente |
| NO_CONTENT | 204 | Requête réussie mais aucun contenu à retourner |
| RESET_CONTENT | 205 | Requête réussie, le client doit réinitialiser la vue |
| PARTIAL_CONTENT | 206 | Le serveur ne livre qu'une partie de la ressource |

### 🟠 Redirection (3xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| MULTIPLE_CHOICES | 300 | Plusieurs options pour la ressource |
| MOVED_PERMANENTLY | 301 | Ressource déplacée définitivement vers une nouvelle URL |
| FOUND | 302 | Ressource temporairement trouvée à un URI différent |
| SEE_OTHER | 303 | Réponse trouvée à un URI différent |
| NOT_MODIFIED | 304 | Ressource non modifiée depuis la dernière requête |
| TEMPORARY_REDIRECT | 307 | Redirection temporaire, répéter avec un autre URI |
| PERMANENT_REDIRECT | 308 | Ressource déplacée définitivement vers un autre URI |

### 🔴 Erreur Client (4xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| BAD_REQUEST | 400 | Le serveur ne peut traiter la requête (syntaxe invalide) |
| UNAUTHORIZED | 401 | Le client doit s'authentifier pour obtenir la réponse |
| PAYMENT_REQUIRED | 402 | Réservé pour usage futur |
| FORBIDDEN | 403 | Le client n'a pas les droits d'accès au contenu |
| NOT_FOUND | 404 | Le serveur ne trouve pas la ressource demandée |
| METHOD_NOT_ALLOWED | 405 | Méthode de requête non supportée pour cette ressource |
| NOT_ACCEPTABLE | 406 | Le serveur ne peut produire une réponse acceptable |
| PROXY_AUTHENTICATION_REQUIRED | 407 | Le client doit d'abord s'authentifier avec le proxy |
| REQUEST_TIMEOUT | 408 | Le serveur a expiré en attendant la requête |
| CONFLICT | 409 | La requête entre en conflit avec l'état actuel du serveur |
| GONE | 410 | La ressource n'est plus disponible et ne le sera plus |
| LENGTH_REQUIRED | 411 | Le serveur refuse la requête sans Content-Length défini |
| PRECONDITION_FAILED | 412 | Le client a indiqué des préconditions non respectées |
| PAYLOAD_TOO_LARGE | 413 | L'entité de requête est plus grande que les limites |
| URI_TOO_LONG | 414 | L'URI demandé est trop long pour le serveur |
| UNSUPPORTED_MEDIA_TYPE | 415 | Format de média des données non supporté |
| REQUESTED_RANGE_NOT_SATISFIABLE | 416 | La plage spécifiée ne peut être satisfaite |
| EXPECTATION_FAILED | 417 | L'attente indiquée par Expect ne peut être satisfaite |
| I_AM_A_TEAPOT 🫖 | 418 | Le serveur refuse de faire du café car c'est une théière |
| MISDIRECTED | 421 | Requête dirigée vers un serveur incapable de répondre |
| UNPROCESSABLE_ENTITY | 422 | Requête bien formée mais avec erreurs sémantiques |
| FAILED_DEPENDENCY | 424 | Requête échouée car dépendante d'une autre qui a échoué |
| PRECONDITION_REQUIRED | 428 | Le serveur exige que la requête soit conditionnelle |
| TOO_MANY_REQUESTS | 429 | L'utilisateur a envoyé trop de requêtes dans un temps donné |
| REQUEST_HEADER_FIELDS_TOO_LARGE | 431 | Les champs d'en-tête de requête sont trop volumineux |
| INTERNAL_CLIENT_ERROR (non standard) | 444 | Connexion fermée sans réponse |
| UNAVAILABLE_FOR_LEGAL_REASONS | 451 | Ressource indisponible pour des raisons légales |

### 🔥 Erreur Serveur (5xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| INTERNAL_SERVER_ERROR | 500 | Le serveur a rencontré une situation qu'il ne sait pas gérer |
| NOT_IMPLEMENTED | 501 | Méthode de requête non supportée par le serveur |
| BAD_GATEWAY | 502 | Le serveur a reçu une réponse invalide d'un serveur amont |
| SERVICE_UNAVAILABLE | 503 | Le serveur n'est pas prêt à traiter la requête |
| GATEWAY_TIMEOUT | 504 | Le serveur agissant comme passerelle n'a pas reçu de réponse |
| HTTP_VERSION_NOT_SUPPORTED | 505 | Version HTTP de la requête non supportée |
| INSUFFICIENT_STORAGE | 507 | Le serveur ne peut stocker la représentation nécessaire |
| LOOP_DETECTED | 508 | Le serveur a détecté une boucle infinie |
| BANDWIDTH_LIMIT_EXCEEDED | 509 | Le serveur a dépassé la bande passante autorisée |
| NOT_EXTENDED | 510 | Extensions supplémentaires requises pour satisfaire la requête |
| NETWORK_AUTHENTICATION_REQUIRED | 511 | Le client doit s'authentifier pour accéder au réseau |
