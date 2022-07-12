import styles from '../styles/Home.module.css'
const MobileNav = (props) => {
    const closeMobileNav = (e) => {
        document.getElementById("myMobilenav").style.height = "0";
        document.getElementById("main-app-container").style.marginTop = "0";
        // document.getElementById("openMobile").style.display = "block";

    }
    return (
        <div id="myMobilenav" className={styles.MobileNav}>
            <a className={styles.closeMobileBtn} onClick={(e) => { closeMobileNav() }}> &times;</a>
            <div className={styles.mobileNavItems}>
                <a href="#">About</a>
                <a href="#">Services</a>
                <a href="#">Clients</a>
                <a href="#">Contact</a>
            </div>
        </div>
    )
}
export default MobileNav

