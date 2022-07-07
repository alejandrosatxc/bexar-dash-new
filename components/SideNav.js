import styles from '../styles/Home.module.css'
const SideNav = (props) => {
    const closeNav = (e) => {
        document.getElementById("mySidenav").style.width = "0";
    }

   

    return (
        <div id="mySidenav" className={styles.sideNav}>
            <a href="javascript:void(0)" className={styles.closeBtn} onClick={(e) => { closeNav() }}> &times;</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Clients</a>
            <a href="#">Contact</a>
        </div>
    )
}
export default SideNav

