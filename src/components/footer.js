import React from 'react';

class Footer extends React.Component {
    render() {
        return (
            <footer>
                <div style={{ float: 'right' }}>
                    <a href="/rss.xml" target="_blank" rel="noopener noreferrer">
                        rss
          </a>
                </div>
                <a
                    href="https://twitter.com/nikoheikkila"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    twitter
        </a>{' '}
                &bull;{' '}
                <a
                    href="https://github.com/nikoheikkila"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    github
        </a>
            </footer>
        );
    }
}

export default Footer;
