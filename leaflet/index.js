var mymap = L.map('mapid').setView([-25.318425280970235, -57.57746815681458], 8);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYXNoaW1vc29lZGEiLCJhIjoiY2tkbTZraHpvMGV4eTJybWc2Z2g5emoycSJ9.ZOm4liMJ3QOmSyABKYFEZA'
}).addTo(mymap);


colonies.forEach(colony => {
  var marker = L.marker(colony.latlng).addTo(mymap);
  var popupContainer = `
    <div>
      <div style="text-align: center">
        <span style="font-size: 24px"><b>${decodeURIComponent(escape(colony.name))}</b><span>
      </div>
      <div>
        <img src="${colony.imageUrl}"
             alt="${decodeURIComponent(escape(colony.name))}"
             width="256"
             height="128"/>
      </div>
      <div style="text-align: right">
        <input type="button" onclick="location.href='${colony.url}';" value="Ver mas" />
      </div>
    </div>
  `;
  marker.bindPopup(popupContainer);
});