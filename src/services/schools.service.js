import service from './index';


const schoolService = {
    getAllSchools: () => service.get('/api/schools'),
    deleteSchool: (idSchool) => service.delete(`/api/schools/${idSchool}`),
    createSchool: (dataForm) => service.post('/api/schools', dataForm)
}

export default schoolService;