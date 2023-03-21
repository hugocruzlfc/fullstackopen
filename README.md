# Verificar qué tan actualizadas están sus dependencias:

npm outdated --depth 0

# Actualizarlas:

npm install -g npm-check-updates
El archivo package.json se actualiza ejecutando el comando ncu -u.
y luego
npm audit fix

# eslint plugin security

npm install --save-dev eslint-plugin-security

.eslintrc file:

"extends": [
"plugin:security/recommended"
]

# add apollo and grphql in server

@apollo/server
graphql

# add apollo client in react

npm install @apollo/client graphql
