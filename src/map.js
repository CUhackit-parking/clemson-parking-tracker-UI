mapboxgl.accessToken = 'pk.eyJ1Ijoiam9obnB0dXJuZXI4IiwiYSI6ImNsZHFiMWhyYzFiamwzcXE3a3VwaG9yN2gifQ.DWvAJUEiTitddiRPV3BSog';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: [-82.8354, 34.6767], // starting position [lng, lat]
    zoom: 14, // starting zoom
});

map.on('load', () => {
    map.addSource('parking-lots', {
    'type': 'geojson',
    'data': '../data/map.geojson',
    'generateId': true
    })

    map.addLayer({
        'id': 'lot-boundary',
        'type': 'fill',
        'source': 'parking-lots',
        'paint': {
        'fill-color': '#888888',
        'fill-opacity': 0.4,
        },
        'filter': ['==', '$type', 'Polygon']
    });
    map.addLayer({
        'id': 'outline',
        'type': 'line',
        'source': 'parking-lots',
        'layout': {},
        'paint': {
        'line-color': '#000',
        'line-width': ['case', ['boolean', ['feature-state', 'hover'], false],
            2,
            0,
        ]
        }
    });
});

let hoveredStateId = null;

map.on('mousemove', 'lot-boundary', (e) => {
  map.getCanvas().style.cursor = 'pointer';

  if (e.features.length > 0) {
    if (hoveredStateId !== null) {
        map.setFeatureState(
            { source: 'parking-lots', id: hoveredStateId },
            { hover: false }
        );
    }
    hoveredStateId = e.features[0].id;
    map.setFeatureState(
        { source: 'parking-lots', id: hoveredStateId },
        { hover: true }
    );
  }
});

map.on('mouseleave', 'lot-boundary', () => {
    map.getCanvas().style.cursor = 'grab';

    if (hoveredStateId !== null) {
        map.setFeatureState(
            { source: 'parking-lots', id: hoveredStateId },
            { hover: false }
        );
    }
    hoveredStateId = null;
});

    



        