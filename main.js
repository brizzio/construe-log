
    var gmap;
    var table;
    var tabCliVedacit;
    var errlocal = [];
    var acertos = 0;
    var erros = 0;
    var pinBase ={};
    var bar;
    //cnpj	raiz	tipo	abertura	razao	logra	num	compl	bairro	cep	cod_ibge	uf	cidade	dddcel	
    //cel	dddcel2	cel2	dddcel3	cel3	dddfone	fone	dddfone2	fone2	dddfone3	fone3	dddfone4	
    //fone4	dddfone5	fone5	dddfax	fax	dddP	foneP	dddO	foneO	TC	cnae	cnae_descricao	cnae_s	
    //COD_NATJUR	nat_jur_desc_r	nat_jur_desc	COD_NATJU_S	CO_CEI_VIN	func	funcg	PORTE	
    //fx_func	FX_FUNC2	fx	mei	cpf		socioP	rm	tc	NIXIE	REGIAO	divisao	grupo	classe	
    //latitude	longitude	Status
    
    
    
    function preload() {
      
      table = loadTable("anamanco1000.txt", "tsv", "header");
      tabCliVedacit = loadTable("clientesVedacit.txt", "tsv", "header");
      
      console.log('on preload');

           
    }

    function setup() {
      //count the columns
      console.log('on setup');
      noCanvas();

      gmap = criaMapa();
      var pinColor = "54e0ec";
      var pinBase = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34));

      

      
      
      //adiciona os marcadores de local para a base externa de clientes
        // for (var r = 0; r < table.getRowCount(); r++) {
        //       var mapLatitude = table.getColumn("latitude")[r].replace(",", ".");
        //       var mapLongitude = table.getColumn("longitude")[r].replace(",", ".");
        //       var mapMarkTitle = table.getColumn("razao")[r];
        //      print('base-anamanco');
        //       if(mapLatitude && mapLongitude){ 
        //           gmap.addMarker({
        //             lat: mapLatitude,
        //             lng: mapLongitude,
        //             title: mapMarkTitle,
        //             icon: pinBase,
        //             click: function(e) {
        //               alert('Voce esta acessando ' + e.title);
        //             }
        //           });
        //       }
        // }  
        
        //monta os maracadores dos clientes vedacit
        
         //adiciona os marcadores de local para os clientes vedacit
         //razao	cliente	bairro	cidade	uf	pre	logradouro	numero	cep	endereco	Latitude	Longitude	Endereco Formatado
         

    } 
    
    function criaMapa(){
          var gmap = new GMaps({
            div: '#map',
            lat: -15.77972,
            lng: -47.92972,
            zoom: 4
          });   

          var styles = {
            default: null,
            hide: [
              {
                featureType: 'poi',
                stylers: [{visibility: 'off'}]
              },
              {
                featureType: 'transit',
                elementType: 'labels.icon',
                stylers: [{visibility: 'off'}]
              }
            ]
          };
      //remove os indicadores padrao do google maps
        gmap.setOptions({styles: styles['hide']});    
        
      return gmap;  
    }




    
    document.getElementById('btn-cli-vedacit').addEventListener("click", mapeiaClientesVedacit);

    document.getElementById('btn-cli-novos').addEventListener("click", mapeiaClientesNovos);

    function mapeiaClientesVedacit(){
            var cnt = 0;
            var rows = tabCliVedacit.getRowCount();
            document.getElementById("myBar").style.width = '1%';
            for (var r = 0; r < rows; r++) {
              var mapLatitude = tabCliVedacit.getColumn("Latitude")[r].replace(",", ".");
              var mapLongitude = tabCliVedacit.getColumn("Longitude")[r].replace(",", ".");
              var mapMarkTitle = tabCliVedacit.getColumn("razao")[r];
            print('clientes-vedacit');
                  if(mapLatitude && mapLongitude){ 
                      //print('rows===' + rows);
                      updateBar(cnt++,rows);
                      gmap.addMarker({
                        lat: mapLatitude,
                        lng: mapLongitude,
                        title: mapMarkTitle,
                        click: function(e) {
                          alert('Cliente na Base Vedacit - ' + e.title);
                        }
                      });
                  }
        }  
    }

    function mapeiaClientesNovos(){
      
      var pinColor = "54e0ec";
      var pinBase = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
          new google.maps.Size(21, 34),
          new google.maps.Point(0,0),
          new google.maps.Point(10, 34)); 
      var cnt = 0;     
      var rows = table.getRowCount();

      document.getElementById("myBar").style.width ='1%';
      //adiciona os marcadores de local para a base externa de clientes
        for (var r = 0; r < rows; r++) {
              var mapLatitude = table.getColumn("latitude")[r].replace(",", ".");
              var mapLongitude = table.getColumn("longitude")[r].replace(",", ".");
              var mapMarkTitle = table.getColumn("razao")[r];
             print('base-anamanco');
              if(mapLatitude && mapLongitude){ 
                  updateBar(cnt++,rows);                
                  gmap.addMarker({
                    lat: mapLatitude,
                    lng: mapLongitude,
                    title: mapMarkTitle,
                    icon: pinBase,
                    click: function(e) {
                      alert('Voce esta acessando ' + e.title);
                    }
                  });
              }
        }  

    }

   
    function updateBar(value, maxNumber) {
      var elem = document.getElementById("myBar"); 
      var width = map(value, 0, maxNumber, 0,98);
     
          if (width >= 100) {
              clearInterval(id);
          } else {
              width++; 
              elem.style.width = width + '%'; 
          }
      }
  