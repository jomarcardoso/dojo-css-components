> *Uma forma muito simples de aprender algo é seguir exatamente outra pessoa que faz aquela tarefa muito bem, depois que aprender tudo com ela,*
> *desenvolva a sua própria forma de fazer. No processo de aprendizado questionar é bom, dúvidar nem tanto.* Jomar A. Cardoso

# Padrões de projeto

O conceito de criar padrões arquitetônicos surge no livro ["Uma linguagem de padrões"](https://statics-submarino.b2w.io/sherlock/books/firstChapter/112900425.pdf):

> Os elementos dessa linguagem são entidades chamadas de padrão. Cada padrão descreve um problema que ocorre repetidas vezes em nosso meio ambiente e então descreve o ponto central da solução do problema, de modo que você possa usar a mesma solução milhares de vezes, mas sem jamais ter de repeti-la. (Uma linguagem de padrões)

- cada componente é um padrão
- cada componente se repete várias vezes nos sites
- uma vez que o componente está criado só precisamos usar ele e não criá-lo novamente

> Cada padrão está conectado a certos padrões "maiores"(ou mais abrangentes), que estão acima dele, e a certos padrões "menores"(ou mais específicos) que estão abaixo, na linguagem. O padrão ajuda a completar aqueles padrões maiores e, ao mesmo tempo, é completado pelos padrões menores. (Uma linguagem de padrões)

- os componentes são formados por outros componentes.

No exemplo do livro sobre as praças fala que uma praça é constituída por vários elementos menores, como muro e ambiente para caminhar, enquanto também a praça faz parte de algo maior que são bairros e as cidades.

## Helpers CSS

O helper é uma forma de colocarmos CSS em linha de forma implícita. Para criarmos componente usando helpers ou outra técnica em que não definimos os componente no CSS, passamos a responsabilidade para outra tecnologia, como um HTML template ou algum biblioteca JS de renderização. 

```html
<style>
  .bg-black {
    background-color: black;
  }

  .border-0 {
    border: 0;
  }

  .color-white {
    color: white;
  }
</style>

<button class="bg-black border-0 color-white">
  button
</button>
```

Criamos um componente visual com a combinação de algumas propriedades.

**Atenção:** Um componente visual é diferente de um componente estrutural, por exemplo uma página de carrinho pode ter duas versões de aparências distintas, de carrinho vazio ou com produtos.

# [BEM](https://en.bem.info/)

BEM é uma metodologia para organização de estilos baseada em componentes.

![](https://blog.decaf.de/content/images/2015/06/bem.png)

[documentação](http://getbem.com/introduction/)

> BEM não é única metodologia, mas ela é muito boa por ser menos complexa, tem uma boa terminologia e ainda fornece uma boa arquitetura.

A ideia por trás das metodologias como OOCSS e BEM é seguir o [Princípio da Responsabilidade Única](https://en.wikipedia.org/wiki/Single-responsibility_principle) onde cada bloco não deve se preocupar com os componentes ao seu entorno, não deve se preocupar com a **herança** deles apenas se preocupar consigo e com os elementos menores que fazem parte da sua **composição.**

E por que o bem? Segundo [Mark McDonnel(https://www.integralist.co.uk/posts/bem/#4) "The reason I choose BEM over other methodologies comes down to this: it’s less confusing than the other methods (i.e. SMACSS) but still provides us the good architecture we want (i.e. OOCSS) and with a recognisable terminology."

## Componentes visuais, apenas visuais e globais do BEM

Para quem não conhece, o [BEM](http://getbem.com/introduction/) é um padrão de escrita de componentes para o CSS. No BEM um componente se chama "bloco" (block), seus elementos internos se chamam "elementos" (elements) e cada variação que o componente pode ter se chama "variante" (variant) e isso resume o **BEM** são as iniciais de "**B**lock" + "**E**lement" + "**M**odifier".

E por que eu falei "VISUAL" "APENAS VISUAL" e "GLOBAL"? Eu acho muito importante ressaltar isso, as vezes se não se sabe e as vezes se "esquece".

- **Visual** é por que o BEM é um padrão de estilos apenas de classes CSS, ou seja não importa o que tem no html, se aplicar as classes do componente escrito em BEM ele terá o resultado esperado.
- **Apenas visual:** Chamar o componente de apenas visual é para limitar a sua definição, ele não é um componente "funcional" onde vai ter por exemplo envolver tanto o botão que abre o modal, como a caixa de diálogo, cada um dos elementos é um padrão visual único e ligados apenas por uma funcionalidade que vai além do visual, ou seja, além do BEM. Não é também um padrão que envolve semântica, por exemplo se um estilo de componente BEM do tipo cartão for aplicado a uma div, ela tem a função semântica de ser uma caixa de conteúdo, agora se esse estilo de cartão for aplicado a um botão ele continua sendo um elemento interativo, o estilo não muda isso.
- **Global** vem da ideia principal do BEM, criar componente no CSS para compartilhar entre todas as tecnologias JSP, React, Angular... Se não for para ter isso talvez nem seja preciso usar BEM.

**Porque eu iria querer um componente no CSS?**

Acho que o principal motivo é para dar a possibilidade de ter componentes em qualquer tecnologia, HTML puro, React, JSX, Angular... O CSS organizado em componentes é compartilhado entre todas as tecnologias e facilita muito a replicação. Também o BEM se propõe a organizar o código CSS, se aplicado certinho um arquivo com cada componente usando a nomenclatura padrão é muito mais escalável do que um CSS que não segue metodologia alguma. O BEM acaba seguindo uma linguagem de padrões onde cada elemento é único e não deve se preocupar com sua herança, isso diminui muito os efeitos colaterais.

## Bloco

["Um componente de página funcionalmente independente que **pode ser reutilizado¹**. Em HTML, os blocos são representados pelo atributo `class`."](https://en.bem.info/methodology/quick-start/#block) Um bloco descreve o que ele é "**botão, texto**, nunca seu estado **grande, vermelho**. O bloco cria um namespace para que os elementos dele sigam sua nomenclatura.

O elemento HTML que ele será posicionado não importa se ele for semânticamente compatível. Por exemplo o elemento `fieldset` não recebe `display: flex` no Firefox, isso deve ser considerado. Elementos como botões não funcionam muito bem com alturas e elementos flex.

O BEM é uma metodologia baseada em componentes, então ele [não deve saber do seu ambiente e nem alterá-lo](https://en.bem.info/methodology/quick-start/#block). Propriedades que você deve evitar no bloco: `margin`, `flex`, `order`, `top`, `position-absolute`

```html
<!-- `header` block -->
<header class="header">
  <!-- Nested `logo` block -->
  <div class="logo"></div>

  <!-- Nested `search-form` block -->
  <form class="search-form"></form>
</header>
```

## Elemento

Uma parte composta de um bloco que não pode ser usada separadamente dele. Sua nomenclatura é o nome do bloco a qual pertence + `__` + o nome da sub parte que também de ser nome de tipo e não de estado, assim como no bloco. Elementos são subpartes do bloco, então isso `block__elem1__elem2` não pode existir.

```html
<!-- `search-form` block -->
<form class="search-form">
  <!-- `input` element in the `search-form` block -->
  <input class="search-form__input">

  <!-- `button` element in the `search-form` block -->
  <button class="search-form__button">Search</button>
</form>
```

O HTML pode ser assim:

```html
<div class="block">
  <div class="block__elem1">
    <div class="block__elem2">
      <div class="block__elem3"></div>
    </div>
  </div>
</div>
```

Mas o CSS precisa ser:

```css
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

Assim você pode mexer na estrutura

```html
<div class="block">
  <div class="block__elem1">
    <div class="block__elem2"></div>
  </div>

  <div class="block__elem3"></div>
</div>
```

Segue a mesma lógica de não exigir um elemento semântico, apenas que seja compatível.

Apesar de tentador evite estilizar usando tags HTML, por exemplo:

```scss
// ruim
.card h2 {
  font-weight: bold;
}

// bom
.card__title {
  font-weight: bold;
}
```

Parece inofensivo, mas gerou um seletor `.card h2` com seletor de força 0.0.1.1, mais forte do que deveria. É sutil, é pouca coisa, mas pense na sobrescrita:

```scss
// como fica agora que foi feito seletor mais forte 0.0.2.1
.section-presentation .card h2 {
  font-weight: normal;
}

// como fica da forma correta 0.0.2.0
.section-presentation .card__title {
  font-weight: normal;
}
```

### É bloco ou elemento?

Se uma seção de código pode ser reutilizada e não depende da implementação de outros componentes de página, é um **bloco**. Se uma seção de código não puder ser usada separadamente sem a entidade pai, é um **elemento**.

As vezes é um pouco de cada. No exemplo abaixo o `search-form` é tanto um bloco que pode ser reutilizado em outros lugares como um elemento do header que pode ter propriedades proibidas pra um bloco: `margin`, `position`... O `header__search-form` descreve como o `search-form` é relativo ao `header`.

```html
<!-- `header` block -->
<div class="header">
  <!-- O bloco `search-form` está unido com o elemento `search-form` do bloco `header` -->
  <div class="search-form header__search-form"></div>
</div>
```

## Modificador

Uma entidade que define a aparência, estado ou comportamento de um bloco ou elemento. Originalmente o modificador era serparado por um `_`, mas "alguém" evoluiu para `--`.

```html
<!-- The `search-form` block has the `focused` Boolean modifier -->
<form class="search-form search-form--focused">
  <input class="search-form__input">

  <!-- The `button` element has the `disabled` Boolean modifier -->
  <button class="search-form__button search-form__button--disabled">Search</button>
</form>
```

Quando o modificador tem uma classificação, por exemplo `size`, `theme`... ele deve compor o nome do modificador, dessa forma `--nome-modificador-valor-modificador`.

```html
<!-- The `search-form` block has the `theme` modifier with the value `islands` -->
<form class="search-form search-form--theme-islands">
  <input class="search-form__input">

  <!-- The `button` element has the `size` modifier with the value `m` -->
  <button class="search-form__button search-form__button--size-m">Search</button>
</form>

<!-- You can't use two identical modifiers with different values simultaneously -->
<form class="search-form search-form--theme-islands search-form--theme-lite">
  <input class="search-form__input">

  <button class="search-form__button search-form__button--size-s search-form__button--size-m">
    Search
  </button>
</form>
```

O modificador pode ser como uma variação do componente ou elemento ou como um estado dele. Um modificador deve alterar a aparência, comportamento ou estado da entidade, não substituí-lo. Assim como no React não se deve criar mais que um estado quando não for necessário, vou mostrar nos exemplos abaixo:

ruim
```scss
.card {
  border: 1px solid gray;
  
  &__text {
    color: black;
    
    &--selected {
      color: green;
    }
  }
  
  &--selected {
    border-color: green;
  }
}
```

Nesse exemplo o "estado" foi duplicado, se o cartão está selecionado, o texto que o compõe também está. Então o correto é:

```scss
.card {
  border: 1px solid gray;
  
  &__text {
    color: black;
  }
  
  &--selected {
    border-color: green;
    
    .card__text {
      color: green;
    }
  }
}
```

[Voce pode usar o seletor "parent selector" do SASS](https://cssguidelin.es/#bem-like-naming)

```scss
.person { }
  .person__face {
    .person--handsome & { }
  }

.person--handsome { }
```

## Nomenclatura

https://github.com/bem/bem-sdk#naming

https://github.com/jomarcardoso/dojo-css-components/edit/master/README.md

BEM clássico

`block-name__elem-name_mod-name_mod-val`

BEM dois traços

`block-name__elem-name--mod-name--mod-val`

Camelcase

`blockName-elemName_modName_modVal`

Estilo React

`BlockName-ElemName_modName_modVal`

## Exemplo

[Um exemplo de antes e depois com BEM](https://cssguidelin.es/#bem-like-naming), algumas das perguntas que conduziram a esse resultado:

- `pro-user` pode ser usado sem o `profile`? Não. Então ele é um modificador do profile.
- `box` e `profile` possuem alguma ligação? Não. Então são blocos separados.
- `avatar` pode ser usado isoladamente, sem o profile? Sim. Então é um bloco separado.
- `bio` e `image` são dependentes de `profile`? Sim. Então são elementos do profile.

```html
<!-- antes -->
<div class="box  profile  pro-user">

  <img class="avatar  image" />

  <p class="bio">...</p>

</div>

<!-- depois -->
<div class="box  profile  profile--is-pro-user">

  <img class="avatar  profile__image" />

  <p class="profile__bio">...</p>

</div>
```

### Como funciona

![uma página com vários elementos, mostrando que alguns possuem modificadores e outros elementos internos](http://getbem.com/assets/github_captions.jpg)

### Como escrever

![](http://getbem.com/assets/github_buttons.jpg)

```css
.button {
	display: inline-block;
	border-radius: 3px;
	padding: 7px 12px;
	border: 1px solid #D5D5D5;
	background-image: linear-gradient(#EEE, #DDD);
	font: 700 13px/18px Helvetica, arial;
}
.button--state-success {
	color: #FFF;
	background: #569E3D linear-gradient(#79D858, #569E3D) repeat-x;
	border-color: #4A993E;
}
.button--state-danger {
	color: #900;
}
```

```html
<button class="button">
	Normal button
</button>
<button class="button button--state-success">
	Success button
</button>
<button class="button button--state-danger">
	Danger button
</button>
```

### Trabalhando com subníveis

Exemplo de https://www.integralist.co.uk/posts/bem/#4

```html
<section class="widget">
  <h1 class="widget__header">Sterling Calculator</h1>
  <form class="widget__form" action="process.php" method="post">
    <p>Please enter an amount: (e.g. 92p, &pound;2.12)</p>
    <p>
      <input name="amount" class="widget__input widget__input--amount"> 
      <input type="submit" value="Calculate" class="widget__input widget__input--submit">
    </p>
  </form>
</section>
```

O Widget é o namespace do bloco e tudo dentro dele são elementos dele.

```css
.widget {
  background-color: #FC3;
}

.widget__header {
  color: #930;
  font-size: 3em;
  margin-bottom: 0.3em;
  text-shadow: #FFF 1px 1px 2px;
}

.widget__input {
  border-radius: 5px;
  font-size: 0.9em;
  line-height: 1.3;
  padding: 0.4em 0.7em;
}

.widget__input--amount {
  border: 1px solid #930;
}

.widget__input--submit {
  background-color: #EEE;
  border: 0;
}
```

## Atomic Design ➕ BEM

Aplicando Atomic Design com BEM.

Alguns conceitos que são importante de saber antes de começarmos:

### O componente é uma identidade visual

As vezes iremos criarum componente no css com apenas uma linha, mas não por fazer pouco que ele não é um componente, por exemplo o `.form-group` do Bootstrap

----

![image](https://user-images.githubusercontent.com/27368585/87557348-2e242d80-c68e-11ea-8c05-d56ecd29c792.png)

----

perceba que tem uma identidade visual bem conhecida de label, input e mensagem, mas se for ver as propriedades que tem esse componente é apenas uma margem inferior.


### Faça a estrutura sem envolver outros componentes

Ao trabalhar com Atomic Design percebi vários efeitos colaterais quando usava um componente para formar a estrutura de outro.

```html
<div class="form-group">
  <label class="label">Telefone</label>
  <input class="input" type="tel" />
  <p class="message">possível mensagem de erro<p/>
</div>
```

Apesar dessa estrutura parecer servir para todos os casos que você pensou, pode aparecer alguém mais malandro e querer usar uma técnica que faz um "gap" nos elementos, essa técnica consistem em dar uma margem negativa no elemento pai e um "padding" nos elementos filhos, que daria um respiro entre todos ali dentro, porém o input não obedeceria ele colocaria um espaço interno que até sobrescreveria o que já existe no elemento.

### Quebre mais os componentes

Componentes muito grandes tratam de tanta coisa que por exemplo:

```html
<style>
  .card {
    border: 1px solid black;
  }
  
  .card__header,
  .cart__body {
    padding: 10px;
  }
  
  .card__header {
    border: 1px solid black;
  }
  
  .card .title {
    text-align: center;
  }
</style>
<section class="card">
  <div class="card__header">
    <h2 class="title">Título do cabeçalho</h2>
  </div>
  <div class="card__body">
    <h2 class="title">Título do corpo</h2>
    <p>
      Agora temos tanto o conteúdo do card como o cabeçalho sendo estilizado pelo card.
    </p>
  </div>
</section>
```

continua abaixo.

## Inimigos do BEM (os MAUS)

### Estilos do navegador

Acho que é indispensável para um bom uso um reset de tudo do navegador, praticamente um:

```css
* {
  border: 0;
  maring: 0;
  padding: 0;
  background: transparent;
  color: inherit;
  // ...
}
```

Não deixar nada, isso porque o BEM tem o intuito de ser agnóstico, independente de tecnologia e em parte do elemento semântico que está sendo usado. Por exemplo, se aplicar a classe `.link` a um botão se espera que ele tenha exatamente o estilo de um âncora com essa mesma classe, por isso o botão precisa estar completamente resetado. Outro motivo é para que não falte nada no componente BEM, não contar por exemplo com as bordas do input ou o alinhamento de texto de uma tabela.

### Encapsulamento de estilos

O intuito do BEM é ser comum entre várias tecnologias e nem todas possuem esse encapsulamento. As vezes pode ser preciso "quebrar" esse encapsulamento, que no Angular se faz com `:ng-deep`, esse código não seria o mesmo para outras tecnologias.

O BEM contribui muito para o reaproveitamento tanto de código fonte como da distribuição do CSS, então encapsular é o mesmo que esconder aquele CSS, não há reaproveitamento.

O encapsulamento de código passou a ser visto como algo "correto", mas talvez não se pensa que ele é uma solução muito ruim, pois se o projeto tem problemas relacionado a seletores fortes, seletores repetidos e conflitantes... Não deveria encapsular o código para se proteger disso e sim resolver esse problema o quanto antes. Pensa comigo, se escolher uma metodologia como o BEM, resetar todos os elementos 1x só e com um seletor 0.0.0.1, depois criar componentes BEM com seletores 0.0.1.0 e cada escrita ir gradualmente incrementando esse seletor conforme a necessidade, como isso daria errado? "Ah mas tem muitas equipes trabalhando no projeto", sim e ninguém gerencia isso, não é aí que está o problema? [Criar uma complexidade](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/) e duplicar os assets não deveria ser a primeira solução.

## Especificidade com BEM

O componente card não deveria fazer mais do que seu nome diz, faz uma caixa de conteúdo e morrer aí, agora, claro se for uma lei o header tem que ser centralizado.

```css
.card__header .title {
  text-align: center;
}
```

Ser mais assertivo onde vai aplicar para evitar que isso se propague.

## Tudo que o BEM resolve eu nem sabia

### Modularidade

Modularity
Block styles are never dependent on other elements on a page, so you will never experience problems from cascading.

You also get the ability to transfer blocks from your finished projects to new ones.

https://www.phase2technology.com/blog/used-and-abused-css

### Reusabilidade

Composing independent blocks in different ways, and reusing them intelligently, reduces the amount of CSS code that you will have to maintain.

With a set of style guidelines in place, you can build a library of blocks, making your CSS super effective.

### Estrutura

BEM methodology gives your CSS code a solid structure that remains simple and easy to understand.

### Sobrescrever componentes menores

Como a recomendação do BEM é que sempre a modificação venha acompanhada do elemento ou bloco em seu estado padrão. As sobrescritas em geral podem ser feitas sem pensar nas variantes do componente menor.

```html
<footer class="footer">
  <button class="button">button primary</button>
  <button class="button button--secondary">button secondary</button>
  <button class="button button--link">button link</button>
</footer>
```

```scss
.footer {
  background-color: black;
  
  .button {
    background-color: white;
    color: black;
  }
}
```

### Agnosticidade

BEM não escolhe framework, biblioteca, tag html, ele está ali para todos.

```css
.button {
  padding: 4px 8px;
  background-color: black;
  color: white;
  border: 2px solid black;
}

.button:hover {
  background-color: white;
  color: black;
}
```

```html
<button class="button">eu sou um botão</button>

<a class="button">"quem vê, diz que eu sou um botão"</a>
  
<div class="button">"claro que eu sou um botão, não ta vendo?"</div>
```

![imagem rick and morty rodeados de alienígenas fingindo ser da família](https://static.wikia.nocookie.net/rickandmorty/images/4/49/Total_Rickall.png/revision/latest?cb=20160920093829)

### Seletores fracos

Pensando que um componente está dentro de outro e que pelo conceito do Atomic Design até uma página é um componente, um componente atômico pode ter uma série de sobrescritas, mas graças ao padrão BEM, cada bloco e seus elementos tem sempre peso 0.0.1.0 e quando com modificador apenas o elemento modificado fica com a mesma força no seletor e os elementos filhos com força 0.0.2.0. O problema se agrava quando criado seletores [assim](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/) `ul > li + li`.

```scss
.home-page {
  .header {
    .search-bar {
      .button {
        border-radius: 4px;
      }
    }
  }
}
```

### Problemas de herança

O BEM é uma metodologia que [organiza seletores com nomes bem específicos](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/) como `.my-component__list-item` e isso diminui as chances dos estilos dos elmentos pai agirem sobre ele.

## Vai ser difícil acostumar com isso, como pode me ajudar?

Vamos começar pelos linters:

- [stylelint-selector-bem-pattern](https://www.npmjs.com/package/stylelint-selector-bem-pattern)
- [Stylelint BEM Namics (recomendo)](https://www.npmjs.com/package/@namics/stylelint-bem)

Recomendo muito esse segundo que apesar de não ser a prova de balas lembro que ele era muito exigente quanto a estrutura do componente em SASS.

Um bom material guia é [esse](https://cssguidelin.es/#bem-like-naming)

## Proibido

### Declarar um bloco dentro do outro

Se o bloco existe ele não deve contar com a herança de outro componente nem esconder seu uso, pois um padrão visual deve poder ser replicado em qualquer lugar. Um componente BEM já tem a função de criar um escopo único, não precisa "esconder mais código dentro dele", [nem tornar esses componente maiores](https://cssguidelin.es/#bem-like-naming)

### Criar mais camadas

Nunca crie um seletor do [tipo `.person__head__eye`](https://cssguidelin.es/#bem-like-naming) suas classes não precisam refletir toda a estrutura DOM.

### Combinar tag com classe

```css
.button.button {}
```

"Ah, mas não queremos que use essa classe onde não é botão". Mas por causa disso criaram um seletor mais... E como disse antes, o problema só aumenta. Não prefere instruir o usuário? Fazer testes?

Já pensou que o componente pode ter uma `role="button"`.

## Perguntas frequentes

**Se posso usar letras maiúsculas, porque não uso?** Dependendo do padrão você usa, mas no BEM isso não é necessário, foi com traços e travessões se obtem o mesmo resultado. O uso de letras maiúsculas seria uma quebra de padrão desnecessária.

**Não tem outros padrões melhores?** Acho que isso vai de encontro com a primeira frase desse documento que é: "aprenda, questione e por fim duvide". O BEM é o padrão mais difundido, ele deve solucinar o problema da maioria dos projetos... Mas a respondendo a pergunta, acho que pode ter sim, eu mesmo seguia o padrão [Suit CSS](https://suitcss.github.io/) e gostava muito dele. 

**Preciso fazer só uma página, preciso do BEM?** Hotsites e landing pages ficam a critério do desenvolvedor. Eu já recebi elogio por ter feito um CSS bem organizado mesmo sendo uma landing page. Na época eu usei o padrão BEM, porém não acho que precisa dele para deixar o código organizado.

**Farei mais de uma página, mas usarei apenas uma tecnologia, preciso do padrão BEM?** O maior benefício do BEM é criar um componente no CSS que pode ser compartilhado entre várias tecnologias, porém se não será usado mais do que uma tecnologia, por exemplo um template de email com [PugJS](https://pugjs.org/api/getting-started.html), os componente podem ser construídos nos arquivos `.pug` e a forma que esse CSS foi escrito não importa muito, pois quando precisa desse componente de novo basta incluir o componente pug que o estilo vem junto.

## Perguntas e respostas

1. Se um bloco é reutilizável, o que não podemos fazer com ele? Encapsular o seu CSS dentro de outro bloco.
