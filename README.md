> Uma forma muito simples de aprender algo é seguir exatamente outra pessoa que faz aquela tarefa muito bem, depois que aprender tudo com ela, desenvolva a sua própria forma de fazer. No processo de aprendizado questionar é bom, dúvidar nem tanto.

# Padrões de projeto

O conceito de criar padrões arquitetônicos surge no livro ["Uma linguagem de padrões"](https://statics-submarino.b2w.io/sherlock/books/firstChapter/112900425.pdf):

> Os elementos dessa linguagem são entidades chamadas de padrão. Cada padrão descreve um problema que ocorre repetidas vezes em nosso meio ambiente e então descreve o ponto central da solução do problema, de modo que você possa usar a mesma solução milhares de vezes, mas sem jamais ter de repeti-la. (Uma linguagem de padrões)

- cada componente é um padrão
- cada componente se repete várias vezes nos sites
- uma vez que o componente está criado só precisamos usar ele e não criá-lo novamente

> Cada padrão está conectado a certos padrões "maiores"(ou mais abrangentes), que estão acima dele, e a certos padrões "menores"(ou mais específicos) que estão abaixo, na linguagem. O padrão ajuda a completar aqueles padrões maiores e, ao mesmo tempo, é completado pelos padrões menores. (Uma linguagem de padrões)

- os componentes são formados por outros componentes.

No exemplo do livro sobre as praças fala que uma praça é constituída por vários elementos, como muro e ambiente para caminhar, enquanto também a praça faz parte de algo maior que são bairros e as cidades.

# Componentes visuais, apenas visuais e globais do BEM

Para quem não conhece, o [BEM](http://getbem.com/introduction/) é um padrão de escrita de componentes para o CSS. No BEM um componente se chama "bloco" (block), seus elementos internos se chamam "elementos" (elements) e cada variação que o componente pode ter se chama "variante" (variant) e isso resume o **BEM** são as iniciais de "**B**lock" + "**E**lement" + "**M**odifier".

E por que eu falei "VISUAL" e "GLOBAL"? Eu acho muito importante ressaltar isso, as vezes se "esquece".

- **Visual** é por que o BEM é um padrão de estilos apenas de classes CSS, ou seja não importa o que tem no html, se aplicar as classes do componente escrito em BEM ele terá o resultado esperado.
- **Apenas visual:** Chamar o componente de apenas visual é para limitar a sua definição, ele não é um componente "funcional" onde vai ter por exemplo envolver tanto o botão que abre o modal, como a caixa de diálogo, cada um dos elementos é um padrão visual único e ligados apenas por uma funcionalidade que vai além do visual, ou seja, além do BEM. Não é também um padrão que envolve semântica, por exemplo se um estilo de componente BEM do tipo cartão for aplicado a uma div, ela tem a função semântica de ser uma caixa de conteúdo, agora se esse estilo de cartão for aplicado a um botão ele continua sendo um elemento interativo.
- **Global** vem da ideia principal do BEM, criar componente no CSS para compartilhar entre todas as tecnologias JSP, React, Angular... Se não for para ter isso talvez nem seja preciso usar BEM.

**Porque eu iria querer um componente no CSS?**

Acho que o principal motivo é para dar a possibilidade de ter componentes em qualquer tecnologia, HTML puro, React, JSX, Angular... O CSS organizado em componentes é compartilhado entre todas as tecnologias e facilita muito a replicação.

## Helpers

O helper é uma forma de colocarmos CSS em linha de forma implícita.

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

**Atenção:** Um componente visual é diferente de um componente estrutural, por exemplo uma página de carrinho pode ter duas versões de aparências distintas de carinho vazio ou com produtos.

## BEM

Apesar de não ser tão complexo, o BEM é muito pouco documentado, ele deixa várias dúvidas, pois seus exemplos são muito simples. Espero aqui, extender a [documentação](http://getbem.com/introduction/) deles.

> BEM não é única metodologia, mas ela é muito boa por ser menos complexa, tem uma boa terminologia e ainda fornece uma boa arquitetura.

A ideia por trás das metodologias como OOCSS e BEM é seguir o [Princípio da Responsabilidade Única](https://en.wikipedia.org/wiki/Single-responsibility_principle) onde cada bloco não deve se preocupar com os componentes ao seu entorno, não deve se preocupar com a **herança** deles apenas se preocupar consigo e com os elementos menores que fazem parte da sua **composição.**

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

O encapsulamento de código passou a ser visto como algo "correto", mas talvez não se pensa que ele é uma solução muito ruim, pois se o projeto tem problemas relacionado a seletores fortes, seletores repetidos e conflitantes... Não deveria encapsular o código para se proteger disso e sim resolver esse problema o quanto antes. Pensa comigo, se escolher uma metodologia como o BEM, resetar todos os elementos 1x só e com um seletor 0.0.0.1, depois criar componentes BEM com seletores 0.0.1.0 e cada escrita ir gradualmente incrementando esse seletor conforme a necessidade, como isso daria errado? "Ah mas tem muitas equipes trabalhando no projeto", sim e ninguém gerencia isso, não é aí que está o problema? Criar uma complexidade e duplicar os assets não deveria ser a primeira solução.

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

Pensando que um componente está dentro de outro e que pelo conceito do Atomic Design até uma página é um componente, um componente atômico pode ter uma série de sobrescritas, mas graças ao padrão BEM, cada bloco e seus elementos tem sempre peso 0.0.1.0 e quando com modificador apenas o elemento modificado fica com a mesma força no seletor e os elementos filhos com força 0.0.2.0.

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

## Perguntas frequentes

**Se posso usar letras maiúsculas, porque não uso?** Dependendo do padrão você usa, mas no BEM isso não é necessário, foi com traços e travessões se obtem o mesmo resultado. O uso de letras maiúsculas seria uma quebra de padrão desnecessária.

**Não tem outros padrões melhores?** Acho que isso vai de encontro com a primeira frase desse documento que é: "aprenda, questione e por fim duvide". O BEM é o padrão mais difundido, ele deve solucinar o problema da maioria dos projetos... Mas a respondendo a pergunta, acho que pode ter sim, eu mesmo seguia o padrão [Suit CSS](https://suitcss.github.io/) e gostava muito dele.

**Preciso fazer só uma página, preciso do BEM?** Hotsites e landing pages ficam a critério do desenvolvedor. Eu já recebi elogio por ter feito um CSS bem organizado mesmo sendo uma landing page. Na época eu usei o padrão BEM, porém não acho que precisa dele para deixar o código organizado.

**Farei mais de uma página, mas usarei apenas uma tecnologia, preciso do padrão BEM?** O maior benefício do BEM é criar um componente no CSS que pode ser compartilhado entre várias tecnologias, porém se não será usado mais do que uma tecnologia, por exemplo um template de email com [PugJS](https://pugjs.org/api/getting-started.html), os componente podem ser construídos nos arquivos `.pug` e a forma que esse CSS foi escrito não importa muito, pois quando precisa desse componente de novo basta incluir o componente pug que o estilo vem junto.
