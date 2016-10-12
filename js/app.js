/* Stub JS file for your tinychat app! */

$(document).ready(function(){
    // Stub AJAX call that demos getting the fixture data
    $.getJSON('/fixtures/fakedata.json', function(data) {
        console.log("success");
        console.log(data);
    }).done(function() {
        console.log("another success message");
    }).fail(function() {
        console.error("error");
    }).always(function() {
        console.info("complete");
    });
});