import Dock from '../components/Dock'
import TopPanel from '../components/TopPanel'
import './Dashboard.css'

function DashBoard() {
  return (
    <div className='dashboard'>
        <TopPanel />
        <img className="background-image" src='/wallpaper.jpg'/>
        <Dock />
    </div>
  )
}

export default DashBoard