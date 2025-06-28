# Projeto Front Merchion

Projeto feito usando a NPM versão 10.9.2

É necessário rodar ``npm i`` para montar o projeto ja com as dependencias. 


Antes de dar um start na API, é necessário adicionar o endereço local no arquivo de hosts. Estou disponibilizando para os dois sistemas, front e back:

```bash
	127.0.0.1       elizeu-back-teste.test
	127.0.0.1       elizeu-front-teste.test
```

Após esses passso, basta rodar o projeto usando o comando abaixo. Estou setando com uma porta personalizada:

```bash
npm run dev
```

No CMD vai mostrar a URL gerada para poder acessar no browser mas ele vai gerar 
```bash
http://elizeu-front-teste.test:8081/
```

Para testar o sistema é necesário que o back esteja rodando também. No projeto do back há as instruções para rodar o sistema de backend simultaneamente.

A url da API é configurada no arquivo ```src\globals.js``` caso o projeto do backend esteja rodando em outro servidor.

# Considerações

Tentei seguir as recomendações na descrição e acredito ter coberto os requisitos de forma completa. Com relação à estrutura de pastas, adicionei as pastas api, helpers e services abaixo da pasta src.

A pasta de componentes visuais ja possuem os componentes dentro da pasta sem nenhuma sub-pasta. Normalmente eu faria uma pasta por componente, e incluir o arquivo do componente em si, CSS e outros arquivos que possam vir a compor o componente em si (faço isso em projetos de React e replicaria nesse aqui também) mas como o projeto é realmente pequeno, deixei de fora essa configuração para facilitar a visualização no editor.

Criei a pasta services, ao invés da API, pois estou acostumado a trabalhar com classes de serviço no backend, e API é um dos serviços. 