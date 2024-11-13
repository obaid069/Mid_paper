const API_BASE_URL = "http://localhost:4100";

$(document).ready(function () {
  // Initialization
  $("#no-classes").hide();

  // Get all classes list
  $.ajax({
    url: API_BASE_URL + "/class/all",
    type: "GET",
    success: function (classes) {
      if (!classes || classes.length === 0) {
        $("#no-classes").show();
        $("#classes-table").hide();
      } else {
        classes.forEach((cls) => {
          const row = $("<tr></tr>");
          row.append($("<td></td>").text(cls.id));
          row.append($("<td></td>").text(cls.level));
          row.append($("<td></td>").text(cls.teacher_name || "-"));
          row.append(
            $("<td></td>").html(`
              <a href='class-details.html?id=${cls.id}'>Show class</a> |
              <a href='class-manage.html?id=${cls.id}'>Manage class</a> |
              <a href='/class-form.html?id=${cls.id}'>Edit</a> |
              <a href='/classes.html' onclick='deleteConfirmation(${cls.id})'>Delete</a>
            `)
          );
          $("#classes-table").append(row);
        });
      }
    },
  });
});

function deleteConfirmation(teacherId) {
  if (confirm("Are you sure you want to delete this class?")) {
    $.ajax({
      url: API_BASE_URL + "/class/" + teacherId,
      type: "DELETE",
      success: function (result) {
        // Save it!
        console.log("Teacher with ID " + teacherId + " deleted");
        location.reload();
      },
    });
  } else {
    // Do nothing!
    console.log("Canceled");
  }
}
