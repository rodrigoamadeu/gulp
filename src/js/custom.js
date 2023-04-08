$(document).ready(function(){    

    $('.owl-carousel').owlCarousel();  

    let titulos = $('h4') 

    let items = $('.featured-item') 
    
    let destaques = $('#featured')  
    
    console.log(titulos.first());   
   
    $('.featured-item a').addClass('btn btn-dark stretch-link');

    $('.featured-item:first h4').append('<span class="badge bg-secondary">Novo</span>')

    $('.featured-item h4').dblclick(function(){ 

        $(this).css({
            'color': '#f00',
            'background': '#ff0',
            'font-wheight': '100'
        })
    });


    $('.featured-item a').on('click', function(event){

        event.preventDefault();
        
        alert('Produto esgotado')
    }) 

    $('#form-submit').on('click', function(e){

        e.preventDefault() 

        if( $('#email').val() != '' ){
            
            $('#email').animate({
                opacity: "toggle",
                top: "-50"
            
            }, 500, function(){
                console.log($(this).val()) 
            })    
        }
    });    

    $('.nav-modal-open').on('click', function(e){ 
        
        e.preventDefault(); 

        let elem = $(this).attr('rel')  

        $('.modal-body').html($('#'+elem).html()) 

        $('.modal-header h5.modal-title').html($(this).text()) 

       let myModal = new bootstrap.Modal($('#modalId')) 

       myModal.show() 

    })

    function validate( elem ) { 
        
        if( elem.val () == '' ) {
            console.log(' o campo de ' + elem.attr('name') + ' é obrigatório')

            elem.parent().find('.text-muted').show()

            elem.addClass('invalid')
            return false

        } else if(elem.attr('name') == 'email'){
            validaEmail(elem);
        } else if(elem.attr('name') == 'cpf'){
            validaCpf(elem);
        } else {
            elem.parent().find('.text-muted').hide()
            elem.removeClass('invalid')
        }
    }

    function validaNome (elem) {
        const nome = elem.val();

        if(nome.length < 2) {
            console.log('O campo nome deve ter no mínio 2 caractreres')
            elem.parent().find('.text-muted').show();
            elem.addClass('invalid')
            return false;
        } else {
            elem.parent().find('.text-muted').hide()
            elem.removeClass('invalid');
            return true;
        }
    }

    function validaEmail(elem) {
        const email = elem.val();
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
        if (!regex.test(email)) {
          console.log('E-mail inválido');
          elem.parent().find('.text-muted').show();
          elem.addClass('invalid');
          return false;
        } else {
          elem.parent().find('.text-muted').hide();
          elem.removeClass('invalid');
          return true;
        }
    }

    function validaCpf(elem){
        const cpf = elem.val();
        const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        
        if(!regexCpf.test(cpf)) {
            console.log('CPF inválido')
            elem.parent().find('.text-muted').show();
            elem.addClass('invalid');
            return false;
       
        } else{
            elem.parent().find('.text-muted').hide();
            elem.removeClass('invalid');
            return true;
        }
    } 


    $('body').on('submit', '.modal-body .form', function(e){ 

        e.preventDefault()

        const inputName = $('#nome')
        
        validaNome(inputName)
        validate(inputName) 
       
        if( inputName.hasClass('invalid')){ 
            console.log('verificar campos obrigatórios')
            return false
        } else {
            $(this).submit()
        }
    })
    
    $('body').on('blur', '#nome', function(){
        validaNome($(this))
    })

    $('body').on('blur', '#email', function(){
        validaEmail($(this))
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
        validaCpf($(this))
    })
    
})

