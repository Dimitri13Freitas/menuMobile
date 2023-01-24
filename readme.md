# Menu Mobile

Plugin para um menu mobile compativel com desktop.

```js
// 1 - Copie o arquivo menuMobile.js da pasta js e cole no seu site.

// 2 - Link o arquivo utilizando o import em seu arquivo javascript pessoal, Exemplo:
import { MenuMobile } from "./js/plugins/menuMobile.js";
```

ATENÇÃO, LEIA ABAIXO

Para que a importação funcione seu javascript pessoal precisa ser ´type='module'.

Exemplo:

```html
<script type="module" src="./js/script.js"></script>
```

```js
import { MenuMobile } from "./js/plugins/menuMobile.js";

// 4 - Atribua a uma variavel a classe escolhida, Exemplo:
const menu = new MenuMobile();
```

Para que o plugin funcione é necessario colocar dois elementos HTML como parâmetro da classe. Neste caso são:

- O container que será o elemento pai de tudo, que vai ser usado como 'wrapper'.
- E sua navegação.
  
Exemplo:

```js
const menu = new MenuMobile('wrapper', 'wrapper nav');
```

Logo após isso inicie o script com:

```js
menu.init();
```

Assim já está pronto para uso.

Se ainda resta alguma dúvida olhe a pasta de `example` no repositório.

## Menu Buttons

Para o uso de botões em seu menu identifique os botões com uma mesma classe ou id, passe o respectivo valor em:

```js
menu.menuButtons('.btns');
```

OBS: Para que os botões funcionem um dos botões precisam estar dentro do elemento pai, ou seja dentro do wrapper.

## CSS Mínimo

Qualquer propriedade a mais pode ser adicionada com base no seu projeto e necessidade.



```css
/* O 'padding-right' pode ter o valor que desejar, porém ele precisa existir.*/
.wrapper {
  padding-right: 30px;
  position: absolute;
  touch-action: none;
}
```

caso tenha dificuldades de aplicar o plugin da melhor forma olhe o diretório de `example` e use como base.