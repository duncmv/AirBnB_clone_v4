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

  $.get('http://localhost:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('div#api_status').addClass('available');
    } else {
      $('div#api_status').removeClass('available');
    }
  });

  getPlaces();

  $('.filters button').on('click', function () {
    $('section.places').empty();
    getPlaces({ amenities: amenityIds });
  });
});

function getPlaces (filters = {}) {
  $.post({
    url: 'http://localhost:5001/api/v1/places_search',
    data: JSON.stringify(filters),
    headers: {
      'Content-Type': 'application/json'
    },
    success: (data) => {
      data.forEach((place) =>
        $('section.places').append(
          `<article>
      <div class="title_box">
      <h2>${place.name}</h2>
      <div class="price_by_night">$${place.price_by_night}</div>
      </div>
      <div class="information">
      <div class="max_guest">${place.max_guest} Guest${
            place.max_guest !== 1 ? 's' : ''
          }</div>
      <div class="number_rooms">${place.number_rooms} Bedroom${
            place.number_rooms !== 1 ? 's' : ''
          }</div>
      <div class="number_bathrooms">${place.number_bathrooms} Bathroom${
            place.number_bathrooms !== 1 ? 's' : ''
          }</div>
      </div> 
      <div class="description">
      ${place.description}
      </div>
        </article>`
        )
      );
    },
    dataType: 'json'
  });
}
