import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteMasterTC, deleteWorkerTC, getClusterTC } from '../BLL/cluster_reducer'
import { getTotalNodesCount } from '../BLL/workerselector'
import Monitor from './Monitor'

class MonitorContainer extends Component {

    componentDidMount() {
        setInterval(()=>{
            this.props.getCluster();
        }, 1000)
        
    }

    render() {
        
        return (
            <div>
                <Monitor {...this.props}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    workers: state.cluster.workers,
    activeCount: state.cluster.activeCount,
    globalCount: state.cluster.globalCount,
    nodes: state.cluster.nodes,
    master: state.cluster.master,
    isMasterChange: state.cluster.isMasterChange,
    activeWorkerTotal: getTotalNodesCount(state)
})

const mapDispatchToProps = (dispatch) => ({
    getCluster: () => dispatch(getClusterTC()),
    deleteWorker: (pid) => dispatch(deleteWorkerTC(pid)),
    deleteMaster: () => dispatch(deleteMasterTC())
})

export default connect(mapStateToProps, mapDispatchToProps)(MonitorContainer)
