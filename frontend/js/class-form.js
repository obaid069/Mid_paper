const API_BASE_URL = "http://localhost:4100";

let isEditing = false;
const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");

$(document).ready(function () {
  if (classId) {
    $(".title").text("Edit class with ID " + classId);
    $.ajax({
      url: API_BASE_URL + "/class/" + classId,
      type: "GET",
      success: function (cls) {
        $("#level").val(cls.level);
      },
    });
  }
});

function submitButtonClick() {
  if (!$("#level").val()) {
    alert("Missing fields!");
    return;
  }
  if (classId) {
    editStudent();
  } else {
    insertNewStudent();
  }
}

function editStudent() {
  const cls = {
    level: $("#level").val(),
  };
  

  $.ajax({
    url: API_BASE_URL + "/class/" + classId,
    type: "POST",
    data: cls,
    success: function (result) {
      $("#new-class-form").submit();
    },
  });
}

function insertNewStudent() {
  const cls = {
    level: $("#level").val(),
  };
  

  $.ajax({
    url: API_BASE_URL + "/class",
    type: "PUT",
    data: cls,
    success: function (result) {
      $("#new-class-form").submit();
    },
  });
}
