import service from './index';


const groupService = {
    getAllGroups: () => service.get('/api/groups'),
    deleteGroup: (groupId) => service.delete(`/api/groups/${groupId}`),
    createGroup: (dataForm) => service.post('/api/groups', dataForm),
    updateGroup: (groupId, dataForm) => service.put(`/api/groups/${groupId}`, dataForm),
    getOneGroup: (groupId) => service.get(`/api/groups/${groupId}`)
}

export default groupService;