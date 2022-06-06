##Objetivo dessa camada
A ideia dessa camada, é possuir as implementações do domínio.
Ela também mapeia os dados retornados do servidor para atender as necessidades do client, se necessário.
---
###Sufixos utilizados
- Remote: representam implementações que necessitam de 
recursos externos para funcionarem, como por exemplo: axios.

- Local: representam o uso de recursos que podem ser 
encontrados dentro da aplicação ou no ambiente em que 
ela irá ser executada (navegador).