// o simbolo de $ instancia jquery e evita conflitos
// jQuery( function($){                              (pode-se iniciar o jQuery assim)
$(document).ready(function(){    

    $('.owl-carousel').owlCarousel();  // inicia o carrossel de imagens

    let titulos = $('h4') // seletor de tag 

    let items = $('.featured-item') // seletor de classe
    
    let destaques = $('#featured')  // seletor de id 
    
    console.log(titulos.first());   // busca primeiro elemento

    // Configuração de produtos

    $('.featured-item a').addClass('btn btn-dark stretch-link');

    $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')
    // $('.featured-item:first h4').start('<span class="badge"')  
    //$('.featured-item:first h4').addClass('active') // adiciona uma classe ativa
    //$('.featured-item:first h4').removeClass('active') //remove classe ativa
    //$('.featured-item:first h4').toogleClass('active') // primeiro você seleciona o elemento com: $('.featured-item:first h4'), depois coloca as funções de callback como:   .toogleClass('active')
    //$('.featured-item:first h4').hide() //adiciona display none no elemento
    //$('.featured-item:first h4').show() // dá um display block no elemento
    //$('.featured-item:first h4').fadeIn(5000) // .fadeIn ou fadeout(2000)transição adiciona uma transição ao elemento
    //$('.featured-item:first h4').css('color', '#ff0000') altera css diretamente em 1 parametro
    
    /* $('.featured-item:first h4').css({
      'color': '#f00',
        'background': '#ff0',
        'font-weight': '100'
    }) altera css em várias propriedades do css 


     $('.featured-item').mouseenter(function(){
       console.log($(this).find('h6').text());
     })  seleciona o elemento quando o mouse sai do elemento


     $('.featured-item').mouseleave(function(){
       console.log($(this).find('h4').text());
     })  seleciona o elemento que está dentro do this (.featured-item) quando passa mouse sobre ele */ 

    $('.featured-item h4').dblclick(function(){ // usando o this faz uma referencia nos elementos .featured-item h4
        $(this).css({
            'color': '#f00',
            'background': '#ff0',
            'font-wheight': '100'
        })
    });

    /*
    $('.featured-item').mouseenter(function(){
        console.log($(this).find('h4').text());
    })
        exibe o texto do elemento quando passa o mouse por cima    
    */

    /* $('.featured-item').hover(
        function(){
            console.log($(this).find('h4').text());
        },
        function(){
            console.log($(this).find('h4').text() + ' - ' + $(this).find('h6').text());
        }
     )     chama o primeiro elemento no hover e depois concatena o segundo elemento */

     // Manipulação de eventos

    $('.featured-item a').on('click', function(event){

        event.preventDefault();//remove a ação do link ao invés de seguir o link segue a função]
        
        alert('Produto esgotado')

        

    }) 

    /*
        Calback
        Entendendo ações que começam ao termino de outra
    */
    
    
    $('.featured-item:nth(1)') // através do seletor nth() você pode escolher o elemento
        .hide(4000, function(){  // produto esconde
            // este é o callback
            console.log( $(this).find('h4').text() + ' esgotado')
        })
        .show((4000), function(){
            console.log( $(this).find('h4').text() + 'em estoque') // produto aparece
    })


    // Animações

    const duracao = 1000 // equivalente a 1 segundo, vai fazer todas as chamadas abaixo, então com a varável do tempo de duração da animação você pode chamá-la quando quiser

    $('.featured-item:nth(0)')
        .hide(duracao)
        .show(duracao)
        .fadeOut(duracao)
        .fadeIn(duracao)
        .toggle(duracao) // opção dinamica, ele inverte o que estiver feito
        .toggle(duracao)

    $('#form-submit').on('click', function(e){

        e.preventDefault() // (e) e. previne conmportamento padrão de submeter o formulário

        if( $('#email').val() != '' ){
            
            $('#email').animate({
                opacity: "toggle",
                top: "-50"
            
            }, 500, function(){
                console.log($(this).val()) 
            })    
        }
    });    

    /*
     * Ouvinte de eventos .nav-modal-open
    */

    $('.nav-modal-open').on('click', function(e){ // abre o modal quando é clicado
        
        e.preventDefault(); // controla o evento

        let elem = $(this).attr('rel')  //cria variavel elemento e pega o item clicado pega o atributo com attr o atributo 'rel'

        $('.modal-body').html($('#'+elem).html()) // cria um seletor dinamico joga dentro do modal body o conteúdo referenciado no click e concatenou o conteúdo com a variável elemento 
        $('.modal-header h5.modal-title').html($(this).text()) // muda o título do modal conforme ele é acionada

       let myModal = new bootstrap.Modal($('#modalId')) // ação de abertura do modal selecionando o ID do modal

       myModal.show() // e coloca opção para exibir o modal

    })
    

    function validate( elem ) { // faz a validação no blur, quando tirado o cursor de dentro do elemento
        if( elem.val () == '' ) {
            console.log(' o campo de ' + elem.attr('name') + ' é obrigatório')

            elem.parent().find('.text-muted').show()

            elem.addClass('invalid')
            return false

        } else {
            elem.parent().find('.text-muted').hide()
            elem.removeClass('invalid')
        }
    }


    $('body').on('submit', '.modal-body .form', function(e){ // pegando evento com o jQuery para diminuir o tamanho do código. primeiro a classe depois o submit que é o botão e depois a função para controle total das ações da função e depois passa o  e.preventDefault
        e.preventDefault()

        const inputName = $('#nome')
        const inputEmail = $('#email')
        const inputCpf = $('#cpf')

        validate(inputName) // faz a validação do campo name também aqui na 'submit'
        validate(inputEmail)// faz a validação do campo email também aqui no 'submit' 
        validate(inputCpf)

        if(inputCpf.hasClass('invalid') || inputEmail.hasClass('invalid') || inputName.hasClass('invalid')){ // se algum dos inputs tiverem .hasClass('invalid') retorna false e volta para verificação do preenchimento novamente até estar preenchido e passar esse if
            console.log('verificar campos obrigatórios')
            return false
        } else {
            $(this).submit()
        }

    })

    $('body').on('blur', '#nome', function(){
        validate($(this))
    })

    $('body').on('blur', '#email', function(){
        validate($(this))
    })

    $('body').on('focus', '#date', function(){
        $(this).datepicker();
    })

    $('body').on('blur', '#date', function(){
        validate($(this))
        $(this).mask('00/00/000');
    })

    $('body').on('blur', '#time', function(){
        validate($(this))
        $(this).mask('00:00');
    })

    $('body').on('blur', '#cep', function(){
        validate($(this))
        $(this).mask('00000-000');
    })

    $('body').on('blur', '#phone', function(){
        validate($(this))
        $(this).mask('00000-0000');
    })

    $('body').on('blur', '#cpf', function(){
        validate($(this))
        $(this).mask('000.000.000-00');
    })

})

