# Note-Taker

For Note-Taker I modified a provided frontend and skeleton of server code to add some functionality for users: 
1) Allow the user to see raw Notes data, 
2) Allow the user to add a note, and 
3) Allow the user to delete a note. 

I handled the question of identifying next note ID when adding via a function call that does a FOR LOOP on the notes array. Kinda clunky, and that won't be how we do it once we've fully integrated DB programming, but ... 

I struggled MIGHTILY with my HTML files being able to 'see' their local CSS and JS files. Lawrence helped me fix it on Monday. (Thanks Lawrence!) That worked when I opened the page directly. However, Tuesday I discovered I still couldn't see the files when opening the HTML pages via the server. I kept getting 404s. I found something online suggesting this or something like it might work, but it didn't for me, at least note like this: 

   app.use (express.static(path.join(__dirname, 'public'))); 

In the end I had to do the work; I ended up pasting my CSS and index.js files into the HTML files in <style> and <script> elements. That's bad, I know, but I was out of ideas at the time and had to move on. 

About this requirement: 
   * The URL of the deployed application
I only submitted a link to Github. Were we supposed to deploy Note-Taker to Heroku? 
