import { useState } from 'react'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'
import { getCenter } from 'geolib'

function Map({ searchResults }) {

    const [selectedLocation, setSelectedLocation] = useState({})

    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat,
    }))

    const center = getCenter(coordinates)

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11,
    })

    return (
        <ReactMapGL
            {...viewport}
            mapStyle='mapbox://styles/bishal9/cksa49cla3kyq17quf6aao3ma'
            mapboxApiAccessToken={process.env.mapbox_key}
            onViewportChange={(viewport) => setViewport(viewport)}
        >
            {
                searchResults.map(result => (
                    <div key={result.long}>

                        {/* Marker */}
                        <Marker
                            longitude={result.long}
                            latitude={result.lat}
                            offsetLeft={-20}
                            offsetTop={-10}
                        >
                            <p 
                                role='img'
                                aria-level='push-pin'
                                className='cursor-pointer text-2xl animate-bounce' onClick={() => setSelectedLocation(result)}
                            >📌</p>
                        </Marker>

                        {/* Popup */}
                        {
                            selectedLocation.long === result.long ? (
                                <Popup
                                    onClose={() => setSelectedLocation({})}
                                    closeOnClick={true}
                                    latitude={result.lat}
                                    longitude={result.long}
                                >
                                    <p className='px-2 text-gray-600 text-sm !z-50'>
                                        {result.title}
                                    </p>
                                </Popup>
                            ) : (false)
                        }
                    </div>
                ))
            }
        </ReactMapGL>
    )
}

export default Map