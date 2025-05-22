document.addEventListener('DOMContentLoaded', function() {
    // --- Configuration ---
    const targetDate = new Date("May 22, 2025 00:00:00").getTime();
    const backupPassword = "MEUAMOR2025"; // Senha para desbloqueio manual

    // --- Elements ---
    const body = document.body;
    const lockScreen = document.getElementById('lock-screen');
    const mainContent = document.getElementById('main-content');
    const countdownElements = {
        days: document.getElementById('days'),
        hours: document.getElementById('hours'),
        minutes: document.getElementById('minutes'),
        seconds: document.getElementById('seconds'),
    };
    const passwordInput = document.getElementById('password-input');
    const unlockButton = document.getElementById('unlock-button');
    const errorMessage = document.getElementById('error-message');
    const sparkleContainer = document.getElementById('sparkle-container');
    const memoriesContainer = document.getElementById('memories-container');

    // Adicionar classe para controlar o overflow
    body.classList.add('lock-screen-visible');

    // --- Unlock Function ---
    function unlockSite() {
        lockScreen.style.opacity = '0';
        setTimeout(() => {
            lockScreen.classList.add('hidden');
            mainContent.classList.remove('hidden');

            // Alterar classes para controlar o overflow
            body.classList.remove('lock-screen-visible');
            body.classList.add('content-visible');

            setTimeout(() => mainContent.style.opacity = '1', 50);
            stopSparkles();
            loadMemories(); // Carregar as memórias quando o site for desbloqueado

            // Inicializar os jogos quando o site for desbloqueado
            initMemoryGame();
            initWordScramble();
            initQuiz();
        }, 1000); // Match CSS transition duration
    }

    // --- Countdown Logic ---
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            unlockSite();
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElements.days.textContent = String(days).padStart(2, '0');
        countdownElements.hours.textContent = String(hours).padStart(2, '0');
        countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
        countdownElements.seconds.textContent = String(seconds).padStart(2, '0');
    }, 1000);

    // --- Password Unlock Logic ---
    // Função para verificar a senha
    function checkPassword() {
        console.log("Verificando senha:", passwordInput.value);
        // Make password check case-insensitive
        if (passwordInput.value.toUpperCase() === backupPassword.toUpperCase()) {
            unlockSite();
        } else {
            errorMessage.classList.remove('hidden');
            passwordInput.classList.add('border-red-500'); // Add red border to input on error
            setTimeout(() => {
                errorMessage.classList.add('hidden');
                passwordInput.classList.remove('border-red-500'); // Remove red border
            }, 3000);
        }
    }

    // Adicionar evento de clique ao botão
    unlockButton.addEventListener('click', checkPassword);

    // Adicionar evento de tecla ao campo de senha
    passwordInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            checkPassword();
        }
    });

    // Garantir que o campo de senha esteja focável
    passwordInput.addEventListener('click', function(e) {
        e.stopPropagation();
        this.focus();
    });

    // --- Sparkle Effect on Lock Screen ---
    let sparkleIntervalId;

    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 1 + 's';
        sparkleContainer.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000); // Remove after animation
    }

    function startSparkles() {
        if (lockScreen && !lockScreen.classList.contains('hidden')) {
            sparkleIntervalId = setInterval(createSparkle, 200);
        }
    }

    function stopSparkles() {
        clearInterval(sparkleIntervalId);
        if (sparkleContainer) sparkleContainer.innerHTML = ''; // Clear existing sparkles
    }

    startSparkles();

    // Initial check in case the page is loaded after the target date
    if (new Date().getTime() > targetDate) {
        clearInterval(countdownInterval);
        unlockSite();
    }
});

// Função para carregar as memórias com fotos e frases
function loadMemories() {
    const memoriesContainer = document.getElementById('memories-container');
    const imageFolder = 'images/';

    // Lista de imagens (obtidas do diretório)
    const images = [
        'SnapInsta.to_361765181_658541556197480_4128835541546217209_n.jpg',
        'SnapInsta.to_362058292_827565815240565_6208340828499729903_n.jpg',
        'SnapInsta.to_394263887_309272908511547_2204710994456573326_n.jpg',
        'SnapInsta.to_394265250_981645509596131_4901966899526445310_n.jpg',
        'SnapInsta.to_421831376_280569198089607_3146422180344540540_n.jpg',
        'SnapInsta.to_421999709_1082333586300587_2900435644345748431_n.jpg',
        'SnapInsta.to_422523640_1105834050410700_676483499021480046_n.jpg',
        'SnapInsta.to_422632972_3749857318568430_476632734268006113_n.jpg',
        'SnapInsta.to_422762594_925953705778804_17068343966197909_n.jpg',
        'SnapInsta.to_432270888_368680199377238_3857853168098415198_n.jpg',
        'SnapInsta.to_438884115_456271593503577_8147112098346127056_n.jpg',
        'SnapInsta.to_468414501_1084181919922893_4272181508941085436_n.jpg',
        'SnapInsta.to_468514528_899373512302760_7133109055517100028_n.jpg',
        'SnapInsta.to_469439076_1035385461694891_4506551055153316049_n.jpg',
        'SnapInsta.to_471620687_3063612067126453_2954013305400693481_n.jpg',
        'SnapInsta.to_471826131_581186574663531_6103816381754097101_n.jpg',
        'SnapInsta.to_472889728_615359114404457_8342088654196945177_n.jpg',
        'SnapInsta.to_473083256_512288291278962_5226517607774407676_n.jpg',
        'SnapInsta.to_488040003_18497287459058465_6168332353975090843_n.jpg',
        'SnapInsta.to_488213528_707978338223854_5544409655591471280_n.jpg',
        'SnapInsta.to_488385594_18497287441058465_731690535752096756_n.jpg'
    ];

    // Frases de amor para cada memória
    const loveQuotes = [
        'Seu sorriso é a minha luz favorita, iluminando até os dias mais escuros com um brilho que só você possui.',
        'Cada momento ao seu lado é um tesouro que guardo no coração. Você traz cor e alegria para minha vida todos os dias.',
        'Nosso amor é como uma história que fica mais bonita a cada página que viramos juntos. Você é o melhor capítulo da minha vida.',
        'Quando estou com você, até os dias mais comuns se transformam em momentos extraordinários. Seu amor me faz querer ser uma pessoa melhor a cada dia.',
        'Aventurar-se pela vida com você é a maior jornada que eu poderia desejar. Cada desafio se torna mais leve quando estamos juntos.',
        'Seu sorriso é o meu lugar favorito no mundo. Quando você sorri, tudo parece possível e o mundo fica mais bonito.',
        'As memórias que criamos juntos são o tesouro mais valioso que possuo. Cada momento com você é uma joia preciosa no álbum da nossa vida.',
        'Crescer ao seu lado tem sido a maior bênção. Aprendo algo novo sobre amor e companheirismo todos os dias com você.',
        'A alegria que você traz para minha vida é incomparável. Seu jeito de ser me encanta e me faz sorrir mesmo nos dias mais difíceis.',
        'Nossa história de amor é meu conto de fadas favorito. Você é o sonho que eu nem sabia que tinha, mas que agora não posso viver sem.',
        'O que sinto por você é o amor mais verdadeiro e profundo que já experimentei. Você é meu porto seguro, meu lar.',
        'Juntos somos mais fortes do que qualquer desafio que a vida possa nos apresentar. Seu amor me dá força para enfrentar qualquer obstáculo.',
        'Cada dia ao seu lado é uma nova oportunidade de te amar ainda mais. Você torna especial até os momentos mais simples.',
        'Nosso amor é único e especial, assim como você. Não há ninguém no mundo que poderia ocupar seu lugar em meu coração.',
        'Os momentos que passamos juntos ficam para sempre gravados em meu coração. Você é parte das minhas melhores lembranças.',
        'Meu amor por você não pode ser medido ou explicado. É simplesmente infinito, crescendo a cada dia que passa.',
        'A felicidade que sinto ao seu lado é indescritível. Você completa minha vida de uma forma que palavras não podem expressar.',
        'O caminho que percorremos juntos é o mais bonito que já trilhei. Cada passo ao seu lado é uma nova aventura.',
        'Você me inspira a ser melhor a cada dia. Seu amor, sua força e sua determinação são minha maior motivação.',
        'Compartilhar sonhos com você é a melhor parte da minha vida. Juntos, podemos alcançar qualquer coisa que desejarmos.',
        'Nossa jornada de amor está apenas começando, e mal posso esperar para descobrir todas as maravilhas que ainda viveremos juntos.'
    ];

    // Selecionar 10 imagens para exibir
    const selectedImages = images.slice(0, 10);
    const selectedQuotes = loveQuotes.slice(0, 10);

    // Criar elementos de memória
    selectedImages.forEach((image, index) => {
        const memoryItem = document.createElement('div');
        memoryItem.className = 'memory-item';

        // Div para a imagem
        const imageDiv = document.createElement('div');
        imageDiv.className = 'memory-image';
        imageDiv.style.height = '300px'; // Altura fixa para todas as imagens
        imageDiv.style.minHeight = '200px'; // Altura mínima para dispositivos móveis

        const img = document.createElement('img');
        img.src = imageFolder + image;
        img.alt = 'Foto com Gabi';
        img.loading = 'lazy'; // Carregamento lazy para melhor performance

        imageDiv.appendChild(img);

        // Div para o texto
        const textDiv = document.createElement('div');
        textDiv.className = 'memory-text';

        const quoteP = document.createElement('p');
        quoteP.className = 'text-lg text-gray-800 leading-relaxed font-lato';
        quoteP.style.fontSize = '1.125rem';
        quoteP.style.lineHeight = '1.8';
        quoteP.style.padding = '0.5rem';
        quoteP.textContent = selectedQuotes[index];

        textDiv.appendChild(quoteP);

        // Adicionar à memória
        memoryItem.appendChild(imageDiv);
        memoryItem.appendChild(textDiv);

        // Adicionar ao container
        memoriesContainer.appendChild(memoryItem);

        // Adicionar efeito de clique para ampliar a imagem
        imageDiv.addEventListener('click', function() {
            openLightbox(imageFolder + image);
        });
    });

    // Adicionar lightbox ao body
    addLightbox();
}

// Função para adicionar lightbox
function addLightbox() {
    // Verificar se já existe um lightbox
    if (document.getElementById('custom-lightbox')) return;

    const lightbox = document.createElement('div');
    lightbox.id = 'custom-lightbox';
    lightbox.className = 'fixed inset-0 z-50 hidden bg-black bg-opacity-90 flex items-center justify-center';
    lightbox.innerHTML = `
        <div class="relative max-w-4xl mx-auto p-4">
            <button class="absolute top-0 right-0 text-white text-4xl p-2">&times;</button>
            <img id="lightbox-img" src="" alt="Imagem ampliada" class="max-h-[80vh] max-w-full object-contain">
        </div>
    `;
    document.body.appendChild(lightbox);

    // Fechar lightbox ao clicar no botão
    lightbox.querySelector('button').addEventListener('click', function() {
        lightbox.classList.add('hidden');
    });

    // Fechar lightbox ao clicar fora da imagem
    lightbox.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.add('hidden');
        }
    });
}

// Função para abrir o lightbox
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('custom-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');

    lightboxImg.src = imgSrc;
    lightbox.classList.remove('hidden');
}

// ===== JOGO DA MEMÓRIA =====
function initMemoryGame() {
    const gameBoard = document.getElementById('memory-game');
    const movesCountEl = document.getElementById('moves-count');
    const pairsFoundEl = document.getElementById('pairs-found');
    const resetGameButton = document.getElementById('reset-memory-game');
    const winMessageEl = document.getElementById('memory-win-message');

    // Símbolos para o jogo da memória
    const cardSymbols = ['❤️', '💖', '💕', '💓', '💗', '💘', '💝', '💞'];
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    const totalPairs = cardSymbols.length;

    function createGameBoard() {
        // Duplicar símbolos para formar pares e embaralhar
        const gameCardsData = [...cardSymbols, ...cardSymbols]
            .sort(() => 0.5 - Math.random());

        gameBoard.innerHTML = ''; // Limpar tabuleiro anterior
        cards = []; // Resetar array de cartas
        matchedPairs = 0;
        moves = 0;
        movesCountEl.textContent = moves;
        pairsFoundEl.textContent = matchedPairs;
        winMessageEl.classList.add('hidden');

        gameCardsData.forEach(symbol => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('memory-card');
            cardElement.dataset.symbol = symbol;

            const cardFace = document.createElement('span');
            cardFace.classList.add('card-face');
            cardFace.textContent = symbol;
            cardElement.appendChild(cardFace);

            cardElement.addEventListener('click', handleCardClick);
            gameBoard.appendChild(cardElement);
            cards.push(cardElement);
        });
    }

    function handleCardClick(event) {
        const clickedCard = event.currentTarget;

        // Ignorar se a carta já está virada, já foi encontrada, ou se já há 2 cartas viradas
        if (clickedCard.classList.contains('flipped') ||
            clickedCard.classList.contains('matched') ||
            flippedCards.length === 2) {
            return;
        }

        flipCard(clickedCard);
        flippedCards.push(clickedCard);

        if (flippedCards.length === 2) {
            moves++;
            movesCountEl.textContent = moves;
            checkForMatch();
        }
    }

    function flipCard(card) {
        card.classList.add('flipped');
    }

    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.symbol === card2.dataset.symbol) {
            // Par encontrado
            card1.classList.add('matched');
            card2.classList.add('matched');
            matchedPairs++;
            pairsFoundEl.textContent = matchedPairs;
            flippedCards = [];

            if (matchedPairs === totalPairs) {
                winMessageEl.classList.remove('hidden');
            }
        } else {
            // Não é um par, virar de volta após um delay
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                flippedCards = [];
            }, 1000);
        }
    }

    // Inicializar o jogo
    createGameBoard();

    // Adicionar evento para reiniciar o jogo
    resetGameButton.addEventListener('click', createGameBoard);
}

// ===== JOGO DE PALAVRAS EMBARALHADAS =====
function initWordScramble() {
    const scrambledWordEl = document.getElementById('scrambled-word');
    const wordGuessInput = document.getElementById('word-guess');
    const checkWordButton = document.getElementById('check-word');
    const nextWordButton = document.getElementById('next-word');
    const wordResultEl = document.getElementById('word-result');

    // Lista de palavras relacionadas ao amor
    const loveWords = [
        'AMOR', 'CARINHO', 'PAIXAO', 'BEIJO', 'ABRACO',
        'ROMANCE', 'CORACAO', 'SAUDADE', 'TERNURA', 'AFETO',
        'NAMORO', 'CASAMENTO', 'ALIANCA', 'FELICIDADE', 'ETERNO'
    ];

    let currentWord = '';
    let currentScrambled = '';

    // Função para embaralhar uma palavra
    function scrambleWord(word) {
        const letters = word.split('');
        for (let i = letters.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [letters[i], letters[j]] = [letters[j], letters[i]];
        }

        // Garantir que a palavra embaralhada seja diferente da original
        const scrambled = letters.join('');
        return scrambled === word ? scrambleWord(word) : scrambled;
    }

    // Função para selecionar uma nova palavra
    function selectNewWord() {
        const randomIndex = Math.floor(Math.random() * loveWords.length);
        currentWord = loveWords[randomIndex];
        currentScrambled = scrambleWord(currentWord);
        scrambledWordEl.textContent = currentScrambled;
        wordGuessInput.value = '';
        wordResultEl.classList.add('hidden');
    }

    // Função para verificar a resposta
    function checkAnswer() {
        const guess = wordGuessInput.value.trim().toUpperCase();

        if (guess === currentWord) {
            wordResultEl.textContent = 'Correto! ❤️';
            wordResultEl.className = 'text-lg font-bold mb-2 text-green-500';
        } else {
            wordResultEl.textContent = 'Tente novamente!';
            wordResultEl.className = 'text-lg font-bold mb-2 text-red-500';
        }

        wordResultEl.classList.remove('hidden');
    }

    // Adicionar eventos
    checkWordButton.addEventListener('click', checkAnswer);
    nextWordButton.addEventListener('click', selectNewWord);
    wordGuessInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });

    // Inicializar com uma palavra
    selectNewWord();
}

// ===== QUIZ DO CASAL =====
function initQuiz() {
    const quizQuestionEl = document.getElementById('quiz-question');
    const quizOptionsEl = document.getElementById('quiz-options');
    const nextQuestionButton = document.getElementById('next-question');
    const quizResultEl = document.getElementById('quiz-result');
    const quizScoreEl = document.getElementById('quiz-score');
    const correctAnswersEl = document.getElementById('correct-answers');
    const totalQuestionsEl = document.getElementById('total-questions');

    // Perguntas do quiz (personalize com informações do casal)
    const quizQuestions = [
        {
            question: 'Quando começamos a namorar?',
            options: ['24/02/2017', '14/02/2017', '24/02/2018', '14/02/2018'],
            correctAnswer: 0
        },
        {
            question: 'Qual é a minha comida favorita?',
            options: ['Pizza', 'Hambúrguer', 'Sushi', 'Lasanha'],
            correctAnswer: 1 // Altere para a resposta correta
        },
        {
            question: 'Qual foi nosso primeiro filme juntos no cinema?',
            options: ['Quatro Vidas de um Gato', 'Quatro Vidas de um Cachorro', 'Star Wars', 'Velozes e Furiosos'],
            correctAnswer: 1 // Altere para a resposta correta
        },
        {
            question: 'Qual é a minha cor favorita?',
            options: ['Azul', 'Vermelho', 'Rosa', 'Verde'],
            correctAnswer: 0 // Altere para a resposta correta
        },
        {
            question: 'Qual desses destinos você mais gostaria de visitar comigo (Eu que estou certo)?',
            options: ['Paris', 'Tóquio', 'Nova York', 'Grécia'],
            correctAnswer: 1 // Altere para a resposta correta
        }
    ];

    let currentQuestionIndex = 0;
    let correctAnswers = 0;
    let selectedOptionIndex = -1;

    // Função para mostrar a pergunta atual
    function showQuestion() {
        const question = quizQuestions[currentQuestionIndex];
        quizQuestionEl.textContent = question.question;

        quizOptionsEl.innerHTML = '';
        question.options.forEach((option, index) => {
            const optionEl = document.createElement('div');
            optionEl.className = 'quiz-option font-lato';
            optionEl.style.fontSize = '1.1rem';
            optionEl.textContent = option;
            optionEl.dataset.index = index;

            optionEl.addEventListener('click', () => {
                // Remover seleção anterior
                document.querySelectorAll('.quiz-option').forEach(el => {
                    el.classList.remove('selected');
                });

                // Selecionar esta opção
                optionEl.classList.add('selected');
                selectedOptionIndex = index;
            });

            quizOptionsEl.appendChild(optionEl);
        });

        // Resetar seleção
        selectedOptionIndex = -1;

        // Esconder resultado anterior
        quizResultEl.classList.add('hidden');
    }

    // Função para verificar resposta e passar para próxima pergunta
    function nextQuestion() {
        // Se uma opção foi selecionada, verificar resposta
        if (selectedOptionIndex !== -1) {
            const correctIndex = quizQuestions[currentQuestionIndex].correctAnswer;

            // Marcar opções como corretas/incorretas
            const options = document.querySelectorAll('.quiz-option');
            options[correctIndex].classList.add('correct');

            if (selectedOptionIndex !== correctIndex) {
                options[selectedOptionIndex].classList.add('incorrect');
            } else {
                correctAnswers++;
            }

            // Atualizar pontuação
            correctAnswersEl.textContent = correctAnswers;
            totalQuestionsEl.textContent = quizQuestions.length;
            quizScoreEl.classList.remove('hidden');

            // Avançar para próxima pergunta após um delay
            setTimeout(() => {
                currentQuestionIndex++;

                if (currentQuestionIndex < quizQuestions.length) {
                    showQuestion();
                } else {
                    // Quiz completo
                    quizQuestionEl.textContent = '';
                    quizOptionsEl.innerHTML = '';
                    quizResultEl.textContent = `Você acertou ${correctAnswers} de ${quizQuestions.length} perguntas!`;
                    quizResultEl.classList.remove('hidden');
                    nextQuestionButton.textContent = 'Recomeçar Quiz';

                    // Adicionar mensagem personalizada baseada na pontuação
                    let message = '';
                    if (correctAnswers === quizQuestions.length) {
                        message = 'Uau! Você me conhece perfeitamente! ❤️';
                    } else if (correctAnswers >= quizQuestions.length * 0.7) {
                        message = 'Muito bom! Você me conhece bem! 💕';
                    } else if (correctAnswers >= quizQuestions.length * 0.4) {
                        message = 'Não está mal! Vamos conversar mais! 😊';
                    } else {
                        message = 'Hmm, precisamos passar mais tempo juntos! 😉';
                    }

                    const messageEl = document.createElement('p');
                    messageEl.textContent = message;
                    messageEl.className = 'text-lg text-pink-600 mt-2';
                    quizResultEl.appendChild(messageEl);
                }
            }, 1500);
        } else if (currentQuestionIndex >= quizQuestions.length) {
            // Reiniciar quiz
            currentQuestionIndex = 0;
            correctAnswers = 0;
            nextQuestionButton.textContent = 'Próxima Pergunta';
            showQuestion();
        } else {
            // Nenhuma opção selecionada, mostrar alerta
            alert('Por favor, selecione uma opção!');
        }
    }

    // Adicionar evento para o botão de próxima pergunta
    nextQuestionButton.addEventListener('click', nextQuestion);

    // Inicializar com a primeira pergunta
    showQuestion();
}
