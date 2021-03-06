
import { web3 } from 'env'


const contract = require('truffle-contract')

import MeshPoint from '../../../build/contracts/MeshPoint.json'
import MeshPointManager from '../../../build/contracts/MeshPointManager.json'

const meshPoint = contract(MeshPoint)
meshPoint.setProvider(web3.currentProvider)

const meshPointManager = contract(MeshPointManager)
meshPointManager.setProvider(web3.currentProvider)

import { readEvents } from '../../../ti-framework/event-store'

// HELPER METHODS

export const getEventStoreEvents = (_address, _callback) => {

    return meshPoint.at(_address)
        .then(async (_meshPoint) => {
            return readEvents(_meshPoint)
        })
        .then((events) => {
            _callback(events)
        })
}




const getBalanceAsync = async (_address) => {
    return await new Promise(resolve => {
        web3.eth.getBalance(_address, (error, result) => {
            if (error) {
                console.error(error)
            }
            let contractBalance = result.toNumber()
            let balanceEth = web3.fromWei(contractBalance, 'ether')
            resolve(balanceEth)
        })
    })
}


export const getMeshPointViewModel = (_address) => {
    // console.log('what is address bad getMeshPointViewModel?: ', _address)
    return meshPoint.at(_address)
        .then(async (_meshPoint) => {
            return {
                address: _meshPoint.address,
                timeCreated: (await _meshPoint.timeCreated.call()).toNumber(),
                creator: await _meshPoint.creator.call(),
                name: await _meshPoint.name.call().then((_name) => _name.replace(/-/g, ' ')),
                balance: await getBalanceAsync(_address),
                requestorAddresses: await _meshPoint.getRequestorAddresses(),
                events: await readEvents(_meshPoint)
            }
        })
}

export const getMeshPointByAddress = (_address) => {
    //   console.log('what is address bad getMeshPointByAddress?: ', _address)
    return getMeshPointViewModel(_address)
        .then((viewModel) => {
            return viewModel
        })
}

const getMeshPointsByAddressesAsyc = async (_addresses) => {
    return await Promise.all(
        _addresses
            .map(async (address) => {
                return await getMeshPointByAddress(address)
            })
    )
}

export const managerGetMeshPointByCreator = (fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getMeshPointByCreator
                .call({ from: fromAddress })
                .then(async (_address) => {
                    let addr = _address === '0x0000000000000000000000000000000000000000' ? null : await getMeshPointByAddress(_address)
                    _callback(addr)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerGetMeshPointByName = (_name, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getMeshPointByName
                .call(_name)
                .then(async (_address) => {
                    let addr = _address === '0x0000000000000000000000000000000000000000' ? null : await getMeshPointByAddress(_address)
                    _callback(addr)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerGetMeshPointObjects = (_callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getFaucets
                .call()
                .then(async (addresses) => {
                    let meshPointContracts = await getMeshPointsByAddressesAsyc(addresses)
                    _callback(meshPointContracts)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}


export const managerGetMeshPointAddresses = (_callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance.getFaucets
                .call()
                .then(async (addresses) => {
                    _callback(addresses)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerCreateMeshPoint = (_name, fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .createMeshPoint(_name, { from: fromAddress, gas: 2000000, value: web3.toWei(0) })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerRequestMeshPointAccess = (_meshPointAddress, _requestorAddress, _fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .requestAccess(_meshPointAddress, _requestorAddress, {
                    from: _fromAddress,
                    gas: 2000000
                })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerAuthorizeMeshPointAccess = (_meshPointAddress, _requestorAddress, _fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .authorizeAccess(_meshPointAddress, _requestorAddress, {
                    from: _fromAddress,
                    gas: 2000000
                })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const managerRevokeMeshPointAccess = (_meshPointAddress, _requestorAddress, _fromAddress, _callback) => {
    meshPointManager.deployed()
        .then((_instance) => {
            _instance
                .revokeAccess(_meshPointAddress, _requestorAddress, {
                    from: _fromAddress,
                    gas: 2000000
                })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}

export const meshPointSendWei = (_meshPointAddress, _recipientAddress, _fromAddress, _callback) => {
    meshPoint.at(_meshPointAddress)
        .then((_meshPoint) => {
            _meshPoint.sendWei(_recipientAddress, { from: _fromAddress })
                .then((_tx) => {
                    _callback(_tx)
                })
                .catch((error) => {
                    console.error(error)
                })
        })
}
