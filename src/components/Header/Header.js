import "./Header.css";

const Header=()=>{
    return(
        <div>
            <span onClick={()=>window.scroll(0,0)} className="header">🍿 Popcorn Time 🍿</span>
        </div>
    )
}

export default Header