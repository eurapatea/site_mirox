const CONFIG = {
    geojsonUrl: 'map.geojson',
    defaultCenter: [58.271365, 74.943768],
    defaultZoom: 3,
    clusterer: false,
    yandexApiKey: '1369553d-f484-4af0-b541-fcace710990e', // <-- Ваш ключ
    lang: 'ru_RU'
};

function loadYandexMapApi(callback) {
    if (window.ymaps) {
        // API уже загружено
        callback();
        return;
    }
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${CONFIG.yandexApiKey}&lang=${CONFIG.lang}`;
    script.onload = callback;
    script.onerror = function() {
        alert('Ошибка загрузки API Яндекс.Карт');
    };
    document.head.appendChild(script);
}

function initYandexMap() {
    ymaps.ready(() => {
        const map = new ymaps.Map('map_roads', {
            center: CONFIG.defaultCenter,
            zoom: CONFIG.defaultZoom
        });

        fetch(CONFIG.geojsonUrl)
            .then(response => response.json())
            .then(geojson => {
                const points = extractPointsFromGeoJSON(geojson);
                addPointsToMap(map, points, CONFIG.clusterer);
                autoFitMap(map, points);
            })
            .catch(error => {
                alert('Не удалось загрузить данные карты');
            });
    });
}

// Извлечение массива координат из GeoJSON
function extractPointsFromGeoJSON(geojson) {
    const points = [];

    if (geojson.type === 'FeatureCollection') {
        geojson.features.forEach(feature => {
            if (feature.geometry && feature.geometry.type === 'Point') {
                const coords = feature.geometry.coordinates; // [долгота, широта]
                // ymaps ожидает [широта, долгота], меняем порядок
                points.push([coords[1], coords[0]]);
            }
        });
    }
    return points;
}

function addPointsToMap(map, points, useClusterer) {
    const geoObjects = points.map(coords =>
        new ymaps.Placemark(coords, {}, { preset: 'islands#redDotIcon' })
    );

    if (useClusterer) {
        const clusterer = new ymaps.Clusterer();
        clusterer.add(geoObjects);
        map.geoObjects.add(clusterer);
    } else {
        geoObjects.forEach(obj => map.geoObjects.add(obj));
    }
}

function autoFitMap(map, points) {
    if (points.length > 0) {
        const bounds = ymaps.util.bounds.fromPoints(points);
        map.setBounds(bounds, { checkZoomRange: true, zoomMargin: 20 });
    }
}

// Запуск инициализации
loadYandexMapApi(initYandexMap);




