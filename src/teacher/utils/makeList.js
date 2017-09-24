export function filterList(list, id) {
    var filteredList = list.filter(item => {
        return item.course_id == id;
    });
    return filteredList;
}
