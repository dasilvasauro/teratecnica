// ============================================
// DOCUMENTAÇÃO DO JAVASCRIPT
// ============================================

/*
 * CONTROLE DE NAVEGAÇÃO ENTRE PÁGINAS
 * 
 * Este código controla a navegação entre as páginas do site,
 * implementando a funcionalidade de single page application.
 * A navbar não é animada novamente durante as transições.
 */

// Seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.nav-link[data-page]');
// Seleciona todas as páginas
const pages = document.querySelectorAll('.page');
// Seleciona o botão do WhatsApp
const whatsappButton = document.getElementById('whatsappButton');
// Seleciona o overlay do menu hamburger
const navbarOverlay = document.getElementById('navbarOverlay');
// Seleciona o botão Voltar ao Topo
const backToTopButton = document.getElementById('backToTop');
// Seleciona o botão do menu hamburger
const navbarToggler = document.getElementById('navbarToggler');
// Seleciona o menu colapsável
const navbarCollapse = document.getElementById('navbarNav');

// Adiciona evento de clique para cada link de navegação
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Obtém a página alvo do atributo data-page
        const targetPage = this.getAttribute('data-page');
        
        // Remove a classe active de todas as páginas e links
        pages.forEach(page => page.classList.remove('active'));
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Adiciona a classe active à página e link correspondentes
        document.getElementById(targetPage).classList.add('active');
        this.classList.add('active');
        
        // Fecha o menu hamburger se estiver aberto em dispositivos móveis
        if (navbarCollapse.classList.contains('show')) {
            // Usando Bootstrap para fechar o menu
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
        
        // Oculta o botão do WhatsApp na página de contato
        if (targetPage === 'contact') {
            whatsappButton.style.display = 'none';
        } else {
            whatsappButton.style.display = 'flex';
        }
        
        // Rola a página para o topo
        window.scrollTo(0, 0);
    });
});

// Seleciona todos os elementos com o atributo data-page que NÃO são links de navegação principais
const otherDataPageTriggers = document.querySelectorAll('*:not(.nav-link)[data-page]');

// Adiciona evento de clique para cada um desses elementos
otherDataPageTriggers.forEach(element => {
    element.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetPage = this.getAttribute('data-page');
        
        // Remove a classe active de todas as páginas
        pages.forEach(page => page.classList.remove('active'));
        // Remove a classe active de todos os links de navegação
        navLinks.forEach(navLink => navLink.classList.remove('active'));
        
        // Adiciona a classe active à página correspondente
        document.getElementById(targetPage).classList.add('active');
        
        // Ativa o link de navegação correspondente no menu principal
        const correspondingNavLink = document.querySelector(`.nav-link[data-page="${targetPage}"]`);
        if (correspondingNavLink) {
            correspondingNavLink.classList.add('active');
        }

        // Fecha o menu hamburger se estiver aberto em dispositivos móveis
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
        }
        
        // Oculta o botão do WhatsApp na página de contato
        if (targetPage === 'contact') {
            whatsappButton.style.display = 'none';
        } else {
            whatsappButton.style.display = 'flex';
        }
        
        // Rola a página para o topo
        window.scrollTo(0, 0);
    });
});


/*
 * CONTROLE DO MODO ESCURO
 * 
 * Este código controla a alternância entre modo claro e escuro,
 * salvando a preferência do usuário no localStorage.
 */

// Seleciona o toggle do modo escuro
const themeToggle = document.getElementById('themeToggle');

// Verifica se há uma preferência salva no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedTheme === 'dark') {
        themeToggle.checked = true;
    }
}

// Adiciona evento de mudança ao toggle
themeToggle.addEventListener('change', function() {
    if (this.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

/*
 * SLIDESHOW AUTOMÁTICO
 * 
 * Este código controla o slideshow automático na página de serviços,
 * alternando entre as imagens a cada 5 segundos.
 */

// Seleciona todos os slides
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

// Função para avançar para o próximo slide
function nextSlide() {
    // Remove a classe active do slide atual
    slides[currentSlide].classList.remove('active');
    
    // Avança para o próximo slide (ou volta ao primeiro se for o último)
    currentSlide = (currentSlide + 1) % slides.length;
    
    // Adiciona a classe active ao próximo slide
    slides[currentSlide].classList.add('active');
}

// Inicia o slideshow se houver slides na página
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

/*
 * CONTROLE DO MENU HAMBURGER - CORRIGIDO
 * 
 * Este código controla o comportamento do menu hamburger em dispositivos móveis,
 * incluindo o overlay que escurece o fundo quando o menu está aberto.
 * Agora o overlay aparece quando o menu é expandido e some quando é recolhido.
 */

// Inicializa o componente de colapso do Bootstrap
const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
    toggle: false
});

// Adiciona evento de clique ao botão do menu
navbarToggler.addEventListener('click', function() {
    // Alterna o estado do menu
    if (navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
    } else {
        bsCollapse.show();
    }
});

// Eventos para mostrar/esconder o overlay quando o menu é expandido/recolhido
navbarCollapse.addEventListener('show.bs.collapse', function() {
    navbarOverlay.classList.add('active');
});

navbarCollapse.addEventListener('hide.bs.collapse', function() {
    navbarOverlay.classList.remove('active');
});

// Fecha o menu ao clicar no overlay
navbarOverlay.addEventListener('click', function() {
    if (navbarCollapse.classList.contains('show')) {
        bsCollapse.hide();
    }
});

/*
 * BOTÃO VOLTAR AO TOPO - NOVO
 * 
 * Este código controla a exibição do botão "Voltar ao Topo"
 * e a rolagem suave quando o botão é clicado.
 */

// Mostra ou esconde o botão baseado na posição de rolagem
window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Rola suavemente para o topo quando o botão é clicado
backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/*
 * FORMULÁRIO DE CONTATO
 * 
 * Este código controla o envio do formulário de contato.
 * Como não há backend implementado, exibe um alerta com os dados.
 * 
 * INSTRUÇÕES PARA IMPLEMENTAR BACKEND:
 * 1. Crie um script PHP (ou outra linguagem) no servidor para processar o formulário
 * 2. Altere o método do formulário para POST e o action para o URL do script
 * 3. Adicione campos ocultos ou ajuste os nomes dos campos conforme necessário
 * 4. Implemente validação e sanitização no servidor
 * 5. Configure o envio de e-mail usando a função mail() do PHP ou uma biblioteca
 * 6. Adicione medidas de segurança como reCAPTCHA para prevenir spam
 */

// Seleciona o formulário de contato
const contactForm = document.getElementById('contactForm');

// Adiciona evento de envio ao formulário
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Coleta os dados do formulário
    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Exibe os dados (em produção, enviaria para o servidor)
    alert(`Obrigado pela mensagem, ${formData.firstName}!\n\nEm um ambiente de produção, esta mensagem seria enviada para nosso e-mail.\n\nDados coletados:\nNome: ${formData.firstName} ${formData.lastName}\nE-mail: ${formData.email}\nAssunto: ${formData.subject}\nMensagem: ${formData.message}`);
    
    // Limpa o formulário
    contactForm.reset();
});

// Oculta o botão do WhatsApp na página de contato ao carregar a página
if (window.location.hash === '#contact' || document.getElementById('contact').classList.contains('active')) {
    whatsappButton.style.display = 'none';
}