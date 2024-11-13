const API_BASE_URL = "http://localhost:4100";

let isEditing = false;
const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");

$(document).ready(function () {
  if (classId) {
    $(".class-id").text(classId);

    $.ajax({
      url: API_BASE_URL + "/class/" + classId,
      type: "GET",
      success: function (cls) {
        $("#class-level").text(cls.level);
        $("#teacher-id").text(cls.Teacher_id);

        getTeacher(cls.Teacher_id);

        getStudents();
      },
    });
  }
});

function getTeacher(id) {
  $.ajax({
    url: API_BASE_URL + "/teacher/" + id,
    type: "GET",
    success: function (teacher) {
      if (!teacher) {
        $("#teacher-table").hide();
      } else {
        $("#no-teacher").hide();
        $("#teacher-name").text(teacher.name);
        $("#teacher-email").text(teacher.email);
        $("#teacher-gender").text(teacher.gender);
      }
    },
    error: function () {
      $("#teacher-table").hide();
    },
  });
}

function getStudents() {
  // Get all students list
  $.ajax({
    url: API_BASE_URL + "/student/by-class/" + classId,
    type: "GET",
    success: function (students) {
      if (!students || students.length === 0) {
        $("#students-table").hide();
      } else {
        $("#no-students").hide();
        students.forEach((student) => {
          const row = $("<tr></tr>");
          row.append($("<td></td>").text(student.id));
          row.append($("<td></td>").text(student.name));
          row.append($("<td></td>").text(new Date(student.birthday).toLocaleDateString()));
          row.append($("<td></td>").text(student.gender));
          $("#students-table").append(row);
        });
      }
    },
  });
}
