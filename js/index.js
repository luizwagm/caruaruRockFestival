        if(localStorage.getItem("TOKENs")){
            window.tokenrt = localStorage.getItem("TOKENs");
        }else{
            localStorage.setItem('TOKENs', Math.ceil(Math.random() * Math.pow(10,10)));
            window.tokenrt = localStorage.getItem("TOKENs");
        }
$(document).ready(function(){

var pastaPrincipalConfig = 'http://192.185.215.205/~caruarurockfesti/configs/';
var pastaPrincipal = 'http://192.185.215.205/~caruarurockfesti/';

    $('ul.tabs').tabs();

    $(".button-collapse").sideNav();

    $('body').on('click','.lupa',function(){

      $('body').prepend('<div class="area-search z-depth-2"><div class="fechar_pesquisa"><span class="material-icons">close</span></div><input placeholder="Pesquisar" id="pesquisar" type="text"></div>');

      $('.area-search').show('fast');
      $('.area-search input').focus();
    });

    $('body').on('blur','.area-search input',function(){

      var valor = $(this).val();

      if(valor == ''){
        $('.area-search').hide('fast',function(){
            $(this).remove();
        });
      }

    });

    

    $('body').on('click','.fechar_pesquisa',function(){
        $('.area-search').hide('fast',function(){
            $(this).remove();
        });
    });

    $('body').on('click','.side-nav a',function(){

      var href = $(this).attr('href');
      var titulo = $(this).data('titulo');

      if(titulo == 'home'){
        $('#tudo').show();
        $("#ingressos").hide();
        $('.area_browser').remove();
      }else{
        $('#tudo').hide();
        $(href).show();
        $('.tabs').hide();

        $('body').append('<div class="area_browser"><iframe target="_parent" src="https://www.bilheteriadigital.com/caruaru-rock-festival-10-de-setembro"></iframe></div>');

      }


      if(titulo == 'home'){
        $('.titles').html('Rock<span class="destaqueNome">News</span>');
        $('.tabs').show();
      }else{
        $('.titles').html(titulo);
        $('.tabs').hide();
      }

      $('.button-collapse').sideNav('hide');

      return false;

    })

    $('body').on('click','.tabs a',function(){

        var titulo = $(this).data('titulo');

        if(titulo == 'RockNews'){
          $('.titles').html('Rock<span class="destaqueNome">News</span>');
        }else{
          $('.titles').html(titulo);
        }

    })

    /* aqui eu chamo função para listar as notícias */

      $.ajax({
        method: "POST",
        url: pastaPrincipalConfig+"webservice.php",
        data: { acao: 'listarSlide', token: tokenrt },
        success: function(data){

          var obj = jQuery.parseJSON(data);

          if(obj.promoID == 'ja'){
            $('#sorteios p').html(obj.promocao);
            $('#nomePromocoes').hide();
            $('#celularPromocoes').hide();
            $('#sorteios button').hide();
            $('#sorteios').prepend('<input type="hidden" id="idPromocao" value="'+obj.promoID+'">');
          }else{
            $('#sorteios p').html(obj.promocao);
            $('#sorteios').prepend('<input type="hidden" id="idPromocao" value="'+obj.promoID+'">');
          }

          $('#owl-demo').html(obj.conteudo);
          $('.noticias').html(obj.noticias);
          $('#videos').html(obj.videos);
          $('#enquetes p').html(obj.enquete);
          $('#enquetes').prepend('<input type="hidden" id="idEnquete" value="'+obj.enqueteID+'">');

          $("#owl-demo").owlCarousel({
            navigation : false,
            slideSpeed : 300,
            paginationSpeed : 400,
            singleItem : true,
            autoPlay: true

          });

        }
      })

      $('body').on('click','.abrir_video',function(){

        var link = $(this).attr('href');

        $('.tabs').hide();
        $('body').append('<div class="area_browser"><div class="material-icons bt_fechar_area_browser">close</div><iframe target="_parent" src="'+link+'"></iframe></div>');

        return false;

      })

      $('body').on('click','#enviar_resposta_enquete',function(){

        var res = $('#resposta').val();
        var nom = $('#nome').val();
        var idE = $('#idEnquete').val();

        $.ajax({
          method: "POST",
          url: pastaPrincipalConfig+"webservice.php",
          data: { acao: 'inserir_resposta', resposta: res, nome: nom, id: idE },
          success: function(data){

            var obj = jQuery.parseJSON(data);

            if(obj.status == '1'){

              $('#enquetes').html('Obrigado por responder, iremos analisar sua ideia com carinho! vlw :D');

            }else{
              alert('erro');
            }


          }
        })

        return false;


      })

      $('body').on('click','.bt_fechar_area_browser',function(){

        $('.tabs').show();
        $('.area_browser').remove();

      })

      $('body').on('click','.listagemNoticia, .item',function(){

        var id = $(this).data('noticia');
        $('.tabs').hide();

        $('body').append('<div class="area_browser"><div class="material-icons bt_fechar_area_browser">close</div><iframe target="_parent" src="'+pastaPrincipal+'noticia.php?id='+id+'"></iframe></div>');


      });

      $('body').on('click','.filtroNoticias',function(){

        var valor = $(this).data('value');

        $.ajax({
          method: "POST",
          url: pastaPrincipalConfig+"webservice.php",
          data: { acao: 'filtrarNoticia', categoria: valor },
          success: function(data){

            var obj = jQuery.parseJSON(data);

            $('.noticias').html(obj.noticias);

          }
        })

      })


});