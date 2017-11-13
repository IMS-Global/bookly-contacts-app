import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Segment } from 'semantic-ui-react'
import Address from './Address'
import Ribbon from '../Ribbon'

// Actions
import {
  indexAddresses,
  resetAddresses,
} from '../../actions/addresses.js'

class Addresses extends Component {

  componentDidMount = () => this.loadAddresses(this.props)
  componentWillReceiveProps = ( props ) => this.loadAddresses(props)
  loadAddresses = ( props ) => {
    const { dispatch, contactId, addresses } = props
    if( addresses.length <= 0 && contactId ) {
      dispatch(indexAddresses(contactId))
    }
  }
  componentWillUnmount = () => this.props.dispatch(resetAddresses())

  displayAddresses = () => {
    const { addresses } = this.props
    if( addresses.length > 0 ) {
      return addresses.map( address => (
        <Address key={address.id} address={address} />
      ))
    }
  }

  render = () => {
    return (
      <Segment>
        <Ribbon content='Addresses' />

        { this.displayAddresses() }
      </Segment>
    )
  }
}

const mapStateToProps = ( state, props ) => {
  return {
    addresses: state.addresses.data,
  }
}

export default connect(mapStateToProps)(Addresses)
