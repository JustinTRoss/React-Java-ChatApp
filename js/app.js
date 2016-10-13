/* Stub JS file for your tinychat app! */

$(document).ready(function(){
    // Stub AJAX call that demos getting the fixture data
    $.getJSON('/fixtures/fakedata.json', function(data) {
        console.log("success");
        console.log(data, new Date(data.last_seen));
    }).done(function(data) {
        for (let i = 0; i < data.messages.length; i++) {
            console.log( 'id:', data.messages[i].id, ' content: ', data.messages[i].content, ' time: ', new Date(data.messages[i].timestamp), ' last edited: ', new Date(data.messages[i].last_edited));
        }
        console.log("another success message");
    }).fail(function() {
        console.error("error");
    }).always(function() {
        console.info("complete");
    });
});