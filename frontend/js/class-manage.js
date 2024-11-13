const API_BASE_URL = "http://localhost:4100";

let isEditing = false;
const urlParams = new URLSearchParams(window.location.search);
const classId = urlParams.get("id");
let currentClass;

$(document).ready(function () {
  if (classId) {
    $(".class-id").text(classId);

    $.ajax({
      url: API_BASE_URL + "/class/" + classId,
      type: "GET",
      success: function (cls) {
        currentClass = cls;
        $("#level").text(cls.level);

        getAllTeachers();
        getRegisteredStudents();
      },
    });
  }
});

function getAllTeachers() {
  $.ajax({
    url: API_BASE_URL + "/teacher/all",
    type: "GET",
    success: function (teachers) {
      if (!teachers || teachers.length === 0) {
        $("#no-teachers").show();
        $("#teachers-table").hide();
      } else {
        $("#no-teachers").hide();
        teachers.forEach((teacher) => {
          const row = $("<tr></tr>");
          const radioButton = `<input type="radio" name="teacher" value="${teacher.id}">`;
          row.append($("<td class='text-center'></td>").html(radioButton));
          row.append($("<td></td>").text(teacher.id));
          row.append($("<td></td>").text(teacher.name));
          row.append($("<td></td>").text(teacher.email));
          row.append($("<td></td>").text(teacher.gender));
          $("#teachers-table").append(row);
        });

        // Disable save button when radio buttons state change
        $("input[name=teacher]").change(function () {
          $("#save-teacher").prop("disabled", false);
        });

        // Make radio button of class teacher selected
        $("input[name=teacher][value='" + currentClass.Teacher_id + "']").prop("checked", true);
      }
    },
    error: function () {
      $("#teachers-table").hide();
    },
  });
}

function saveAssignTeacher() {
  const teacherId = $("input[name=teacher]:checked").val();
  currentClass.Teacher_id = teacherId;

  $.ajax({
    url: API_BASE_URL + "/class/" + classId,
    type: "POST",
    data: currentClass,
    success: function (r) {
      const notif = $("#saved-assign-teacher-notif").text("saved !");
      $("#save-teacher").after(notif);
      setTimeout(function () {
        notif.text("");
      }, 1500); // remove notification after 1,5 seconds
    },
    error: function () {
      $("#saved-assign-teacher-notif").text("Error !");
    },
  });
  $("#save-teacher").prop("disabled", true);
}

function getRegisteredStudents() {
  $.ajax({
    url: API_BASE_URL + "/student/by-class/" + classId,
    type: "GET",
    success: function (registeredStudents) {
      if (registeredStudents && registeredStudents.length > 0) {
        $("#no-registered-students").hide();
        registeredStudents.forEach((student) => {
          const row = $("<tr></tr>");
          row.append($("<td class='text-center'><a href='#' onclick='unregisterStudent(" + student.id + ")'>Unregister</a></td>"));
          row.append($("<td></td>").text(student.id));
          row.append($("<td></td>").text(student.name));
          row.append($("<td></td>").text(new Date(student.birthday).toLocaleDateString()));
          row.append($("<td></td>").text(student.gender));
          $("#registered-students").append(row);
        });
      } else {
        $("#no-registered-students").show();
        $("#registered-students").hide();
      }
      getUnregisteredStudents(registeredStudents);
    },
  });
}

function getUnregisteredStudents(registeredStudents) {
  $.ajax({
    url: API_BASE_URL + "/student/all",
    type: "GET",
    success: function (students) {
      if (students && students.length > 0) {
        $("#no-unregistered-students").hide();
        let unregisteredListEmpty = true;
        students.forEach((student) => {
          if (!registeredStudents.find((s) => s.id === student.id)) {
            unregisteredListEmpty = false;
            const row = $("<tr></tr>");
            row.append($("<td class='text-center'><a href='#' onclick='registerStudent(" + student.id + ")'>Register</a></td>"));
            row.append($("<td></td>").text(student.id));
            row.append($("<td></td>").text(student.name));
            row.append($("<td></td>").text(new Date(student.birthday).toLocaleDateString()));
            row.append($("<td></td>").text(student.gender));
            $("#unregistered-students").append(row);
          }
        });
        if (unregisteredListEmpty) {
          $("#no-unregistered-students").show();
          $("#unregistered-students").hide();
        }
      }
    },
  });
}

function registerStudent(studentId) {
  const objToInsert = {
    Class_id: classId,
    Student_id: studentId,
  };
  $.ajax({
    url: API_BASE_URL + "/student/register-to-class",
    type: "PUT",
    data: objToInsert,
    success: function (r) {
      console.log(r);
      window.location.reload();
    },
    error: function () {
      console.error("lol");
    },
  });
}

function unregisterStudent(studentId) {
  $.ajax({
    url: API_BASE_URL + "/student/unregister-from-class/" + studentId + "/" + classId,
    type: "DELETE",
    success: function (r) {
      console.log(r);
      window.location.reload();
    },
    error: function () {
      console.error("lol");
    },
  });
}
