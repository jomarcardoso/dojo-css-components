> *Uma forma muito simples de aprender algo é seguir exatamente outra pessoa que faz aquela tarefa muito bem, depois que aprender tudo com ela,*
> *desenvolva a sua própria forma de fazer. No processo de aprendizado questionar é bom, dúvidar, nem tanto.* Jomar A. Cardoso

# [BEM](https://en.bem.info/)

BEM é uma metodologia, criada pelo Yandex, para organização de estilos, baseada em blocos. O BEM se propõe a organizar o código CSS, se aplicado certinho um arquivo com cada componente usando a nomenclatura padrão é muito mais escalável do que um CSS que não segue metodologia alguma. O BEM acaba seguindo uma linguagem de padrões onde cada elemento é único e não deve se preocupar com sua herança, isso diminui muito os efeitos colaterais.

<img src="https://blog.decaf.de/content/images/2015/06/bem.png" alt="" width="280">

> BEM não é única metodologia, mas ela é muito boa por ser menos complexa, tem uma boa terminologia e ainda fornece uma boa arquitetura.

A ideia por trás das metodologias como OOCSS e BEM é seguir o [Princípio da Responsabilidade Única](https://en.wikipedia.org/wiki/Single-responsibility_principle) onde cada bloco não deve se preocupar com os componentes ao seu entorno, não deve se preocupar com a **herança** deles apenas se preocupar consigo e com os elementos menores que fazem parte da sua **composição.**

E por que o BEM? Segundo [Mark McDonnel(https://www.integralist.co.uk/posts/bem/#4)

> "O motivo de eu escolher o BEM sobre as outras metodologias se resume a: "Ele é menos confuso do que os outros métodos, como SMACSS, mas ainda provê uma arquitetura boa, como o OOCSS e com uma terminologia fácil e agradável.

## Componentes visuais, apenas visuais e globais do [BEM](http://getbem.com/introduction/)

No BEM um componente se chama "bloco" (block), seus elementos internos se chamam "elementos" (elements) e cada variação que o componente pode ter se chama "modificador" (modifier) e isso resume o **BEM** são as iniciais de "**B**lock" + "**E**lement" + "**M**odifier". Essa convenção fica evidente na escrita da classe CSS:

```css
.block__element--modifier
```

E por que eu falei "VISUAL" "APENAS VISUAL" e "GLOBAL"? Eu acho muito importante ressaltar isso, as vezes se não se sabe e as vezes se "esquece".

- **Visual** é por que o BEM é focado apenas nos estilos, ou seja não importa o que tem no html, se aplicar as classes do componente escrito em BEM ele terá o resultado esperado.
- **Apenas visual:** Chamar o componente de apenas visual é para limitar a sua definição, ele não é um componente "funcional" onde vai ter por exemplo envolver tanto o botão que abre o modal, como a caixa de diálogo, cada um dos elementos é um padrão visual único e ligados apenas por uma funcionalidade que vai além do visual, ou seja, além do BEM. Não é também um padrão que envolve semântica, por exemplo se um estilo de componente BEM do tipo cartão for aplicado a uma div, ela tem a função semântica de ser uma caixa de conteúdo, agora, se esse estilo de cartão for aplicado a um botão ele continua sendo um elemento interativo, o estilo não muda isso.
- **Global** vem do principal benefício do BEM, criar componente no CSS para compartilhar entre todas as tecnologias JSP, React, Angular... O CSS organizado em componentes é compartilhado entre todas as tecnologias e facilita muito a replicação.

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

Cada bloco é um arquivo, isso ajuda muito a organizar os arquivos de estilos.

### É proibido declarar um bloco dentro do outro

Se o bloco existe ele não deve contar com a herança de outro componente nem esconder seu uso, pois um padrão visual deve poder ser replicado em qualquer lugar. Um componente BEM já tem a função de criar um escopo único, não precisa "esconder mais código dentro dele", [nem tornar esses componente maiores](https://cssguidelin.es/#bem-like-naming)

### É proibido combinar tag com classe

```css
.button.button {}
```

"Ah, mas não queremos que use essa classe onde não é botão". Mas por causa disso criaram um seletor mais forte e como disse antes, o problema só aumenta. Não prefere instruir o usuário? Fazer testes?

Já pensou que o componente pode ter uma `role="button"` ou mais simples `<input type="submit" class="button">`, e futuras tags e atributos ARIA, não tem como prever.

## Elemento

Uma parte composta de um bloco que não pode ser usada separadamente dele. Sua nomenclatura é o nome do bloco a qual pertence + `__` + o nome da sub parte que também de ser nome de tipo e não de estado, assim como no bloco. Elementos são subpartes do bloco, então [isso `block__elem1__elem2` não pode existir](https://cssguidelin.es/#bem-like-naming).

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

Para o seletor continuar fraco, é importante que a ordem das importações seja correta, então se o `header` pode sobrescrever o `search-form` ele deve ser declarado depois, e claro, não faz sentido ter uma dependência circular, o `search-form` nunca pode sobrescrever o header.

### Trabalhando com subníveis

![uma página com vários elementos, mostrando que alguns possuem modificadores e outros elementos internos](http://getbem.com/assets/github_captions.jpg)

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

## Modificador

Uma entidade que define a aparência, estrutura, estado ou comportamento de um bloco ou elemento. Originalmente o modificador era serparado por um `_`, mas "alguém" evoluiu para `--`. O modificador nunca substitui o bloco ou o elemento, apenas complementeta ele (`class="block block--modifier"`, `class="block__element block__element--modifier`).

```html
<!-- The `search-form` block has the `focused` Boolean modifier -->
<form class="search-form search-form--focused">
  <input class="search-form__input">

  <!-- The `button` element has the `disabled` Boolean modifier -->
  <button class="search-form__button search-form__button--disabled">Search</button>
</form>
```

Quando o modificador tem uma classificação, por exemplo `size`, `theme`... ele pode compor o nome do modificador, dessa forma `--nome-modificador-valor-modificador`.

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

Abaixo exemplo de como fica os botões do GitHub escritos em BEM.

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

Assim como no React não se deve criar mais que um estado quando não for necessário, vou mostrar nos exemplos abaixo:

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

**é bloco, é elemento ou é modificador?**

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

## Estrutura de arquivos

A proposta do Yandex ao meu ver um pouco antiquada, mas irei trazer ela de uma forma um pouco mais atualizada.

### Separar por significado e não por tipo (blocks)

Se existe apenas uma implementação que usara o CSS, então da para essa implementação junto ao CSS e não CSS para um lado e template para o outro. Fica assim:

```
- componentes
  - input
    input.js
    input.html
    input.css
  - popup
    popup.html
    popup.css
```

Eles falam também de colocar os elementos e modificadores em pastas separadas, inclusive os media-queries, que até fazem sentido daí. Mas é muita loucura, então nem vou trazer aqui.

As demais propostas de pastas só piora, então não vou falar delas.

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

O encapsulamento de código passou a ser visto como algo "correto", mas talvez não se pensa que ele é uma solução muito ruim, pois se o projeto tem problemas relacionado a seletores fortes, seletores repetidos e conflitantes... Não deveria encapsular o código para se proteger disso e sim resolver esse problema o quanto antes. Pensa comigo, se escolher uma metodologia como o BEM, resetar todos os elementos 1x só e com um seletor 0.0.0.1, depois criar componentes BEM com seletores 0.0.1.0 e cada escrita ir gradualmente incrementando esse seletor conforme a necessidade, como isso daria errado? "Ah mas tem muitas equipes trabalhando no projeto", sim e ninguém gerencia isso, não é aí que está o problema? [Criar uma complexidade](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/) e duplicar os assets não deveria ser a primeira solução.

O BEM contribui muito para o reaproveitamento tanto de código fonte como da distribuição do CSS, então encapsular é o mesmo que esconder aquele CSS, não há reaproveitamento. O intuito do BEM é ser comum entre várias tecnologias e nem todas possuem esse encapsulamento. As vezes pode ser preciso "quebrar" esse encapsulamento, que no Angular se faz com `:ng-deep`, esse código não seria o mesmo para outras tecnologias.

### Elementos personalizados HTML sem classe CSS

Bom, um elemento personalizado não é necessariamente ruim, problema é ele ser um elemento vazio sem classe alguma, pois isso vai dar problema de seletor forte e código incompatível com tecnologias que não usam elementos HTML personalizados. Vou mostrar como seria o uso correto:

```html
<header class="header">
  <app-logo class="header__logo"></app-logo>
</header>
```

Assim, no CSS, não precisa `.header app-logo` e sim `.header__logo` como seria em qualquer tecnologia.

Não só com elementos BEM, mas também para blocos, permitir que o elemento customizado "exista" sem qualquer propriedade ou então com propriedades colocadas na tag ou no elemento `:host` é algo que vai causar disparidades com outras tecnologias:

```scss
// errado: só funciona onde tem elementos customizados, o código fica encapsulado
:host {}

// errado: estiliza uma tag ao invés de uma classe, não funciona em outras tecnologias e tem seletor com força diferente
app-logo {}

// certo: aplicar uma classe no elemento personalizado e estilizar ele
.logo {}
```

## O que mais o BEM resolve?

### Modularidade e Single Responsability Principle

Um componente não só precisa se preocupar em ser bem feito, o seu contexto não importa. [Seus seletores possuem uma nomenclatura única](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/) como `.my-component__list-item` que evita muitos problemas de herança de estilos. Esses blocos podem ser usados de um projeto para o outro.

- https://www.phase2technology.com/blog/used-and-abused-css
- https://en.bem.info/methodology/css/#dividing-code-into-parts

### Open Closed Principle

O princípio diz "aberto para extensões e fechado para modificações". 

No exemplo abaixo botão "nunca" é modificado. Ele pode ser diferente em outros contextos, mas o botão mesmo permanecerá intacto.

```scss
.button {
  font-family: Arial, sans-serif;
  text-align: center;
  font-size: 11px;
  line-height: 20px;
}

.content .button {
  font-size: 13px;
  line-height: 24px;
}
```

### Don't Repeat Your Self Principle (reusabilidade)

Criar blocos e depois reusá-los de forma inteligente irá reduzir o *bundle* e o código fonte que terá que ser mantido.

> Os elementos dessa linguagem são entidades chamadas de padrão. Cada padrão descreve um problema que ocorre repetidas vezes em nosso meio ambiente e então descreve o ponto central da solução do problema, de modo que você possa usar a mesma solução milhares de vezes, mas sem jamais ter de repeti-la. [(Uma linguagem de padrões)](https://statics-submarino.b2w.io/sherlock/books/firstChapter/112900425.pdf).

![](https://en.bem.info/XaQb22P9DQRqcXbDlu2fhfjjtGA.svg)

Errado:

```html
<button class="button">...</button>
<button class="btn">...</button>
```

```scss
.button {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #000;
    background: #fff;
}

.btn {
    font-family: Arial, sans-serif;
    text-align: center;
    color: #000;
    background: rgba(255, 0, 0, 0.4);
}
```

Certo:

```html
<button class="button button_theme_islands">...</button>
<button class="button button_theme_simple">...</button>
```

```scss
.button {
    font-family: Arial, sans-serif;
    text-align: center;
}

.button_theme_islands {
    color: #000;
    background: #fff;
}

.button_theme_simple {
    color: #000;
    background: rgba(255, 0, 0, 0.4);
}
```

**atenção:** isso funciona apenas com componentes com a mesma funcionalidade, não reuse código para por exemplo aplicar a mesma cor.

### Estrutura de arquivos bem definidos

Cada arquivo de estilos em uma estrutura BEM, significa um bloco, fica muito fácil de encontrar e organizar esses arquivos. Os seletores dos blocos seguem o padrão kebab-case `.nome-do-bloco` que facilita muito na busca, por

### Sobrescrever componentes menores

Como a recomendação do BEM é que sempre a modificação venha acompanhada do elemento ou bloco em seu estado padrão. As sobrescritas em geral podem ser feitas sem pensar nas variantes do componente menor.

No exemplo abaixo fica evidente que usar blocos diferentes para cada botão teria muita dificuldade de sobrescrever todos.

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

Se os blocos se chamassem `.button`, `.button-secondary`, `.button-link` a sobrescrita do `.footer` precisaria ser aplicada a cada um deles.

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

Pensando que um componente está dentro de outro, um [componente menor](https://statics-submarino.b2w.io/sherlock/books/firstChapter/112900425.pdf) pode ter uma série de sobrescritas, mas graças ao padrão BEM, cada bloco e seus elementos tem sempre peso 0.0.1.0 e quando com modificador apenas o elemento modificado fica com a mesma força no seletor e os elementos filhos com força 0.0.2.0. O problema se agrava quando criado seletores [assim](https://blog.decaf.de/2015/06/24/why-bem-in-a-nutshell/) `ul > li + li`.

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

## Vai ser difícil acostumar com isso, como pode me ajudar?

### Antes de tudo, linters

- [stylelint-selector-bem-pattern](https://www.npmjs.com/package/stylelint-selector-bem-pattern)
- [Stylelint BEM Namics (recomendo)](https://www.npmjs.com/package/@namics/stylelint-bem)

Recomendo muito esse segundo que apesar de não ser a prova de balas lembro que ele era muito exigente quanto a estrutura do componente em SASS.

Um bom material guia é [esse](https://cssguidelin.es/#bem-like-naming)

### Do menor ao maior

Comece pelos componente menores, os Átomos, segundo o [Atomic Design](https://github.com/jomarcardoso/dojo-AtomicDesign/blob/master/README.md), pois aí você não cai no problema de colocar no componente coisas que afetam o seu ambiente. Por exemplo, a página de carrinho quer um botão flutuante para finalizar a compra, então primeiro crie um botão e depois o carrinho deve fazer a parte de torná-lo flutuante.

### Modificadores na raiz do bloco

Sempre pense primeiro se o modificador pode ser na raíz do bloco, isso para evitar de duplicar o estado dele desnecessariamente. Se por exemplo o bloco possui o modificador "ativo" todos os elementos dele "sabem" disso, basta alterá-los como quiser.

## Perguntas frequentes

### Não tem outros padrões melhores?

Acho que isso vai de encontro com a primeira frase desse documento que é: "aprenda, questione e por fim duvide". O BEM é o padrão mais difundido, ele deve solucinar o problema da maioria dos projetos... Mas a respondendo a pergunta, acho que pode ter sim, eu mesmo seguia o padrão [Suit CSS](https://suitcss.github.io/) e gostava muito dele. Mas resumindo o que estudei:

- SMACSS - complexo
- OOCSS - confuso, nomeclatura não claras e pode um desenvolvedor atrapalhar o outro

### Preciso fazer só uma página, preciso do BEM?

Hotsites e landing pages ficam a critério do desenvolvedor. Eu já recebi elogio por ter feito um CSS bem organizado mesmo sendo uma landing page. Na época eu usei o padrão BEM, porém não acho que precisa dele para deixar o código organizado.

### Farei mais de uma página, mas usarei apenas uma tecnologia, preciso do padrão BEM?

O maior benefício do BEM é criar um componente no CSS que pode ser compartilhado entre várias tecnologias, porém se não será usado mais do que uma tecnologia, por exemplo um template de email com [PugJS](https://pugjs.org/api/getting-started.html), os componente podem ser construídos nos arquivos `.pug` e a forma que esse CSS foi escrito não importa muito, pois quando precisa desse componente de novo basta incluir o componente pug que o estilo vem junto.

#### Exemplo com helpers CSS

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
