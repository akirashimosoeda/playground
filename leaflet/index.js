var mymap = L.map('mapid').setView([-25.318425280970235, -57.57746815681458], 8);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  id: 'mapbox/streets-v11',
  tileSize: 512,
  zoomOffset: -1,
  accessToken: 'pk.eyJ1IjoiYXNoaW1vc29lZGEiLCJhIjoiY2tkbTZraHpvMGV4eTJybWc2Z2g5emoycSJ9.ZOm4liMJ3QOmSyABKYFEZA'
}).addTo(mymap);

var colonyListEl = document.getElementById('colony-list');

colonies.forEach((colony, index) => {
  var marker = L.marker(colony.latlng).addTo(mymap);
  var popupContainer = `
    <div>
      <div>
        <img src="${colony.imageUrl}"
             alt="${decodeURIComponent(colony.name)}"
             width="256"
             height="128"/>
      </div>
      <div style="display: flex; justify-content: space-between; padding: 8px;">
        <div style="flex: auto; display: inline-block;">
          <span style="font-size: 24px"><b>${decodeURIComponent(colony.name)}</b><span>
        </div>
        <div style="flex: auto; display: inline-block;">
          <input type="button" onclick="location.href='${colony.url}';" value="Ver mas" />
        </div>
      </div>
    </div>
  `;

  var popupOptions = {
    closeButton: false
  };

  var popup = L.popup(popupOptions)
    .setContent(popupContainer);

  marker.bindPopup(popup);

  var el = document.createElement('div');
  el.innerHTML = `<span data-index=${index}>${colony.name}</span>`;
  el.onclick = function (e) {
    mymap.flyTo(colonies[e.target.dataset.index].latlng, 15, {
      animate: true,
      duration: 2,
      easeLinearity: 0.5
    });
  }

  colonyListEl.appendChild(el);
});
