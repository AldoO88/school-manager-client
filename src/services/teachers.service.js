import service from './index';


const teacherService = {
    getAllTeachers: () => service.get('/api/teachers')
}

export default teacherService;