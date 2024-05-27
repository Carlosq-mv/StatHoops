import { waveform } from 'ldrs'

waveform.register()
const Loading = () => {


  return (
    <div>
        <l-waveform
            size="35"
            stroke="3.5"
            speed="1" 
            color="black" 
        ></l-waveform>
    </div>
  )
}

export default Loading
