const API_BASE_URL = "http://localhost:4100";

$(document).ready(function () {
  // Initialization
  $("#no-teachers").hide();

  // Get all teachers list
  $.ajax({
    url: API_BASE_URL + "/teacher/all",
    type: "GET",
    success: function (teachers) {
      if (!teachers || teachers.length === 0) {
        $("#no-teachers").show();
        $("#teachers-table").hide();
      } else {
        teachers.forEach((teacher) => {
          const row = $("<tr></tr>");
          row.append($("<td></td>").text(teacher.id));
          row.append($("<td></td>").text(teacher.name));
          row.append($("<td></td>").text(teacher.email));
          row.append($("<td></td>").text(teacher.gender));
          row.append(
            $("<td></td>").html(`
              <a href='/teacher-form.html?id=${teacher.id}'>Edit</a> |
              <a href='/teachers.html' onclick='deleteConfirmation(${teacher.id})'>Delete</a>
            `)
          );
          $("#teachers-table").append(row);
        });
      }
    },
  });
});

function deleteConfirmation(teacherId) {
  if (confirm("Are you sure you want to delete this teacher?")) {
    $.ajax({
      url: API_BASE_URL + "/teacher/" + teacherId,
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
