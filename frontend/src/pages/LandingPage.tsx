import React from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

const LandingPage = () => {
  return (
    <div>
        <Parallax pages={4}>
            
            <ParallaxLayer
                offset={0}
                speed={1}
                factor={2}
                style={{
                    backgroundImage: 'url(/miami-heat.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    width: '100vw',
                
                }}
            >
                
                <h1 style={{ color: 'white', textAlign: 'center', marginTop: '50%' }}>Stat Hoops</h1>
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.5}>
                <h2 style={{ color: 'white', textAlign: 'center' }}>Your Hub For NBA News and History</h2>
            </ParallaxLayer>


            
            
        </Parallax>
      
    </div>
  )
}

export default LandingPage
