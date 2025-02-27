---
---
$(function() {

  $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
	  // var url = "https://formspree.io/" + "{% if site.formspree_form_path %}{{ site.formspree_form_path }}{% else %}{{ site.email }}{% endif %}";
      var url = "https://api.emailjs.com/api/v1.0/email/send"
      var name = $("input#name").val();
      var email = $("input#email").val();
      var phone = $("input#phone").val();
      var message = $("textarea#message").val();
      var firstName = name; // For Success/Failure Message
      // Check for white space in name for Success/Fail message
      if (firstName.indexOf(' ') >= 0) {
        firstName = name.split(' ').slice(0, -1).join(' ');
      }
      $this = $("#sendMessageButton");
      $this.prop("disabled", true); // Disable submit button until AJAX call is complete to prevent duplicate messages


      var data = {
        service_id: "service_oe5ldxg",
        template_id: "template_8b9rhbn",
        user_id:"KULa-J45_xs9OTSTc",
        accessToken:"3vWtZ5I0rroAb-17sonuk",
        template_params:{
          'name': name,
          'phone': phone,
          'email': email,
          'message': message
        }
    };
     
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    }).done(function() {
         // Success message
         $('#success').html("<div class='alert alert-success'>");
         $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
           .append("</button>");
         $('#success > .alert-success')
           .append("<strong>상담접수 되었습니다. </strong>");
         $('#success > .alert-success')
           .append('</div>');
         //clear all fields
         $('#contactForm').trigger("reset");
    }).fail(function(error) {
      $('#success').html("<div class='alert alert-danger'>");
      $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
        .append("</button>");
      $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
      $('#success > .alert-danger').append('</div>');
      //clear all fields
      $('#contactForm').trigger("reset");
    });

    //   $.ajax({
    //     url: url,
    //     type: "POST",
	  //     // dataType: "application/json",
    //     beforeSend: function (xhr) {
    //       xhr.setRequestHeader("Content-type","application/json");
          
    //     },
        
    //     cache: false,

		// success: function() {
    //       // Success message
    //       $('#success').html("<div class='alert alert-success'>");
    //       $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
    //         .append("</button>");
    //       $('#success > .alert-success')
    //         .append("<strong>Your message has been sent. </strong>");
    //       $('#success > .alert-success')
    //         .append('</div>');
    //       //clear all fields
    //       $('#contactForm').trigger("reset");
    //     },

    //     error: function() {
    //       // Fail message
    //       $('#success').html("<div class='alert alert-danger'>");
    //       $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
    //         .append("</button>");
    //       $('#success > .alert-danger').append($("<strong>").text("Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!"));
    //       $('#success > .alert-danger').append('</div>');
    //       //clear all fields
    //       $('#contactForm').trigger("reset");
    //     },

    //     complete: function() {
    //       setTimeout(function() {
    //         $this.prop("disabled", false); // Re-enable submit button when AJAX call is complete
    //       }, 1000);
    //     }
    //   });
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
