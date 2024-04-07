$(document).ready(function () {
  const amenities = [];
  const amenityIds = [];

  $('li input[type=checkbox]').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      amenities.push(name);
      amenityIds.push(id);
    } else {
      const index = amenities.indexOf(name);
      if (index !== -1) {
        amenities.splice(index, 1);
        amenityIds.splice(index, 1);
      }
    }
    $('div.amenities h4').text(amenities.sort().join(', '));
  });
});
