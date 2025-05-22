# Site Surpresa para Gabi

Este é um site estático criado com HTML, CSS e JavaScript para celebrar o aniversário da Gabi, com um design romântico e elegante.

## Conteúdo

- **Tela de bloqueio com contador regressivo** que trava a tela até o aniversário
- **Senha de desbloqueio** para acesso antecipado
- **Fotos com frases de amor** ao lado, alternando o layout para criar um visual dinâmico
- **Joguinhos interativos** para diversão e momentos especiais
- **Mensagem especial** personalizada
- **Design responsivo** que se adapta a diferentes tamanhos de tela
- **Efeitos visuais** e animações suaves

## Características Especiais

- **Tela de bloqueio**: Impede o acesso ao conteúdo até a data do aniversário, com contador regressivo
- **Efeito de brilhos**: Animação de partículas brilhantes na tela de bloqueio
- **Layout moderno**: Cada foto é exibida com uma frase de amor ao lado, alternando o lado da foto e do texto
- **Efeito de ampliação**: Ao clicar nas fotos, elas são exibidas em tamanho maior em um lightbox
- **Animações suaves**: Incluindo um coração pulsante e efeitos de hover nas memórias
- **Tipografia elegante**: Uso de fontes cursivas para títulos e textos bem formatados

## Jogos Interativos

O site inclui três jogos divertidos e românticos:

1. **Jogo da Memória**: Um jogo clássico de memória com símbolos de amor. Encontre todos os pares para vencer!

2. **Palavras de Amor Embaralhadas**: Tente descobrir palavras românticas que estão com as letras embaralhadas.

3. **Quiz do Casal**: Um quiz personalizado com perguntas sobre o relacionamento e preferências pessoais.

## Como hospedar no GitHub Pages

Siga estes passos para hospedar o site no GitHub Pages:

1. **Crie um repositório no GitHub**
   - Acesse [GitHub](https://github.com) e faça login na sua conta
   - Clique no botão "+" no canto superior direito e selecione "New repository"
   - Dê um nome ao repositório (por exemplo, "surpresa-gabi")
   - Escolha a opção "Public" para que o GitHub Pages funcione gratuitamente
   - Clique em "Create repository"

2. **Inicialize o Git no seu projeto local**
   ```bash
   git init
   git add .
   git commit -m "Primeiro commit"
   ```

3. **Conecte seu repositório local ao GitHub**
   ```bash
   git remote add origin https://github.com/SEU-USUARIO/surpresa-gabi.git
   git branch -M main
   git push -u origin main
   ```

4. **Ative o GitHub Pages**
   - Vá para a página do seu repositório no GitHub
   - Clique em "Settings" (Configurações)
   - Role para baixo até a seção "Pages"
   - Em "Source", selecione "main" como branch e "/" (root) como pasta
   - Clique em "Save"
   - Aguarde alguns minutos para que o site seja publicado

5. **Acesse seu site**
   - Após a publicação, você receberá um link no formato:
   - `https://SEU-USUARIO.github.io/surpresa-gabi/`
   - Este é o endereço do seu site na web!

## Personalizando o site

Você pode personalizar o site editando os seguintes arquivos:

- `index.html` - Estrutura e conteúdo do site
- `js/script.js` - Funcionalidades e interatividade

### Personalizações específicas

#### Para alterar a data do aniversário:
Edite a linha `const targetDate = new Date("May 22, 2025 00:00:00").getTime();` no arquivo `js/script.js`

#### Para alterar a senha de desbloqueio:
Edite a linha `const backupPassword = "MEUAMOR2025";` no arquivo `js/script.js`

#### Para adicionar ou modificar frases de amor:
Edite o array `loveQuotes` no arquivo `js/script.js` (linhas 141-163)

#### Para alterar o número de fotos exibidas:
Modifique as linhas `const selectedImages = images.slice(0, 10);` e `const selectedQuotes = loveQuotes.slice(0, 10);` no arquivo `js/script.js`

#### Para personalizar os jogos:
- **Jogo da Memória**: Altere os símbolos no array `cardSymbols` no arquivo `js/script.js`
- **Palavras Embaralhadas**: Modifique a lista de palavras no array `loveWords` no arquivo `js/script.js`
- **Quiz do Casal**: Personalize as perguntas e respostas no array `quizQuestions` no arquivo `js/script.js`

#### Para alterar as cores do site:
As cores principais estão definidas no arquivo `index.html` dentro da tag `<style>`, procure por `#ff9a9e`, `#fecfef`, `#ff79c6` (tons de rosa)

---

Feito com ❤️ para Gabi
