const API_BASE_URL = "http://localhost:4100";

$(document).ready(function () {
  // Initialization
  $("#no-students").hide();

  // Get all students list
  $.ajax({
    url: API_BASE_URL + "/student/all",
    type: "GET",
    success: function (students) {
      if (!students || students.length === 0) {
        $("#no-students").show();
        $("#students-table").hide();
      } else {
        students.forEach((student) => {
          const row = $("<tr></tr>");
          row.append($("<td></td>").text(student.id));
          row.append($("<td></td>").text(student.name));
          row.append($("<td></td>").text(new Date(student.birthday).toLocaleDateString()));
          row.append($("<td></td>").text(student.gender));
          row.append(
            $("<td></td>").html(`
              <a href='/student-form.html?id=${student.id}'>Edit</a> |
              <a href='/students.html' onclick='deleteConfirmation(${student.id})'>Delete</a>
            `)
          );
          $("#students-table").append(row);
        });
      }
    },
  });
});

function deleteConfirmation(studentId) {
  if (confirm("Are you sure you want to delete this student?")) {
    $.ajax({
      url: API_BASE_URL + "/student/" + studentId,
      type: "DELETE",
      success: function (result) {
        // Save it!
        console.log("Student with ID " + studentId + " deleted");
        location.reload();
      },
    });
  } else {
    // Do nothing!
    console.log("Canceled");
  }
}
