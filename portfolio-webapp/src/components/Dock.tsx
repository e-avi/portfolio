import '../pages/Dashboard.css'

function Dock() {
  return (
    <div className='dock'>
        <span className='dock-icons'>
            <img className='icons' src="/icons/terminal.jpg" alt="Terminal" />
        </span>
        <span className='dock-icons'>
            <img className='icons' src="/icons/Github.png" alt="Terminal" />
        </span>
        <span className='dock-icons'>
            <img className='icons' src="/icons/linkedin.png" alt="Terminal" />
        </span>
        <span className='dock-icons' style={{ paddingLeft: '10px' }}>
            <img className='icons' src="/icons/projects.png" alt="Terminal" />
        </span>
    </div>
  )
}

export default Dock