# Vamu 

**Vamu** é uma aplicação web de caronas universitárias compartilhadas em desenvolvimento como projeto extensionista no Instituto Federal de São Paulo (IFSP). O objetivo é conectar alunos que realizam trajetos semelhantes, facilitando a oferta e a busca por caronas entre estudantes.

## Funcionalidades

- **Cadastro e autenticação:** criação de contas e login de usuários.
- **Gerenciamento de veículos:** cadastro e gerenciamento dos veículos utilizados nas caronas.
- **Oferta de caronas:** publicação de caronas com informações de trajeto, data, horário e vagas disponíveis.
- **Busca de caronas:** pesquisa e visualização de caronas disponíveis.
- **Solicitação de participação:** solicitação de vagas em caronas oferecidas por outros usuários.
- **Gerenciamento de caronas:** gerenciamento das caronas ofertadas e das solicitações de passageiros.
- **Avaliações:** sistema de avaliações de motoristas.
- **Notificações:** central de notificações para informar os usuários sobre eventos relacionados à aplicação.
- **Perfil de usuário:** gerenciamento e consulta das informações do usuário.

## Tecnologias utilizadas

### Front-end
- React
- TypeScript
- Tailwind CSS
- React Router
- Context API

### Back-end
- Node.js
- TypeScript
- API REST
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt

### Integrações
- **API do IBGE:** consulta de informações sobre municípios.

## Arquitetura

O projeto é dividido em duas aplicações principais: front-end e back-end.

### Front-end

Responsável pela interface e pela interação com os usuários. A estrutura é organizada em páginas, componentes reutilizáveis, serviços de comunicação com a API, contextos para compartilhamento de estado, tipos e schemas de validação.

### Back-end

Responsável pelas regras de negócio, autenticação, persistência dos dados e disponibilização dos recursos por meio de uma API REST.

A organização do back-end utiliza:

- **Routes:** definição dos endpoints da API.
- **Controllers:** tratamento das requisições e construção das respostas HTTP.
- **Services:** implementação das regras de negócio.
- **Middlewares:** autenticação e validações aplicadas às requisições.
- **Database:** comunicação com o PostgreSQL.

## Segurança

- Autenticação baseada em JWT.
- Hash de senhas utilizando bcrypt.
- Middleware para verificar a autenticação das requisições protegidas.
- Consultas SQL parametrizadas para interação com o banco de dados.

# Telas

## DASHBOARD
<img width="1897" height="1626" alt="image" src="https://github.com/user-attachments/assets/35fedd02-e184-414e-ae91-c48e3a228479" />




## OFERECER CARONA
<img width="1903" height="1495" alt="image" src="https://github.com/user-attachments/assets/107bec34-58cd-46bb-a607-edd030c47114" />



## PROCURAR CARONA
<img width="1901" height="1132" alt="image" src="https://github.com/user-attachments/assets/c6b4deb0-3dde-4c5b-9310-5c1bef490ad6" />


## GERENCIAR CARONA
<img width="1897" height="1089" alt="image" src="https://github.com/user-attachments/assets/8c3da6bd-8a37-4fd7-a757-f5ae46489a2b" />

## NOTIFICAÇÕES

<img width="578" height="692" alt="image" src="https://github.com/user-attachments/assets/41c8d2dc-4e59-4900-8cf9-a36ba07f462a" />


## PERFIL DE USUÁRIO
<img width="1906" height="2079" alt="image" src="https://github.com/user-attachments/assets/0d15ab5d-dd30-4d87-9fcb-3f2dfb55901d" />










