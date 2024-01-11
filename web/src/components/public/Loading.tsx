import { logo } from '../shared/images'
const Loading = (): JSX.Element => {
  return (
    <div className="loading-success">
        <div className='loading-success-content'>
            <img src={logo} alt="" />
            <div className='loading-success-content-giro'></div>
        </div>
    </div>
  )
}

export default Loading
