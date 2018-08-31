$(document).ready(function(){
    console.log('connector ready');
    
    //var url = 'https://script.google.com/macros/s/AKfycbzj6vQVk34syCXH8XjrJbN4Gy2dW-xACAI-SFSKTpmCPuT2gMM/dev'
    var url = 'https://script.google.com/macros/s/AKfycbzwjB3JcZq2wY2g8t6pSKnoyCX5PBiVO2mz3lt38ZdVk_cg4xE/exec'
               
    
    
        

        var objQuery = {}
        objQuery.f = "lista-lojas";
        //palestra.planilha = "PALESTRAS"
        //palestra.id = $('#cod-palestra').val(); 
    
        console.log(objQuery);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: objQuery, 
            success: function(result){
            console.log(result);

            var ul = document.getElementById("lista");

            for( var i = 0; i < result.length; i++ )
            { 
                var o = result[i];
                var li = document.createElement("li");
                li.appendChild(document.createTextNode(o.cidade));
                li.appendChild(document.createTextNode(" - "));
                li.appendChild(document.createTextNode(o.razaosocial));
                ul.appendChild(li);    
            }                   

            
            
            //$('#resultado').html(JSON.stringify(result));
            }
        });

  

    $('#submit-cadastrar').on('click', function(e) {
        e.preventDefault();

        var cadastro = {}
        cadastro.f='cadastro'
        cadastro.tipo = $('#tipo').val();
        cadastro.planilha = 'PRESENCA'; 
        cadastro.palestra = $('#cod-palestra').val(); 
        cadastro.nome = $('#nome').val();
        cadastro.ddd = $('#ddd').val();
        cadastro.whatsapp = $('#whatsapp').val();
        cadastro.email = $('#email').val();
        cadastro.categoria = $("#categor option:selected").text();
        cadastro.profissao = $('#profissao').val();
    
        console.log(cadastro);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: cadastro, 
            success: function(result){
            console.log(result);
            $(".pre-dados").hide('fast');
            $(".cadastro").hide('fast'); 
            $("#header").html(`<h4 class="container titulo">Por favor, avalie a nossa palestra!</h4>`);
            $("#questionario").show('fast');

            //$('#resultado').html(JSON.stringify(result));
            }
        });
        
    })

    $('#submit-questionario').on('click', function(e) {
        e.preventDefault();
        console.log(e);
        var radios = {}
        var dissertativas = {}
        var resposta = {}
        
        
        var objetivo = $('input[name="objetivo"]');
        radios.objetivo = objetivo.filter(':checked').val();
        if(!radios.objetivo){radios.objetivo = "0"}

        var conteudo = $('input[name="conteudo"]');
        radios.conteudo = conteudo.filter(':checked').val();
        if(!radios.conteudo){radios.conteudo = "0"}

        var clareza = $('input[name="clareza"]');
        radios.clareza = clareza.filter(':checked').val();
        if(!radios.clareza){radios.clareza = "0"}

        var palestrante = $('input[name="palestrante"]');
        radios.palestrante = palestrante.filter(':checked').val();
        if(!radios.palestrante){radios.palestrante = "0"}

        var duvidas = $('input[name="duvidas"]');
        radios.duvidas = duvidas.filter(':checked').val();
        if(!radios.duvidas){radios.duvidas = "0"}

        var ritmo = $('input[name="ritmo"]');
        radios.ritmo = ritmo.filter(':checked').val();
        if(!radios.ritmo){radios.ritmo = "0"}

        var visual = $('input[name="visual"]');
        radios.visual = visual.filter(':checked').val();
        if(!radios.visual){radios.visual = "0"}

        
        dissertativas.correspondeu = $('#pergunta1').val();
        dissertativas.tema = $('#pergunta2').val();
        dissertativas.timing = $('#pergunta3').val();
        dissertativas.sugestoes = $('#pergunta4').val();

        

        resposta.f='questionario'
        resposta.categoria = $("#categor option:selected").text();
        resposta.nome = $('#nome').val();
        resposta.adequacao = radios.objetivo
        resposta.conteudo = radios.conteudo
        resposta.clareza = radios.clareza
        resposta.palestrante = radios.palestrante
        resposta.duvidas = radios.duvidas
        resposta.ritmo = radios.ritmo
        resposta.visual= radios.visual
        resposta.satisfez = dissertativas.correspondeu
        resposta.pertinencia = dissertativas.tema
        resposta.timing = dissertativas.timing
        resposta.sugestoes = dissertativas.sugestoes

        console.log(resposta);

        $.ajax({
            url: url,
            method: "GET",
            dataType: "json",
            data: resposta, 
            success: function(result){
            console.log(result);
            
            $("#questionario").hide('fast');
            $("nav").hide('fast');
            $("footer").hide('fast');
            $("#header").html(temp(result));
            //$('#resultado').html(JSON.stringify(result));
            }
        });
        
    })
    
    
    function temp(obj){
       
        return `
        <div class="agradecimento">
            <h3 class="header">Tudo Certo!</h3>
            <div class="card horizontal">
            <div class="card-image">
                <img src="http://www.brasilengenharia.com/portal/images/stories/noticias/construcao/vedacit_feicon.jpg">
            </div>
            <div class="card-stacked">
                <div class="card-content">
                <h4>${obj.nome}</h4>
                <br><br>
                <h5>${obj.mensagem}
                </div>
                <div class="card-action">
                <a href="about:blank">Fechar</a>
                </div>
            </div>
            </div>
        </div>
            
        `
    }
    
    $.date = function(dateObject) {
        var d = new Date(dateObject);
        var day = d.getDate();
        var month = d.getMonth() + 1;
        var year = d.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = day + "/" + month + "/" + year;
    
        return date;
    };
     

 });