import React, { useState } from 'react'
import Input from './Input'
import { CardContent, Cards } from './Cards'
import Button from './Button'
import { Sun, Cloud, Snowflake, Droplet, Zap } from 'lucide-react'

// Weather condition GIFs
import rainGif from '../assets/weather/rain.gif'
import thunderGif from '../assets/weather/thunder.gif'
import cloudsGif from '../assets/weather/clouds.gif'
import clearGif from '../assets/weather/clear.gif'
import snowGif from '../assets/weather/snow.gif'
import windyGif from '../assets/weather/windy.gif'

const API_KEY = '8a3e1a282b212129888cebc58ae693f4'

const WeatherApp = () => {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchWeather = async () => {
    if (!city.trim()) return
    setLoading(true)
    setError('')
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
      )
      if (!response.ok) throw new Error('City not found')
      const data = await response.json()
      setWeather(data)
    } catch (error) {
      setError(error.message)
      setWeather(null)
    }
    setLoading(false)
  }

  const getWeatherBackground = (main) => {
    switch (main) {
      case 'Rain':
        return rainGif
      case 'Thunderstorm':
        return thunderGif
      case 'Clouds':
        return cloudsGif
      case 'Clear':
        return clearGif
      case 'Snow':
        return snowGif
      case 'Wind':
      case 'Drizzle':
        return windyGif
      default:
        return clearGif
    }
  }

  const getWeatherIcon = (main) => {
    switch (main) {
      case 'Rain':
      case 'Drizzle':
        return <Droplet size={48} className='mx-auto text-blue-300' />
      case 'Thunderstorm':
        return <Zap size={48} className='mx-auto text-yellow-500' />
      case 'Clouds':
        return <Cloud size={48} className='mx-auto text-gray-500' />
      case 'Clear':
        return <Sun size={48} className='mx-auto text-yellow-300' />
      case 'Snow':
        return <Snowflake size={48} className='mx-auto text-blue-200' />
      default:
        return <Sun size={48} className='mx-auto text-yellow-300' />
    }
  }

  const bgGif = weather ? getWeatherBackground(weather.weather[0].main) : clearGif

  return (
    <div
      className='min-h-screen bg-cover bg-center relative'
      style={{ backgroundImage: `url(${bgGif})` }}
    >
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/30 z-0 backdrop-blur-sm' />

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen p-4'>
        <Cards className='max-w-md w-full p-6 shadow-2xl rounded-2xl bg-white/30 backdrop-blur-lg border border-white/20'>
          <CardContent>
            <h1 className='text-3xl font-bold text-center mb-4 text-white drop-shadow-lg'>
              Weather App
            </h1>
            <div className='flex gap-2 mb-4 items-center'>
              <Input
                type='text'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                placeholder='Enter city name'
                className='flex-1 bg-white/60 placeholder-gray-700 text-black'
              />
              <Button onClick={fetchWeather} disabled={loading}>
                {loading ? 'Loading...' : 'Search'}
              </Button>
            </div>

            {error && <p className='text-red-200 text-center'>{error}</p>}

            {weather && (
              <div className='text-center mt-6 text-white'>
                {getWeatherIcon(weather.weather[0].main)}
                <h2 className='text-2xl font-semibold mt-2'>
                  {weather.name}, {weather.sys.country}
                </h2>
                <p className='text-lg capitalize'>
                  {weather.weather[0].description}
                </p>
                <p className='text-4xl font-bold mt-2'>
                  {Math.round(weather.main.temp)}°C
                </p>
              </div>
            )}
          </CardContent>
        </Cards>
      </div>
    </div>
  )
}

export default WeatherApp
