# Portal de Notícias

Este projeto é um portal de notícias desenvolvido em WordPress, com tema personalizado e integração com plugins para autenticação e API REST. Siga os passos abaixo para clonar o repositório, configurar o ambiente e iniciar o desenvolvimento.

## Instruções de Configuração

### 1. Clonar o Repositório
Clone o repositório do projeto para sua máquina local:

```bash
git clone https://github.com/sarassilva/portaldenoticias.git
```

Acesse o diretório do projeto:

```bash
cd portaldenoticias
```

### 2. Subir o Ambiente com Docker
Suba os contêineres do ambiente utilizando o Docker Compose:

```bash
docker-compose up -d
```

O WordPress estará acessível no navegador pelo seguinte endereço:

```
http://localhost:8080/
```

### 3. Configuração do WordPress

1. Finalize a instalação do WordPress através do navegador.
2. No painel administrativo, ative o tema **"Portal de notícias"**.
3. Ative os plugins:
   - **JWT Authentication for WP-API**
   - **WP REST API**
4. Em **Configurações > Links Permanentes**, selecione a opção **"Nome do Post / Post Name"** e salve as alterações.

### 4. Instalar Dependências e Iniciar o Ambiente de Desenvolvimento
Acesse o diretório do tema para instalar as dependências e iniciar o ambiente de desenvolvimento:

```bash
cd src/wp-content/themes/portal/app
npm install
npm start
```

O ambiente de desenvolvimento estará ativo e pronto para uso.

---

### Recursos e Tecnologias Utilizadas
- WordPress
- Docker
- JWT Authentication for WP-API
- WP REST API
- Node.js / npm

## Comandos Úteis

### Parar os Contêineres
```bash
docker-compose down
```

### Remover Contêineres, Redes e Volumes
```bash
docker-compose down -v
```

### Reconstruir Imagens do Docker
```bash
docker-compose build
```


