// Call the dataTables jQuery plugin
$(document).ready(function() {
  $('#dataTable').DataTable( {
    "paging": true,
    "searching": true,
    "pageLength": 5
  });
});
