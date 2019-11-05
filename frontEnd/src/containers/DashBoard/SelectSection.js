import React, { Component } from 'react';

class SelectSection extends Component {
    render() {
        return (
            <div>
                <button
                onClick={this.props.handleSection}
                id="stockMarket"
                >
                Stock market
                </button>
                <button
                onClick={this.props.handleSection}
                id="realEstate"
                >
                Real estate
                </button>
                <button
                onClick={this.props.handleSection}
                id="bank"
                >Bank
                </button>
            </div>
        );
    }
}

export default SelectSection;