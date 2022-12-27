import React from "react";


function Footer() {
    var day = new Date();
    var year = day.getFullYear();
    return (<footer><p>@ {year}</p></footer>);
}

export default Footer;