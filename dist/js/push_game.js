//hello
 // Enable pusher logging - don't include this in production
 Pusher.logToConsole = true;

 var pusher = new Pusher('ac2b1faa8b9a8094de41', {
   cluster: 'ap3',
   forceTLS: true
 });

 var channel = pusher.subscribe('table001');
 channel.bind('my-event', function(data) {
   console.log(JSON.stringify(data));
 });