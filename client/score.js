$.get(location.href + '/records', function(data) {
    //$( ".result" ).html( data );
    //alert( "Load was performed." );
    console.log(data)
    let pola = ['Nick', 'Mapa', 'Ilość ruchów', 'Rozwiązanie']
    $('#score-table').append('<thead><tr><th>' + pola[0] + '</th><th>' + pola[1] + '</th><th>' + pola[2] + '</th><th>' + pola[3] + '</th></tr></thead> <tbody>')

    data.forEach(element => {
        $('#score-table').append($('<tr><td>' + element.nick + '</td><td>' + element.map + '</td><td>' + element.moves.length + '</td><td>' + element.moves + '</td></tr>'))
    })
    $('#score-table').append('</tbody>')

    $('#score-table').DataTable()
})
