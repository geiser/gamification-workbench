## Como configurar a plataforma

### Configurando os ambientes
##### 1. Arquivo de configuração
Os ambientes da aplicação são definidos no arquivo `config.json`, localizado na pasta `src`.
Este arquivo contém duas variáveis:
* `participantAllocation`
	* Define como os participantes são alocados nos ambientes.
	* Caso seu valor seja `"random"`, os ambientes são alocados aleatoriamente.
	Caso seu valor seja um número inteiro _x_, o ambiente é trocado a cada _x_ participantes.

* `environments`
	* Define quais serão os ambientes da plataforma.
	* Os ambientes podem ser definidos em arquivos separados ou explicitamente nesta área do arquivo de configuração.
	* Todos arquivos de ambientes devem estar na pasta `src/environments`.
	* É obrigatório que haja um ambiente com nome de `default` com todas as variáveis definidas, pois quando tais variáveis não são definidas em outros ambientes o valor usado será o que está em `default`.

* Exemplo de arquivo de configuração:
```js
 {
    "participantAllocation": "random",
    "environments": {
        "stMale": "stMaleConf.json", // arquivo de configuração
        "stFemale": {		// atribuição direta
             "theme": {
                "primary": "blue",
                "secondary": "blue"
              },
             ...
        "default": {}		// atribuição direta
     }
 }
```

##### 2. Configuração do ambiente
Aqui será explicado as variáveis usadas para configurar um ambiente. Caso alguma dessas variáveis não esteja presente no arquivo de configuração, será usado o valor definido no ambiente `default`.
Clique [aqui](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json) para ver um arquivo de exemplo.

* `localization` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L2)
	Aqui são definidas as strings que aparecem no site.
	* `title` — Título da página
	* `points` — Texto na caixa de pontos
	* `rightAnswers` — Texto na caixa de acertos
	* `ranking` — Texto na caixa do ranking
	* `myTrophies` — Texto na caixa de troféus
	* `avatarSelection`
		* `header` — Cabeçalho da área de seleção de avatares
		* `text` — Descrição da área de seleção de avatares
		* `next` — Texto do botão de continuar
	* `wrongAnswer` — Texto que aparece ao errar uma questão
	* `rightAnswer` — Texto que aparece ao acertar uma questão

* `preTest` e `postTest` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L21)
	Link direto para questionários externos de pré e pós-teste.
	É possível passar parâmetros para os links fornecidos usando a sintaxe `{{param}}`. No momento os parâmetros suportados são:
	* `{{sessionId}}` — É substituído pelo identificador único da sessão do usuário
	* `{{points}}` — É substituído pelo número de pontos que o usuário fez no quiz

* `theme` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L24)
	Define o esquema de cores do ambiente.
	Há apenas dois campos: `primary` e `secondary`. Apenas a paleta de cores fornecida em `primary` é usada, mas isso pode ser modificado no código.
	Os valores destes campos podem ser paletas de cores fornecidas pela biblioteca _Material-UI_ ([clique aqui](https://material-ui.com/customization/color/)).

* `ranking` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L29)
	Define o placar do ambiente. Esta variável aceita apenas um array de objetos que devem ter as seguintes propriedades:
	* `name` — Nome do usuário no placar
	* `points` — Número de pontos
	* `avatar` — Link para a imagem do avatar
		* Nos links, o parâmetro `{theme}` é substituido pelo nome do ambiente

* `avatarList` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L47)
	Define a lista de avatares que o usuário pode selecionar antes de entrar no quiz.
	A lista é um array de strings onde cada string deve ser o link de um avatar. Nos links, o parâmetro `{theme}` é substituido pelo nome do ambiente.

* `questions` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L53)
	Define as perguntas do quiz.
	Esta variável é um array de objetos que devem ter as seguintes propriedades:
	* `id` — ID da pergunta. Deve ser único para cada pergunta
	* `texto` (opcional) — Conteúdo da pergunta
	* `image` (opcional) — Link da imagem que aparecerá na pergunta
		* Nos links, o parâmetro `{theme}` é substituido pelo nome do ambiente
	* `answers` - Array com as alternativas
	* `rightAnswer` - Resposta correta. Deve ser escrita exatamente como no campo answers

* `trophies` [(exemplo)](https://gitlab.com/nees/experimente/gamification-workbench/-/blob/master/src/environments/template.json#L196)
	Define os troféus que o usuário pode ganhar.
	Esta variável é um array de objetos que deve ter as seguintes propriedades:
	* `id` — ID do troféu. Deve ser único para cada troféu
	* `lockedImage` — Link da imagem que aparecerá quando o troféu não estiver liberado
	* `image` — Link da imagem que aparecerá quando o troféu for liberado
		* Nos links, o parâmetro `{theme}` é substituido pelo nome do ambiente
	* `unlockAt`
		Aqui é definido como o troféu será liberado
		* `points` — Quantidade mínima de pontos
		* `correctAnswers` — Número de respostas corretas
		* `question` — Liberado automaticamente ao chegar na pergunta especificada
		Ao menos um dos quesitos deve ser definido. Os que não forem necessários devem ser `0`

### Configurando o servidor
Por padrão, o servidor roda na porta 8080. Para trocar basta mudar a variável `SERVER_PORT` no arquivo `.env` e o campo `proxy` no arquivo `package.json` (a porta deve ser igual nos dois arquivos).

### Rodando a aplicação
1. Certifique-se que o [Node.js](https://nodejs.org/en/) está instalado
2. Abra a linha de comando no diretório do projeto
3. Instale as dependências:
```npm install```
4. Inicie o projeto
	a) Ambiente de desenvolvimento:
```npm run start```
	b) Ambiente de produção
```npm run build```
```npm run server```

### Frameworks utilizados
* React
	* [Documentação](https://reactjs.org/docs/getting-started.html)
* Material-UI
	* [Documentação](https://material-ui.com/getting-started/learn/)
* Express.js
	* [Documentação](https://expressjs.com/en/4x/api.html)
