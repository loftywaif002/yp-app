import Navbar from '../NavBar'
import Footer from '../Footer'
import React, {Component} from 'react'

class Layout extends Component {
    render() {
        return (
            <div>
                <Navbar />
                 {this.props.children}
                <Footer />
            </div>
        )
    }
}
export default Layout;
