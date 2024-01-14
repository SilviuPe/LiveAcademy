export function course_structure_funcs(courseStructure) {
    function setTheCourseStructureDefault() {
        return {
            CourseTitle : '',
            Author : sessionStorage.getItem('username'),
            Chapters : {
    
            },
            CourseID : ''
        };
    }

    return {
        setTheCourseStructureDefault : setTheCourseStructureDefault
    }
}