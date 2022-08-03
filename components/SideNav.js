import styles from '../styles/Home.module.css'
const SideNav = (props) => {
    const closeNav = (e) => {
        document.getElementById("mySidenav").style.width = "0";
        document.getElementById("main-app-container").style.marginLeft = "0";
    }
    return (
        <div id="mySidenav" className={styles.sideNav}>
            <a className={styles.closeBtn} onClick={(e) => { closeNav() }}> &times;</a>
            <div id ="myLinks">
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
            </div>
        </div>
    )
}
export default SideNav

