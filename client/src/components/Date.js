
export const  MyDate = () => {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const yr = today.getFullYear();
    return (day+'/'+month+'/'+yr);
}
