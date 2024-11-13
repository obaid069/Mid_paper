const API_BASE_URL = "http://localhost:4100";

let isEditing = false;
const urlParams = new URLSearchParams(window.location.search);
const studentId = urlParams.get("id");

$(document).ready(function () {
  $("#birthday").datepicker({
    dateFormat: "dd/mm/yy",
    changeMonth: true,
    changeYear: true,
    yearRange: "1990:-2",
  });

  if (studentId) {
    $(".title").text("Edit student with ID " + studentId);
    $.ajax({
      url: API_BASE_URL + "/student/" + studentId,
      type: "GET",
      success: function (student) {
        $("#name").val(student.name);
        $("#birthday").val(new Date(student.birthday).toLocaleDateString());
        $("#gender").val(student.gender);
      },
    });
  }
});

function submitButtonClick() {
  if (!$("#name").val() || !$("#birthday").val() || !$("#gender").val()) {
    alert("Missing fields!");
    return;
  }
  if (studentId) {
    editStudent();
  } else {
    insertNewStudent();
  }
}

function editStudent() {
  const student = {
    name: $("#name").val(),
    birthday: $("#birthday").val(),
    gender: $("#gender").val(),
  };

  $.ajax({
    url: API_BASE_URL + "/student/" + studentId,
    type: "POST",
    data: student,
    success: function (result) {
      $("#new-student-form").submit();
    },
  });
}

function insertNewStudent() {
  const student = {
    name: $("#name").val(),
    birthday: $("#birthday").val(),
    gender: $("#gender").val(),
  };

  $.ajax({
    url: API_BASE_URL + "/student",
    type: "PUT",
    data: student,
    success: function (result) {
      $("#new-student-form").submit();
    },
  });
}
