const API_BASE_URL = "http://localhost:4100";

let isEditing = false;
const urlParams = new URLSearchParams(window.location.search);
const teacherId = urlParams.get("id");

$(document).ready(function () {
  if (teacherId) {
    $(".title").text("Edit teacher with ID " + teacherId);
    $.ajax({
      url: API_BASE_URL + "/teacher/" + teacherId,
      type: "GET",
      success: function (teacher) {
        $("#name").val(teacher.name);
        $("#email").val(teacher.email);
        $("#gender").val(teacher.gender);
      },
    });
  }
});

function submitButtonClick() {
  if (!$("#name").val() || !$("#email").val() || !$("#gender").val()) {
    alert("Missing fields!");
    return;
  }
  if (teacherId) {
    editStudent();
  } else {
    insertNewStudent();
  }
}

function editStudent() {
  const teacher = {
    name: $("#name").val(),
    email: $("#email").val(),
    gender: $("#gender").val(),
  };
  

  $.ajax({
    url: API_BASE_URL + "/teacher/" + teacherId,
    type: "POST",
    data: teacher,
    success: function (result) {
      $("#new-teacher-form").submit();
    },
  });
}

function insertNewStudent() {
  const teacher = {
    name: $("#name").val(),
    email: $("#email").val(),
    gender: $("#gender").val(),
  };
  

  $.ajax({
    url: API_BASE_URL + "/teacher",
    type: "PUT",
    data: teacher,
    success: function (result) {
      $("#new-teacher-form").submit();
    },
  });
}
