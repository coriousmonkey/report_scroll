//document.writeln("<script src='js/host.js'></script>");

$(document).on("pagebeforeshow","#demo-page",function(){ // When entering pagetwo
    $.get('swipe.txt', function(data) {
        $("#menu").html(data);
        $('#menu').collapsibleset('refresh');
        $('ul').listview( "refresh" );
    }, 'text');
});



$(document).ready(function(){
    
    //$.mobile.changePage( "#demo-page-one", { transition: "slideup", changeHash: false });
    
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
    
    
    $("#loaddata").click(function(){
        //$.mobile.changePage( "#demo-page", { transition: "slideup", changeHash: false });
        loaddata($('#Tahun').val(),$('#divisi').val()); 
        $( "#tabel" ).removeClass( "sembunyi" );
        $('#option-divisi').addClass("sembunyi");
    });
    
});

jQuery.moveColumn = function (table, from, to) {
    var rows = jQuery('tr', table);
    var cols;
    rows.each(function() {
        cols = jQuery(this).children('th, td');
        cols.eq(from).detach().insertBefore(cols.eq(to));
    });
}
   
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

function loaddata(tahun,divisi){
    $.mobile.loading( 'show', {
        	text: 'Downloading Data',
        	textVisible: true,
        	theme: 'a',
        	html: ""
        });
        $.ajax({
            type: "GET",
            url: hostnya+"report_sales2.php?tahun="+tahun+"&divisi="+divisi,
            crossDomain: true,
            data: '',
            timeout: 25000,
            success: function (data) {
                        $( "table#table-column-toggle tbody" ).html( data ).closest( "table#table-column-toggle" ).table( "refresh" ).trigger( "create" );
                        $.mobile.loading( "hide" );
                        //$("body").pagecontainer("change", "#demo-page", { options });
                        var tbl = jQuery('table');
                        jQuery.moveColumn(tbl, 14,2);
                },
            error: function (err) {
                alert(err);
                $.mobile.loading( "hide" );
                }
        }); 
}