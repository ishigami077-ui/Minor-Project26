/**
 * Kisan Setu - Live Weather Service
 * Powered by Open-Meteo & Open Meteorological Data (IMD / ECMWF Model)
 * Zero API key requirement out-of-the-box, with live hourly/daily forecasts,
 * geocoding search across India, and agricultural advisory insights.
 */

export const PRESET_AGRICULTURAL_HUBS = [
  { id: 'saikheda', name: 'Saikheda / Chhindwara', state: 'Madhya Pradesh', lat: 21.94, lon: 78.58 },
  { id: 'sehore', name: 'Sehore (Sharbati Hub)', state: 'Madhya Pradesh', lat: 23.20, lon: 77.08 },
  { id: 'nagpur', name: 'Nagpur (Cotton & Orange)', state: 'Maharashtra', lat: 21.146, lon: 79.085 },
  { id: 'indore', name: 'Indore (Malwa Agri Hub)', state: 'Madhya Pradesh', lat: 22.72, lon: 75.86 },
  { id: 'nashik', name: 'Nashik (Onion Capital)', state: 'Maharashtra', lat: 19.997, lon: 73.79 },
  { id: 'karnal', name: 'Karnal (Basmati Bowl)', state: 'Haryana', lat: 29.686, lon: 76.99 },
  { id: 'ludhiana', name: 'Ludhiana (Wheat Belt)', state: 'Punjab', lat: 30.90, lon: 75.85 },
  { id: 'amravati', name: 'Amravati (Soybean & Cotton)', state: 'Maharashtra', lat: 20.937, lon: 77.78 }
];

const STORAGE_KEY_LOCATION = 'kisan_weather_location';
const STORAGE_KEY_LAST_DATA = 'kisan_weather_cached';

export const weatherService = {
  /**
   * Get current selected location from storage or default to Saikheda / Sehore
   */
  getSelectedLocation() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LOCATION);
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return PRESET_AGRICULTURAL_HUBS[0];
  },

  /**
   * Save selected location
   */
  setSelectedLocation(location) {
    try {
      localStorage.setItem(STORAGE_KEY_LOCATION, JSON.stringify(location));
    } catch {
      // Ignore
    }
  },

  /**
   * Search locations in India using Open-Meteo Geocoding API
   */
  async searchLocations(query) {
    if (!query || query.trim().length < 2) return [];
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      query.trim()
    )}&count=8&language=en&format=json`;

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Geocoding HTTP ${res.status}`);
      const data = await res.json();
      if (!data.results || !data.results.length) return [];

      return data.results.map((r) => ({
        id: `${r.id}`,
        name: r.name,
        state: r.admin1 || r.country || '',
        country: r.country || 'India',
        lat: r.latitude,
        lon: r.longitude,
        elevation: r.elevation
      }));
    } catch (err) {
      console.warn('Weather geocoding error:', err);
      return [];
    }
  },

  /**
   * Request browser GPS position
   */
  async getDeviceLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by your browser'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve({
            name: 'Current Farm Location',
            state: 'GPS Detected',
            country: 'India',
            lat: Number(pos.coords.latitude.toFixed(4)),
            lon: Number(pos.coords.longitude.toFixed(4))
          });
        },
        (err) => reject(err),
        { enableHighAccuracy: true, timeout: 8000 }
      );
    });
  },

  /**
   * Fetch complete live weather dataset for coordinates
   */
  async fetchLiveWeather(lat, lon, locationMeta = null) {
    const targetLat = lat ?? 21.94;
    const targetLon = lon ?? 78.58;

    const endpoint =
      `https://api.open-meteo.com/v1/forecast?latitude=${targetLat}&longitude=${targetLon}` +
      `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure` +
      `&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code` +
      `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max,sunrise,sunset` +
      `&timezone=auto&forecast_days=7`;

    const res = await fetch(endpoint);
    if (!res.ok) {
      throw new Error(`Weather service returned HTTP ${res.status}`);
    }

    const raw = await res.json();
    const current = raw.current || {};
    const hourly = raw.hourly || {};
    const daily = raw.daily || {};

    const codeInfo = this.mapWmoCode(current.weather_code);

    // Format hourly (next 24 hours from current index)
    const formattedHourly = [];
    if (hourly.time && hourly.time.length) {
      const nowIso = current.time ? current.time.slice(0, 13) : '';
      let startIndex = 0;
      if (nowIso) {
        const found = hourly.time.findIndex((t) => t.startsWith(nowIso));
        if (found !== -1) startIndex = found;
      }

      for (let i = startIndex; i < Math.min(startIndex + 24, hourly.time.length); i++) {
        formattedHourly.push({
          time: hourly.time[i],
          hourLabel: new Date(hourly.time[i]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temp: Math.round(hourly.temperature_2m[i]),
          humidity: hourly.relative_humidity_2m?.[i] ?? 0,
          rainProb: hourly.precipitation_probability?.[i] ?? 0,
          code: hourly.weather_code[i],
          condition: this.mapWmoCode(hourly.weather_code[i]).label
        });
      }
    }

    // Format daily 7-day forecast
    const formattedDaily = [];
    if (daily.time && daily.time.length) {
      for (let i = 0; i < daily.time.length; i++) {
        const dateObj = new Date(daily.time[i]);
        formattedDaily.push({
          date: daily.time[i],
          dayName: i === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' }),
          fullDate: dateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
          maxTemp: Math.round(daily.temperature_2m_max[i]),
          minTemp: Math.round(daily.temperature_2m_min[i]),
          precipitationSum: daily.precipitation_sum?.[i] ?? 0,
          rainProbMax: daily.precipitation_probability_max?.[i] ?? 0,
          code: daily.weather_code[i],
          condition: this.mapWmoCode(daily.weather_code[i]).label,
          sunrise: daily.sunrise?.[i] ? daily.sunrise[i].slice(11, 16) : null,
          sunset: daily.sunset?.[i] ? daily.sunset[i].slice(11, 16) : null
        });
      }
    }

    const windDir = this.degreesToCardinal(current.wind_direction_10m);
    const advisories = this.generateAgriculturalAdvisories({
      temp: current.temperature_2m,
      apparentTemp: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      rain: current.precipitation,
      windSpeed: current.wind_speed_10m,
      code: current.weather_code,
      hourlyForecast: formattedHourly
    });

    const parsedData = {
      location: locationMeta || this.getSelectedLocation(),
      coordinates: {
        latitude: raw.latitude,
        longitude: raw.longitude,
        elevation: raw.elevation,
        timezone: raw.timezone
      },
      current: {
        temperature: Math.round(current.temperature_2m * 10) / 10,
        apparentTemperature: Math.round(current.apparent_temperature * 10) / 10,
        humidity: current.relative_humidity_2m,
        precipitation: current.precipitation ?? 0,
        windSpeed: current.wind_speed_10m ?? 0,
        windDirection: windDir,
        pressure: current.surface_pressure ?? 1013,
        weatherCode: current.weather_code,
        condition: codeInfo.label,
        conditionIconType: codeInfo.iconType,
        isDay: codeInfo.isDay,
        time: current.time
      },
      hourly: formattedHourly,
      daily: formattedDaily,
      advisories,
      lastUpdated: new Date().toISOString()
    };

    try {
      localStorage.setItem(STORAGE_KEY_LAST_DATA, JSON.stringify(parsedData));
    } catch {
      // Ignore
    }

    return parsedData;
  },

  /**
   * Map WMO weather codes to user-friendly status, agricultural tag, and Lucide icon
   */
  mapWmoCode(code) {
    if (code === 0) {
      return { label: 'Clear Sky / Sunny', iconType: 'sun', hindiLabel: 'साफ आसमान / धूप' };
    }
    if (code === 1) {
      return { label: 'Mainly Clear', iconType: 'sun-cloud', hindiLabel: 'मुख्यतः साफ' };
    }
    if (code === 2) {
      return { label: 'Partly Cloudy', iconType: 'cloud-sun', hindiLabel: 'आंशिक रूप से बादल' };
    }
    if (code === 3) {
      return { label: 'Overcast', iconType: 'cloud', hindiLabel: 'घने बादल' };
    }
    if (code === 45 || code === 48) {
      return { label: 'Fog / Mist', iconType: 'cloud-fog', hindiLabel: 'कोहरा / धुंध' };
    }
    if (code >= 51 && code <= 55) {
      return { label: 'Light Drizzle', iconType: 'cloud-drizzle', hindiLabel: 'हल्की बूंदाबांदी' };
    }
    if (code === 61) {
      return { label: 'Slight Rain', iconType: 'cloud-rain', hindiLabel: 'हल्की बारिश' };
    }
    if (code === 63) {
      return { label: 'Moderate Rain', iconType: 'cloud-rain', hindiLabel: 'मध्यम बारिश' };
    }
    if (code === 65) {
      return { label: 'Heavy Rain Showers', iconType: 'cloud-rain-heavy', hindiLabel: 'भारी बारिश' };
    }
    if (code >= 71 && code <= 77) {
      return { label: 'Snow Fall', iconType: 'snowflake', hindiLabel: 'बर्फबारी' };
    }
    if (code >= 80 && code <= 82) {
      return { label: 'Rain Showers', iconType: 'cloud-rain', hindiLabel: 'बारिश की बौछारें' };
    }
    if (code === 95 || code === 96 || code === 99) {
      return { label: 'Thunderstorm & Lightning', iconType: 'cloud-lightning', hindiLabel: 'गरज के साथ तूफान' };
    }
    return { label: 'Fair / Mild', iconType: 'sun', hindiLabel: 'सामान्य मौसम' };
  },

  /**
   * Convert wind direction degrees to 8-point compass
   */
  degreesToCardinal(deg) {
    if (deg === undefined || deg === null) return 'N';
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round((deg % 360) / 45) % 8;
    return directions[index];
  },

  /**
   * Dynamic agricultural advisories for farmers based on real weather metrics
   */
  generateAgriculturalAdvisories({ temp, humidity, rain, windSpeed, code, hourlyForecast }) {
    const list = [];

    // 1. Spraying Advisory
    const upcomingRainIn12h = hourlyForecast
      .slice(0, 12)
      .some((h) => h.rainProb > 40 || h.code >= 51);

    if (rain > 0 || upcomingRainIn12h) {
      list.push({
        id: 'spray-caution',
        type: 'warning',
        category: 'Spraying Advisory',
        categoryHi: 'कीटनाशक छिड़काव सलाह',
        title: 'Postpone Pesticide & Fertilizer Spraying',
        titleHi: 'कीटनाशक व खाद छिड़काव स्थगित करें',
        desc: 'Precipitation or high rain probability detected within the next 12 hours. Chemical runoff risks wash-out.',
        descHi: 'अगले 12 घंटों में बारिश की संभावना है। दवा बहने का जोखिम है।'
      });
    } else if (windSpeed > 18) {
      list.push({
        id: 'spray-wind',
        type: 'caution',
        category: 'Spraying Advisory',
        categoryHi: 'कीटनाशक छिड़काव सलाह',
        title: 'High Wind Velocity - Caution for Spraying',
        titleHi: 'तेज हवा - छिड़काव में सावधानी बरतें',
        desc: `Wind speed is ${windSpeed} km/h. High spray drift may affect neighboring fields or reduce leaf deposition.`,
        descHi: `हवा की गति ${windSpeed} किमी/घंटा है। दवा उड़कर पास के खेतों में जाने का खतरा है।`
      });
    } else {
      list.push({
        id: 'spray-optimal',
        type: 'success',
        category: 'Spraying Advisory',
        categoryHi: 'कीटनाशक छिड़काव सलाह',
        title: 'Optimal Conditions for Spraying',
        titleHi: 'छिड़काव के लिए आदर्श मौसम',
        desc: `Wind speed is calm (${windSpeed} km/h) with zero rainfall expected. High chemical absorption efficiency.`,
        descHi: `शांत हवा (${windSpeed} किमी/घंटा) और शुष्क मौसम। कीटनाशक छिड़काव के लिए सर्वोत्तम समय।`
      });
    }

    // 2. Irrigation Advisory
    if (humidity > 75 || rain > 3) {
      list.push({
        id: 'irrigation-hold',
        type: 'info',
        category: 'Irrigation Advisory',
        categoryHi: 'सिंचाई सलाह',
        title: 'Adequate Moisture — Hold Surface Irrigation',
        titleHi: 'पर्याप्त नमी — सतह सिंचाई रोकें',
        desc: 'High relative humidity and surface moisture detected. Avoid over-watering to prevent root fungal decay.',
        descHi: 'हवा में अधिक नमी है। फंगल रोगों से बचाव के लिए अधिक पानी देने से बचें।'
      });
    } else if (temp > 33 && humidity < 45) {
      list.push({
        id: 'irrigation-evap',
        type: 'caution',
        category: 'Irrigation Advisory',
        categoryHi: 'सिंचाई सलाह',
        title: 'High Evapotranspiration — Irrigate Morning / Evening',
        titleHi: 'उच्च वाष्पीकरण — सुबह या शाम को सिंचाई करें',
        desc: 'Elevated daytime temperatures accelerate soil moisture loss. Prefer evening drip or light furrow irrigation.',
        descHi: 'दिन का तापमान अधिक होने से जमीन की नमी तेजी से सूख रही है। शाम को हल्की सिंचाई करें।'
      });
    } else {
      list.push({
        id: 'irrigation-normal',
        type: 'success',
        category: 'Irrigation Advisory',
        categoryHi: 'सिंचाई सलाह',
        title: 'Normal Soil Moisture Cycle',
        titleHi: 'सामान्य सिंचाई चक्र',
        desc: 'Standard moisture equilibrium for standing Rabi/Kharif crops. Check root zone before next watering.',
        descHi: 'फसलों के लिए सामान्य मौसम। अगली सिंचाई से पहले मिट्टी की जांच करें।'
      });
    }

    // 3. Harvesting & Storage Advisory
    if (code === 0 || code === 1) {
      list.push({
        id: 'harvest-good',
        type: 'success',
        category: 'Harvest & Grain Drying',
        categoryHi: 'कटाई एवं सुखाने की सलाह',
        title: 'Excellent Solar Hours for Harvesting & Threshing',
        titleHi: 'कटाई व गहाई के लिए उत्तम धूप',
        desc: 'Clear sunshine conditions ideal for combine harvesters, tractor threshing, and open-yard sun drying.',
        descHi: 'कंबाइन हार्वेस्टर से कटाई और खलिहान में उपज सुखाने के लिए श्रेष्ठ धूप।'
      });
    } else if (code >= 80 || code >= 95) {
      list.push({
        id: 'harvest-storm',
        type: 'danger',
        category: 'Harvest & Grain Drying',
        categoryHi: 'फसल सुरक्षा चेतावनी',
        title: 'Severe Weather Alert: Secure Harvested Lots',
        titleHi: 'मौसम चेतावनी: कटी फसल तिरपाल से ढकें',
        desc: 'Rain or thunderstorm risk. Cover open grain piles with waterproof tarpaulins and clean drainage channels.',
        descHi: 'बारिश/आंधी की आशंका। खुले में रखी फसल को तिरपाल से तुरंत सुरक्षित करें।'
      });
    }

    return list;
  }
};
