### Autenticação
O aplicativo deve possuir um login obrigatório para acesso aos recursos sendo que todas as requisições seguintes devem ser interceptadas pelo token do tipo Bearer.

#### Autenticar/logar
```javascript
POST '/auth/login'
```

Body
```json
{
  "email": "**********************",
  "password": "*******************"
}
```

#### Recuperar todos os contatos
```javascript
GET '/contacts'
```

#### Recuperar um contato por ID
```javascript
GET '/contacts/:id'
```

#### Criar novo contato
```javascript
POST '/contacts'
```
Body (todos campos obrigatórios)
```json
{
  "name": "João da silva",
  "email": "joao@email.com",
  "phone": "00999999999"
}
```

#### Editar um contato
```javascript
PUT '/contacts/:id'
```
Body (todos campos opcionais)
```json
{
  "name": "João da silva",
  "email": "joao@email.com",
  "phone": "00999999999"
}
```

#### Excluir um contato por ID
```javascript
DELETE '/contacts/:id'
```
 