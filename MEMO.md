# NestJS Documentation

## Nest CLI Commands
- `nest g module tasks`
- `nest g controller tasks`
- `nest g service tasks`

## HTTP Status Codes

### 🟢 Informational (1xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| CONTINUE | 100 | Server received request headers, client should continue |
| SWITCHING_PROTOCOLS | 101 | Server is switching protocols per client request |
| PROCESSING | 102 | Server has received and is processing the request |
| EARLYHINTS | 103 | Used to return some response headers before final response |

### 🟡 Success (2xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| OK | 200 | Request succeeded |
| CREATED | 201 | Request succeeded and new resource was created |
| ACCEPTED | 202 | Request accepted for processing but not completed |
| NON_AUTHORITATIVE_INFORMATION | 203 | Request succeeded but info may be from different source |
| NO_CONTENT | 204 | Request succeeded but no content to return |
| RESET_CONTENT | 205 | Request succeeded, client should reset document view |
| PARTIAL_CONTENT | 206 | Server delivering only part of resource due to range header |

### 🟠 Redirection (3xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| MULTIPLE_CHOICES | 300 | Multiple options for the resource |
| MOVED_PERMANENTLY | 301 | Resource moved permanently to new URL |
| FOUND | 302 | Resource temporarily found at different URI |
| SEE_OTHER | 303 | Response found at different URI |
| NOT_MODIFIED | 304 | Resource not modified since last request |
| TEMPORARY_REDIRECT | 307 | Temporary redirect, repeat with another URI |
| PERMANENT_REDIRECT | 308 | Resource permanently moved to another URI |

### 🔴 Client Error (4xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| BAD_REQUEST | 400 | Server cannot process request due to invalid syntax |
| UNAUTHORIZED | 401 | Client must authenticate itself to get the requested response |
| PAYMENT_REQUIRED | 402 | Reserved for future use |
| FORBIDDEN | 403 | Client does not have access rights to the content |
| NOT_FOUND | 404 | Server can not find the requested resource |
| METHOD_NOT_ALLOWED | 405 | Request method is not supported for the requested resource |
| NOT_ACCEPTABLE | 406 | Server cannot produce a response matching the list of acceptable values |
| PROXY_AUTHENTICATION_REQUIRED | 407 | Client must first authenticate itself with the proxy |
| REQUEST_TIMEOUT | 408 | Server timed out waiting for the request |
| CONFLICT | 409 | Request conflicts with the current state of the server |
| GONE | 410 | Resource is no longer available and will not be available again |
| LENGTH_REQUIRED | 411 | Server refuses to accept the request without a defined Content-Length |
| PRECONDITION_FAILED | 412 | Client has indicated preconditions that the server does not meet |
| PAYLOAD_TOO_LARGE | 413 | Request entity is larger than limits defined by server |
| URI_TOO_LONG | 414 | URI requested by the client is longer than the server is willing to interpret |
| UNSUPPORTED_MEDIA_TYPE | 415 | Media format of the requested data is not supported by the server |
| REQUESTED_RANGE_NOT_SATISFIABLE | 416 | Range specified by the Range header field in the request cannot be fulfilled |
| EXPECTATION_FAILED | 417 | Expectation indicated by the Expect request header field cannot be met |
| I_AM_A_TEAPOT 🫖 | 418 | Server refuses to brew coffee because it is a teapot |
| MISDIRECTED | 421 | Request was directed at a server that is not able to produce a response |
| UNPROCESSABLE_ENTITY | 422 | Request was well-formed but was unable to be followed due to semantic errors |
| FAILED_DEPENDENCY | 424 | Request failed because it depended on another request and that request failed |
| PRECONDITION_REQUIRED | 428 | Origin server requires the request to be conditional |
| TOO_MANY_REQUESTS | 429 | User has sent too many requests in a given amount of time |
| REQUEST_HEADER_FIELDS_TOO_LARGE | 431 | Server is unwilling to process the request because header fields are too large |
| INTERNAL_CLIENT_ERROR (non standard) | 444 | Connection closed without response |
| UNAVAILABLE_FOR_LEGAL_REASONS | 451 | User-agent requested a resource that cannot legally be provided |

### 🔥 Server Error (5xx)

| Nom | Valeur | Description |
| :--- | :---: | :--- |
| INTERNAL_SERVER_ERROR | 500 | Server has encountered a situation it doesn't know how to handle |
| NOT_IMPLEMENTED | 501 | Request method is not supported by the server and cannot be handled |
| BAD_GATEWAY | 502 | Server, while working as a gateway to get a response needed to handle the request, got an invalid response |
| SERVICE_UNAVAILABLE | 503 | Server is not ready to handle the request |
| GATEWAY_TIMEOUT | 504 | Server is acting as a gateway and cannot get a response in time |
| HTTP_VERSION_NOT_SUPPORTED | 505 | HTTP version used in the request is not supported by the server |
| INSUFFICIENT_STORAGE | 507 | Server is unable to store the representation needed to complete the request |
| LOOP_DETECTED | 508 | Server detected an infinite loop while processing the request |
| BANDWIDTH_LIMIT_EXCEEDED | 509 | Server has exceeded the bandwidth specified by the server administrator |
| NOT_EXTENDED | 510 | Further extensions to the request are required for the server to fulfill it |
| NETWORK_AUTHENTICATION_REQUIRED | 511 | Client needs to authenticate to gain network access |