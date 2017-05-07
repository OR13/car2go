import React, { Component } from 'react'
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux'

import HeroRow from 'components/HeroRow'

import CircularProgress from 'material-ui/CircularProgress'

import CreateMeshPointContainer from 'containers/CreateMeshPointContainer'
import MeshPointTableContainer from 'containers/MeshPointTableContainer'

import { browserHistory } from 'react-router'

@connect(
  ({ meshPoint }) => ({
    meshPoint: meshPoint
  })
)
export default class Home extends Component {

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps)
    let { meshPoint } = nextProps;

    // if (meshPoint.isOwner) {
    //   browserHistory.push("/node/" + meshPoint.selected.name)
    // }
  }


  render() {
    let { meshPoint } = this.props;

    const isLoaded = () => {
      return meshPoint.objects !== null;
    }

    const HeroContent = () => {
      if (isLoaded()) {
        return (
          <h1 style={{ textAlign: 'center' }} >
            Mobile Mesh ISP Market
          </h1>
        )
      } else {
        return (
          <CircularProgress mode='indeterminate' size={80} />
        )
      }
    }

    const DefaultView = () => {

      if (isLoaded()) {
        if (meshPoint.defaultMeshPoint !== undefined) {
          return (
            <MeshPointTableContainer />
          )
        } else {
          return (
            <div>
              <CreateMeshPointContainer />
              <MeshPointTableContainer />
            </div>
          )
        }
      } else {
        return (<div />)
      }
    }
    return (
      <div style={{ paddingBottom: '20px' }}>
        <HeroRow renderParticles={true}>
          <HeroContent />
        </HeroRow>
        <DefaultView />
      </div>
    )
  }
}
