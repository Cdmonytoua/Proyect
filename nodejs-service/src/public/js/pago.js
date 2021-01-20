Stripe.setPublishableKey("pk_test_51Gz94RJgLCwHTZRqAeZxIfOqy9MW83sM0ef6owflDrfipGnOMvsDNDREUHBiq3PK0GI7JR56zQ6GutLVsaJna05900IEr4jXKo");

$(document).on("ready", () => { $("form-errors").hide(); });

$("#product-form").on("submit", event => {
  event.preventDefault();

  $("form-errors").hide();

  Stripe.card.createToken(
    {
      number: $("#card-number").val(),
      cvc: $("#cvv").val(),
      exp_month: $("#expiry-month").val(),
      exp_year: $("#expiry-year").val()
    },
    stripeResponseHandler
  );
  $("#submit-btn").prop("disabled", true);

});

const stripeResponseHandler = (status, response) => {
  const $form = $("#product-form");
  if (response.error) {
    $("#form-errors").show();
    $("#form-errors").html(response.error.message);
    $("#submit-btn").prop("disabled", false);
  } else {
    const token = response.id;
    $form.append($('<input type="hidden" name="stripeToken" />').val(token));
    $form.get(0).submit();
  }
};

