import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

export const MapView = ({ data }) => {
    console.log(data)
    return (
        <div className='container'>
            <div className='row'>


                <div className='col-6'>
                    {
                        (data.state === 'entregado') ? <h5></h5>
                            :

                            <div>
                                <h5>{data.title}--------------------- {data.state}  </h5>
                                <div style={{ overflow: 'hidden', width: '800px', height: '250px' }}>
                                    <MapContainer center={[data.latitude, data.longitude]} zoom={11} scrollWheelZoom={false}>
                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={[51.505, -0.09]}>
                                            <Popup>
                                                A pretty CSS3 popup. <br /> Easily customizable.
                                            </Popup>
                                        </Marker>
                                    </MapContainer>
                                </div>
                            </div>


                    }

                </div>

            </div>

        </div>
    )
}
