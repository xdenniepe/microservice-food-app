import UFO from '../../../../assets/ar-games/ufo/UFO_with_Logo.png'
import './styles.css';

const CreateUFO = () => {
  
    return (
      <div className='ufoDiv'>
        <img className='ufo animate-wiggle' src={UFO} style={{position:'fixed', top:'-100px', left:'50%', transform: 'translate(-50%, 0% )', zIndex:20, width:'90%' }} />
      </div>
      
    )
  
}

export default CreateUFO;