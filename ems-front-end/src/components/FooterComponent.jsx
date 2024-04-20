import React from 'react';

function FooterComponent(props) {
    return (
        <div>
            <footer className="footer">
                &copy; {new Date().getFullYear()} by Sethu
            </footer>
        </div>
    );
}

export default FooterComponent;