

export const MapView = ({ data }) => {
    console.log(data)
    return (
        <div className='container'>
            <div className='row'>
                
                
                <div className='col-6'>
                    {
                        (data.state !== 'entregado') ? <h5></h5>
                            :
                            <div>
                                <h5>{data.title}--------------------- {data.state}  </h5>
                                
                            </div>
                            
                    }

                </div>

            </div>

        </div>
    )
}
