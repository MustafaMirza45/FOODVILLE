import React from 'react';
import { Link } from 'react-router-dom';

function Footer (props){
    //<li><Link to="/contact">Contact</Link></li> link to contactus
    return(
        <div className="footer ">
            <div className="container">
                <div className="row justify-content-center textcol">             
                    <div className="col-4 offset-1 col-sm-2">
                        <h4><b>Links</b></h4>
                        <ul className="list-unstyled  textcol">
                            <li><Link className="textcol" to="/home">Home</Link></li>
                            <li><Link className="textcol" to="#">About</Link></li>
                            <li><Link className="textcol" to="/menu">Menu</Link></li>
                            
                        </ul>
                    </div>
                    <div className="col-7 col-sm-5 textcol">
                        <h4><b>Our Address</b></h4>
                        <address className="textcol">
                        (Address jab aega to daldengay XD)<br />
                        <i className="fa fa-phone fa-lg textcol"></i>: +92 334 3340629<br />
                        <i className="fa fa-fax fa-lg textcol"></i>: (fax number to be added)<br />
                        <i className="fa fa-envelope fa-lg textcol"></i>: <a className="textcol" href="mailto:mustafamirza45@gmail.com">
                            Foodville</a>
                        </address>
                    </div>
                   
                </div>
                <div className="row justify-content-end ">
                    <div className="col-12 col-sm-4 ">
                            <div className="text-center ">
                                <a className="btn btn-social-icon btn-google textcol" href="http://google.com/+"><i className="fa fa-google-plus"></i></a>
                                <a className="btn btn-social-icon btn-facebook textcol" href="http://www.facebook.com/profile.php?id="><i className="fa fa-facebook"></i></a>
                                <a className="btn btn-social-icon btn-linkedin textcol" href="http://www.linkedin.com/in/"><i className="fa fa-linkedin"></i></a>
                                <a className="btn btn-social-icon btn-twitter textcol" href="http://twitter.com/"><i className="fa fa-twitter"></i></a>
                                <a className="btn btn-social-icon btn-google textcol" href="http://youtube.com/"><i className="fa fa-youtube"></i></a>
                                <a className="btn btn-social-icon btn-instagram textcol" href="https://www.instagram.com/"><i className="fa fa-instagram"></i></a>
                                <a className="btn btn-social-icon textcol" href="mailto:mustafamirza45@gmail.com"><i className="fa fa-envelope-o"></i></a>
                            </div>
                    </div>
                </div>
                
                <div className="row justify-content-center textcol">             
                    <div className="col-auto">
                        <p><b>© Copyright 2020 Foodville</b></p>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default Footer;