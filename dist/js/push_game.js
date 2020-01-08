//hello
 // Enable pusher logging - don't include this in production
 Pusher.logToConsole = true;

 var pusher = new Pusher('ac2b1faa8b9a8094de41', {
   cluster: 'ap3',
   forceTLS: true
 });

 var channel = pusher.subscribe('table001');

 channel.bind('plot', function(data) {
   console.log("plot");
   console.log(JSON.stringify(data));
 });

 channel.bind('chat', function(data) {
    console.log("chat");
    console.log(JSON.stringify(data));
  });