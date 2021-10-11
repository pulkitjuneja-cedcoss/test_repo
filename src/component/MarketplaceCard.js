import React, { Component } from 'react'
import marketplaces from '../data/marketplaces'
import MarketplaceContainer from './MarketplaceContainer'

export class MarketplaceCard extends Component {
    constructor() {
        super()
        this.state={
            isConnect:false
        }
        this.handleclick=this.handleclick.bind(this)
    }

handleclick() {
    this.setState({
        isConnect:!this.state.isConnect
    })
}

    render() {
        const fetch =marketplaces.map((item)=><MarketplaceContainer data={item}  />);
        return (
            <div>
          
               {this.state.isConnect ? fetch :<button class='btn btn-primary' onClick={this.handleclick}>Select MarketPlaces</button> }
            </div>
        )
    }
}

export default MarketplaceCard
