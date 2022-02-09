# Componentes visuais do BEM

Para quem não conhece, o [BEM](http://getbem.com/introduction/) é um padrão de escrita de componentes para o CSS. No BEM um componente se chama "bloco" (block), seus elementos internos se chamam "elementos" (elements) e cada variação que o componente pode ter se chama "variante" (variant) e isso resume o **BEM** são as iniciais de "**B**lock" + "**E**lement" + "**M**odifier".

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

# Atomic Design ➕ BEM

Aplicando Atomic Design com BEM.

Alguns conceitos que são importante de saber antes de começarmos:

### O componente é uma identidade visual

As vezes iremos criarum componente no css com apenas uma linha, mas não por fazer pouco que ele não é um componente, por exemplo o `.form-group` do Bootstrap

----

![image](https://user-images.githubusercontent.com/27368585/87557348-2e242d80-c68e-11ea-8c05-d56ecd29c792.png)

----

perceba que tem uma identidade visual bem conhecida de label, input e mensagem, mas se for ver as propriedades que tem esse componente é apenas uma margem inferior.


## Faça a estrutura sem envolver outros componentes

Ao trabalhar com Atomic Design percebi vários efeitos colaterais quando usava um componente para formar a estrutura de outro.

```html
<div class="form-group">
  <label class="label">Telefone</label>
  <input class="input" type="tel" />
  <p class="message">possível mensagem de erro<p/>
</div>
```

Apesar dessa estrutura parecer servir para todos os casos que você pensou, pode aparecer alguém mais malando e querer usar uma técnica que faz um "gap" nos elementos, essa técnica consistem em dar uma margem negativa no elemento pai e um "padding" nos elementos filhos, que daria um respiro entre todos ali dentro, porém o input não obedeceria ele colocaria um espaço interno que até sobrescreveria o que já existe no elemento.

## Quebre mais os componentes

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

## Especificidade com BEM

O componente card não deveria fazer mais do que seu nome diz, faz uma caixa de conteúdo e morrer aí, agora, claro se for uma lei o header tem que ser centralizado.

```css
.card__header .title {
  text-align: center;
}
```

Ser mais assertivo onde vai aplicar para evitar que isso se propague.
