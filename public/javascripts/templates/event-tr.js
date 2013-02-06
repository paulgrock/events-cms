<td><span class='label <% 
switch(status) {
 case 'Pending':
  %>label-inverse<%
  break;
  
 case 'Underway':
  %>label-important<%
  break;
  
 case 'Starting Soon':
  %>label-warning<%
  break;
 }
%>'><%= status %></span>
</td><td><%= franchise %></td><td><%= title %></td><td><%= starts_at %></td><td><div class="btn-group"><a href="/events/<%= id %>" class="btn">Edit</a><button data-toggle="dropdown" class="btn dropdown-toggle"><span class="caret"></span></button><ul role="menu" class="dropdown-menu"><li><a class="delete">Delete</a></li></ul></div></td>