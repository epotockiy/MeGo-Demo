export const initialState = {
  isFetching: false,
  currentAddress: 0,
  isAddressOpen: [true, false, false],
  possibleAddresses: [],
  coordinateSearchAddress: {},
  addresses: [
    {
      address: {
        city: 'Париж',
        country: 'Франция',
        country_code: 'fr',
        county: 'Париж',
        postcode: '75000',
        state: 'Иль-де-Франс',
        road: 'улица Ли Не'
      },
      boundingbox: [
        '48.8155755',
        '48.902156',
        '2.224122',
        '2.4697602'
      ],
      class: 'place',
      display_name: 'Париж, Иль-де-Франс, Метрополия Франции, 75000, Франция',
      icon: 'http://nominatim.openstreetmap.org/images/mapicons/poi_place_city.p.20.png',
      importance: 0.86893459932191,
      lat: '48.8566101',
      licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright',
      lon: '2.3514992',
      osm_id: '7444',
      osm_type: 'relation',
      place_id: '173226139',
      type: 'city'
    },
    {
      place_id: '173471453',
      licence: 'Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright',
      osm_type: 'relation',
      osm_id: '1076124',
      boundingbox: [
        '48.3572972',
        '48.4595521',
        '-4.5689169',
        '-4.4278311'
      ],
      lat:  '48.3905283',
      lon:  '-4.4860088',
      display_name:  'Брест, Финистер, Бретань, Метрополия Франции, 29200, Франция',
      class: 'place',
      type: 'city',
      importance: 0.57190616911073,
      icon: 'http://nominatim.openstreetmap.org/images/mapicons/poi_place_city.p.20.png',
      address: {
        city: 'Брест',
        county: 'Брест',
        state: 'Бретань',
        country: 'Франция',
        postcode: '29200',
        country_code: 'fr',
        road: 'улица Жан Мари ле Бри'
      }
    },
    {
      place_id:'3908795',
      licence:'Data © OpenStreetMap contributors, ODbL 1.0. http://www.openstreetmap.org/copyright','osm_type':'node',
      osm_id:'442008175',
      boundingbox:[
        '53.1978088',
        '53.2078088',
        '50.1554963',
        '50.1654963'
      ],
      lat:'53.2028088',
      lon:'50.1604963',
      display_name:'Московская, улица Гагарина, Шмидта, Железнодорожный район, Самара, городской округ Самара, Самарская область, Приволжский федеральный округ, 443028, РФ',
      class:'railway',
      type:'station',
      importance:0.2677614384343,
      icon:'http://nominatim.openstreetmap.org/images/mapicons/transport_train_station2.p.20.png',
      address:{
        station:'Московская',
        road:'улица Гагарина',
        suburb:'Железнодорожный район',
        city:'Самара',
        county:'городской округ Самара',
        state:'Самарская область',
        postcode:'443028',
        country:'РФ',
        country_code:'ru'
      }
    }
  ]
};
