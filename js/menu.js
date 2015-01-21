//document.writeln("<script src='js/host.js'></script>");

$(document).on("pagebeforeshow","#demo-page",function(){ // When entering pagetwo
    $.get('swipe.txt', function(data) {
        $("#menu").html(data);
        $('#menu').collapsibleset('refresh');
        $('ul').listview( "refresh" );
    }, 'text'); 
});

//data-collapsed='false'

$(document).ready(function(){
       otentifikasi();

    $( "#left-panel" ).panel( "open" );
       
    $( document ).on( "swipeleft swiperight", "#demo-page", function( e ) {
        if ( $.mobile.activePage.jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
    
    document.addEventListener("backbutton", function(e){
           $( "#left-panel" ).panel( "open" );
    }, false);
});

function otentifikasi(){   
    $.ajax({
        type: "POST",
        url: hostnya+"login.php",
        crossDomain: true,
        data: '',
        timeout: 25000,
        success: function (data) {
            
            var masuk=data.split("-");
            var user=$.session.get('user');
            var pass=$.session.get('pass');
            
            if ((user==masuk[0])&&(pass==masuk[1])){
            }else{
                window.location.replace('index.html');
            }
        },
        error: function (err) {
            alert("Connection lost");
            window.location.replace('index.html');
        }
    });
}
   
