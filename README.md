# Passos para rodar a aplicação Node, ,typescript, fastify com docker 


# 1. Clone o repositório
```
git clone https://github.com/willcordeiro/backendInvoices.git
```
# 2. Navegue até o diretório do projeto
cd seu-repositorio

# 3. Instale as dependências
```
npm install
```
# ou
```
yarn install
```

# 4. Crie o arquivo .env com a variável DATABASE_URL e PORT
exemplo:
```
DATABASE_URL=postgresql://postgres:123@localhost:5432/postgres
```
```
PORT=5000
```

# Execute as migrations do Prisma
```
npx prisma migrate dev --name init
````


# 5. Inicie a aplicação localmente
```
npm run dev
```
# ou
```
yarn dev
```

# 6. Utilize a aplicação a partir do Docker
baixe o docker e execute o comando abaixo
```
docker-compose up --build
```

# 7. acessa a aplicação via deploy em 
```
https://front-invoices-one.vercel.app/
```

